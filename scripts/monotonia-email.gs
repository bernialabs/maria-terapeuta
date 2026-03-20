// ============================================================
// Test Monotonía — Script de correo de resultados
// Para copiar/pegar en Google Apps Script (editor de la hoja)
//
// Hojas requeridas:
//   "Respuestas recodificadas": fila 1 = cabecera, filas 2+ = datos
//     Cols AU–AZ (0-based 46–51): Puntuaciones numéricas de los 6 factores (máx. 42 c/u)
//     Col  BA    (0-based 52):    Nivel de afinidad total (máx. 238)
//     Cols BB–BG (0-based 53–58): Niveles texto de los 6 factores
//     Col  BH    (0-based 59):    Nivel de afinidad texto (ej. "Bajo 🥰", "Medio 😳", etc.)
//
//   "Interpretaciones": col A = clave, col B = texto
//     Filas de header (col B vacía) definen el grupo; filas siguientes tienen nivel y texto
//     Grupos esperados: Conexión relacional, Conexión sexual, Gestión emocional,
//                       Cercanía emocional, Atención activa, Percepción del tiempo,
//                       Nivel de afinidad, Cierre
//
//   Datos personales — primera pestaña del libro (form responses):
//     Col 35 (0-based): Nombre
//     Col 36: Tiempo en la relación
//     Col 37: Email
// ============================================================

// ------------------------------------------------------------
// CONSTANTES
// ------------------------------------------------------------
var NOMBRE_HOJA_RECOD   = "Respuestas recodificadas";
var NOMBRE_HOJA_INTERP  = "Interpretaciones";
var COL_SCORE_INICIO    = 46;  // 0-based, AU — puntuación numérica Conexión relacional
var COL_FACTOR_INICIO   = 53;  // 0-based, BB — nivel texto Conexión relacional
var NUM_FACTORES        = 6;
var MAX_PUNTAJE_FACTOR  = 42;
// COL_NIVEL_AFINIDAD = COL_FACTOR_INICIO + NUM_FACTORES = 59 (0-based, BH)
var NOMBRES_FACTORES = [
  "Conexión relacional",
  "Conexión Sexual",
  "Gestión emocional",
  "Cercanía emocional",
  "Atención activa",
  "Percepción del tiempo"
];

// Columnas (0-based) en la primera pestaña (form responses)
var COL_NOMBRE   = 35;
var COL_DURACION = 36;
var COL_EMAIL    = 37;

// ------------------------------------------------------------
// ESTILOS DE NIVEL (badge pill + barra de progreso)
// Matching por prefijo para tolerar emojis al final del string
// Orden importa: "Medio-Alto" antes que "Medio"
// ------------------------------------------------------------
function getEstiloNivel(nivel) {
  if (nivel.startsWith("Estable"))       return { bg: "#D4EDDA", text: "#155724", border: "#C3E6CB", bar: "#28A745" };
  if (nivel.startsWith("En desarrollo")) return { bg: "#FFF3CD", text: "#856404", border: "#FFE69C", bar: "#FFC107" };
  if (nivel.startsWith("Por mejorar"))   return { bg: "#F8D7DA", text: "#842029", border: "#F5C2C7", bar: "#DC3545" };
  if (nivel.startsWith("Bajo"))          return { bg: "#D4EDDA", text: "#155724", border: "#C3E6CB", bar: "#28A745" };
  if (nivel.startsWith("Medio-Alto"))    return { bg: "#FFE5CC", text: "#7A3F00", border: "#FFD0A0", bar: "#FF8C00" };
  if (nivel.startsWith("Medio"))         return { bg: "#FFF3CD", text: "#856404", border: "#FFE69C", bar: "#FFC107" };
  if (nivel.startsWith("Alto"))          return { bg: "#F8D7DA", text: "#842029", border: "#F5C2C7", bar: "#DC3545" };
  return { bg: "#E2E3E5", text: "#383D41", border: "#D6D8DB", bar: "#6C757D" };
}

// ------------------------------------------------------------
// LEER INTERPRETACIONES de la pestaña "Interpretaciones"
// Devuelve lookup[factorNorm][nivelNorm] = texto
// factorNorm = lowercase(trim(col A header))
// nivelNorm  = lowercase(trim(col A data row))
// ------------------------------------------------------------
function leerInterpretaciones(ss) {
  var hoja = ss.getSheetByName(NOMBRE_HOJA_INTERP);
  if (!hoja) {
    Logger.log("ERROR: No se encontró la pestaña '" + NOMBRE_HOJA_INTERP + "'.");
    return {};
  }

  var datos = hoja.getDataRange().getValues();
  var lookup = {};
  var factorActual = null;

  for (var i = 0; i < datos.length; i++) {
    var colA = String(datos[i][0]).trim();
    var colB = datos[i].length > 1 ? String(datos[i][1]).trim() : "";

    if (colA === "" && colB === "") continue; // fila en blanco

    if (colB === "") {
      // Fila de header — col A es el nombre del factor o sección
      factorActual = colA.toLowerCase();
      if (!lookup[factorActual]) lookup[factorActual] = {};
    } else {
      // Fila de dato — col A es el nivel, col B es el texto
      if (factorActual !== null) {
        lookup[factorActual][colA.toLowerCase()] = colB;
      }
    }
  }

  return lookup;
}

// ------------------------------------------------------------
// BUSCAR INTERPRETACIÓN con tolerancia a mayúsculas y emojis
// Primero busca coincidencia exacta (lowercase), luego por prefijo
// ------------------------------------------------------------
function buscarInterpretacion(lookup, factor, nivel) {
  var factorNorm = factor.toLowerCase().trim();
  var nivelNorm  = nivel.toLowerCase().trim();

  if (lookup[factorNorm] && lookup[factorNorm][nivelNorm]) {
    return lookup[factorNorm][nivelNorm];
  }

  // Búsqueda por prefijo: el nivel puede tener emoji al final (ej. "bajo 🥰")
  // Se comprueba si el nivel recibido empieza por la clave almacenada (sin emoji)
  if (lookup[factorNorm]) {
    var claves = Object.keys(lookup[factorNorm]);
    for (var k = 0; k < claves.length; k++) {
      if (nivelNorm.startsWith(claves[k])) {
        return lookup[factorNorm][claves[k]];
      }
    }
  }

  Logger.log("AVISO: sin interpretación para factor='" + factor + "' nivel='" + nivel + "'");
  return "Interpretación no disponible.";
}

// ------------------------------------------------------------
// LEER NIVELES Y PUNTUACIONES DE UNA FILA de "Respuestas recodificadas"
// numFila: número de fila 1-based (convención GAS)
// Devuelve {
//   factores: [{ nombre, nivel, puntaje }, …],
//   nivelAfinidad,   // texto, ej. "Medio 😳"
//   puntajeTotal     // numérico, col BA
// }
// ------------------------------------------------------------
function leerNivelesFila(hojaRecod, numFila) {
  // Leer en una sola llamada: cols AU–BH (14 columnas contiguas)
  // AU–BA (índices 0–6): puntajes numéricos (6 factores + total)
  // BB–BH (índices 7–13): niveles texto (6 factores + nivel de afinidad)
  var numColumnas = (NUM_FACTORES + 1) * 2; // 14
  var rango = hojaRecod.getRange(numFila, COL_SCORE_INICIO + 1, 1, numColumnas);
  var valores = rango.getValues()[0];

  var factores = [];
  for (var i = 0; i < NUM_FACTORES; i++) {
    factores.push({
      nombre:  NOMBRES_FACTORES[i],
      nivel:   String(valores[NUM_FACTORES + 1 + i]).trim(),
      puntaje: parseFloat(valores[i]) || 0
    });
  }

  return {
    factores:      factores,
    nivelAfinidad: String(valores[NUM_FACTORES + 1 + NUM_FACTORES]).trim(),
    puntajeTotal:  parseFloat(valores[NUM_FACTORES]) || 0
  };
}

// ------------------------------------------------------------
// GENERACIÓN DEL HTML DEL CORREO
// ------------------------------------------------------------
function generarHTMLCorreo(nombre, duracion, factores, nivelAfinidad, interpretaciones) {
  var estiloGeneral = getEstiloNivel(nivelAfinidad);

  // --- Tarjetas de factores (6) ---
  var tarjetasFactores = "";
  for (var i = 0; i < factores.length; i++) {
    var f = factores[i];
    var estilo = getEstiloNivel(f.nivel);
    var porcentajeBarra = Math.max(2, Math.round(Math.min(f.puntaje, MAX_PUNTAJE_FACTOR) / MAX_PUNTAJE_FACTOR * 100));
    var mensaje = buscarInterpretacion(interpretaciones, f.nombre, f.nivel);

    tarjetasFactores += [
      '<div style="',
        'background-color:#ffffff;',
        'border-radius:12px;',
        'padding:20px 24px;',
        'margin-bottom:12px;',
        'box-shadow:0 1px 4px rgba(0,0,0,0.08);',
      '">',
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">',
          '<span style="font-size:15px;font-weight:700;color:#3D2E2A;">', f.nombre, '</span>',
          '<span style="',
            'background-color:', estilo.bg, ';',
            'color:', estilo.text, ';',
            'border:1px solid ', estilo.border, ';',
            'border-radius:20px;',
            'padding:3px 12px;',
            'font-size:12px;',
            'font-weight:700;',
            'white-space:nowrap;',
          '">', f.nivel, '</span>',
        '</div>',
        '<div style="background-color:#FAF2E8;border-radius:8px;height:8px;overflow:hidden;margin-bottom:12px;">',
          '<div style="height:100%;width:', porcentajeBarra, '%;background-color:', estilo.bar, ';border-radius:8px;"></div>',
        '</div>',
        '<p style="font-size:14px;color:#3D2E2A;line-height:1.6;margin:0;">', mensaje, '</p>',
      '</div>',
    ].join('');
  }

  // --- Sección Conclusión (dinámica según nivel de afinidad) ---
  var textoConclusion = buscarInterpretacion(interpretaciones, "Nivel de afinidad", nivelAfinidad);
  var seccionConclusion = [
    '<div style="',
      'background-color:#FFF3F1;',
      'border:2px solid #FA523C;',
      'border-radius:12px;',
      'padding:20px 24px;',
      'margin-top:24px;',
    '">',
      '<p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#FA523C;text-transform:uppercase;letter-spacing:0.05em;">',
        'Conclusión',
      '</p>',
      '<p style="font-size:14px;color:#3D2E2A;line-height:1.6;margin:0;">',
        textoConclusion,
      '</p>',
    '</div>',
  ].join('');

  // --- Texto de cierre dinámico según nivel de afinidad ---
  var textoCierre = buscarInterpretacion(interpretaciones, "Cierre", nivelAfinidad);

  return [
    '<!DOCTYPE html>',
    '<html lang="es">',
    '<head>',
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width,initial-scale=1.0">',
      '<title>Resultados de tu Test de Monotonía</title>',
    '</head>',
    '<body style="margin:0;padding:0;background-color:#f4ede3;font-family:Arial,Helvetica,sans-serif;">',

    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4ede3;padding:32px 16px;">',
    '<tr><td align="center">',
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">',

      // ENCABEZADO coral
      '<tr><td style="',
        'background-color:#FA523C;',
        'border-radius:16px 16px 0 0;',
        'padding:28px 32px;',
        'text-align:center;',
      '">',
        '<img src="https://mariaterapeuta.com/images/logo_maria_terapeuta.png"',
          ' alt="María Terapeuta" width="140"',
          ' style="display:block;margin:0 auto 20px;max-width:140px;">',
        '<h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">',
          'Resultados de tu Test de Monotonía',
        '</h1>',
      '</td></tr>',

      // CUERPO principal
      '<tr><td style="background-color:#FAF2E8;padding:32px 28px;">',

        // Saludo
        '<p style="font-size:16px;color:#3D2E2A;line-height:1.6;margin-top:0;">',
          'Hola <strong>', nombre, '</strong>,',
        '</p>',
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;">',
          'Gracias por completar el test. Lleváis <strong>', duracion, '</strong> juntos, ',
          'y a continuación encontrarás un análisis personalizado de seis áreas clave de tu relación.',
        '</p>',

        // Badge nivel de afinidad
        '<div style="',
          'background-color:', estiloGeneral.bg, ';',
          'border:1px solid ', estiloGeneral.border, ';',
          'border-radius:12px;',
          'padding:18px 24px;',
          'margin:24px 0;',
          'text-align:center;',
        '">',
          '<p style="margin:0 0 6px;font-size:12px;color:', estiloGeneral.text, ';',
            'text-transform:uppercase;letter-spacing:0.05em;font-weight:700;">',
            'Nivel de afinidad',
          '</p>',
          '<p style="margin:0;font-size:24px;font-weight:700;color:', estiloGeneral.text, ';">',
            nivelAfinidad,
          '</p>',
        '</div>',

        // Tarjetas de factores
        '<h2 style="font-size:16px;color:#3D2E2A;font-weight:700;margin:0 0 16px;">',
          'Detalle por área',
        '</h2>',
        tarjetasFactores,

        // Sección Conclusión
        seccionConclusion,

        // Separador
        '<hr style="border:none;border-top:1px solid #E8D9C8;margin:28px 0;">',

        // Cierre dinámico
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;">',
          textoCierre,
        '</p>',

        // Botón WhatsApp
        '<div style="text-align:center;margin:28px 0;">',
          '<a href="https://wa.me/34666905970?text=Hola!%20Me%20gustar%C3%ADa%20reservar%20una%20sesi%C3%B3n."',
            ' style="',
              'display:inline-block;',
              'background-color:#FA523C;',
              'color:#ffffff;',
              'text-decoration:none;',
              'font-size:16px;',
              'font-weight:700;',
              'padding:14px 36px;',
              'border-radius:50px;',
              'letter-spacing:0.02em;',
            '">',
            'Reservar sesión',
          '</a>',
        '</div>',

        // Firma
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;margin-bottom:4px;">Saludos,</p>',
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;margin-top:0;">',
          '<strong>Maria Alejandra Ovalle</strong><br>',
          'Psicóloga, psicómetra y terapeuta de pareja<br>',
          'IG: <a href="https://www.instagram.com/soymariaterapeuta" style="color:#FA523C;text-decoration:none;">@soymariaterapeuta</a>',
        '</p>',

      '</td></tr>',

      // FOOTER oscuro
      '<tr><td style="',
        'background-color:#3D2E2A;',
        'border-radius:0 0 16px 16px;',
        'padding:20px 28px;',
        'text-align:center;',
      '">',
        '<p style="margin:0;font-size:12px;color:#C9B8A8;line-height:1.6;">',
          'Este correo fue generado automáticamente tras completar el Test de Monotonía.<br>',
          '© María Alejandra Ovalle · ',
          '<a href="https://mariaterapeuta.com" style="color:#FA523C;text-decoration:none;">mariaterapeuta.com</a>',
        '</p>',
      '</td></tr>',

    '</table>',
    '</td></tr>',
    '</table>',

    '</body>',
    '</html>',
  ].join('');
}

// ------------------------------------------------------------
// ENVÍO DEL CORREO
// ------------------------------------------------------------
function enviarCorreo(email, nombre, duracion, factores, nivelAfinidad, interpretaciones) {
  var htmlBody = generarHTMLCorreo(nombre, duracion, factores, nivelAfinidad, interpretaciones);

  MailApp.sendEmail({
    to: email,
    subject: "Resultados de tu Test de Monotonía",
    htmlBody: htmlBody,
  });
}

// ------------------------------------------------------------
// FUNCIÓN PRINCIPAL — ejecutar manualmente
//
// Lee datos personales de la primera pestaña (form responses):
//   Col 35: Nombre, Col 36: Tiempo en relación, Col 37: Email
//
// Lee puntuaciones numéricas de "Respuestas recodificadas":
//   Cols AU–AZ (0-based 46–51): puntuación de cada factor (máx. 42)
//   Col  BA    (0-based 52): nivel de afinidad total (máx. 238)
//   Cols BB–BG (0-based 53–58): nivel texto de cada factor
//   Col  BH    (0-based 59): nivel de afinidad texto
//
// Lee textos de interpretación de "Interpretaciones".
// ------------------------------------------------------------
function enviarCorreoDesdeGoogleSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Obtener hoja de respuestas del formulario: se busca por nombre típico de Google Forms;
  // si no existe con ese nombre, se usa la primera pestaña como fallback.
  var hojaRespuestas = ss.getSheetByName("Respuestas de formulario 1") || ss.getSheets()[0];
  var hojaRecod = ss.getSheetByName(NOMBRE_HOJA_RECOD);
  if (!hojaRecod) {
    Logger.log("ERROR: No se encontró la pestaña '" + NOMBRE_HOJA_RECOD + "'.");
    return;
  }

  var interpretaciones = leerInterpretaciones(ss);
  if (Object.keys(interpretaciones).length === 0) {
    Logger.log("ERROR: La pestaña '" + NOMBRE_HOJA_INTERP + "' está vacía o no se pudo leer. Se cancela el envío.");
    return;
  }

  var datos = hojaRespuestas.getDataRange().getValues();

  for (var fila = 1; fila < datos.length; fila++) {
    var d = datos[fila];

    var email    = String(d[COL_EMAIL]).trim();
    var nombre   = String(d[COL_NOMBRE]).trim();
    var duracion = String(d[COL_DURACION]).trim();

    if (!email) {
      Logger.log("Fila " + (fila + 1) + " sin email, se omite.");
      continue;
    }
    if (!nombre) {
      Logger.log("Fila " + (fila + 1) + " sin nombre, se omite.");
      continue;
    }

    var numFilaGAS = fila + 1; // índice 0-based → fila GAS 1-based
    var resultado = leerNivelesFila(hojaRecod, numFilaGAS);

    if (!resultado.nivelAfinidad) {
      Logger.log("Fila " + numFilaGAS + " sin nivel de afinidad calculado, se omite.");
      continue;
    }

    try {
      enviarCorreo(email, nombre, duracion, resultado.factores, resultado.nivelAfinidad, interpretaciones);
      Logger.log(
        "Correo enviado → " + email +
        " (" + nombre + ")" +
        " | Afinidad: " + resultado.nivelAfinidad +
        " (" + resultado.puntajeTotal + "/238)"
      );
    } catch (e) {
      Logger.log("ERROR al enviar a " + email + " (fila " + numFilaGAS + "): " + e.message);
    }
  }
}

// ============================================================
// Test Monotonía — Script de correo de resultados
// Para copiar/pegar en Google Apps Script (editor de la hoja)
//
// Hojas requeridas:
//   "Respuestas recodificadas": fila 1 = cabecera, filas 2+ = datos
//     Col 53 (0-based): Conexión relacional → nivel texto
//     Col 54: Conexión Sexual → nivel texto
//     Col 55: Gestión emocional → nivel texto
//     Col 56: Cercanía emocional → nivel texto
//     Col 57: Atención activa → nivel texto
//     Col 58: Percepción del tiempo → nivel texto
//     Col 59: Nivel de monotonía (ej. "Bajo 🥰", "Medio 😳", etc.)
//
//   "Interpretaciones": col A = clave, col B = texto
//     Filas 1–4:   Header "Conexión relacional" + 3 niveles
//     Filas 6–9:   Header "Conexión sexual" + 3 niveles
//     Filas 11–14: Header "Gestión emocional" + 3 niveles
//     Filas 16–19: Header "Cercanía emocional" + 3 niveles
//     Filas 21–24: Header "Atención activa" + 3 niveles
//     Filas 26–29: Header "Percepción del tiempo" + 3 niveles
//     Filas 31–35: Header "Nivel de monotonía" + 4 niveles
//     Filas 37–41: Header "Recomendaciones" + 4 niveles
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
var COL_FACTOR_INICIO   = 53;  // 0-based, Conexión relacional
var NUM_FACTORES        = 6;
// COL_NIVEL_MONOTONIA = COL_FACTOR_INICIO + NUM_FACTORES = 59 (0-based)
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
// PORCENTAJE DE BARRA según nivel de factor
// (Los niveles de monotonía global no llevan barra)
// ------------------------------------------------------------
function getPorcentajeBarra(nivel) {
  if (nivel.startsWith("Estable"))       return 100;
  if (nivel.startsWith("En desarrollo")) return 55;
  if (nivel.startsWith("Por mejorar"))   return 20;
  return 50;
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
// LEER NIVELES DE UNA FILA de "Respuestas recodificadas"
// numFila: número de fila 1-based (convención GAS)
// Devuelve { factores: [{nombre, nivel}, …], nivelMonotonia }
// ------------------------------------------------------------
function leerNivelesFila(hojaRecod, numFila) {
  // 7 columnas: 6 factores + nivel de monotonía global
  var rango = hojaRecod.getRange(numFila, COL_FACTOR_INICIO + 1, 1, NUM_FACTORES + 1);
  var valores = rango.getValues()[0];

  var factores = [];
  for (var i = 0; i < NUM_FACTORES; i++) {
    factores.push({
      nombre: NOMBRES_FACTORES[i],
      nivel:  String(valores[i]).trim()
    });
  }

  return {
    factores:       factores,
    nivelMonotonia: String(valores[NUM_FACTORES]).trim()
  };
}

// ------------------------------------------------------------
// GENERACIÓN DEL HTML DEL CORREO
// ------------------------------------------------------------
function generarHTMLCorreo(nombre, duracion, factores, nivelMonotonia, interpretaciones) {
  var estiloGeneral = getEstiloNivel(nivelMonotonia);

  // --- Tarjetas de factores (6) ---
  var tarjetasFactores = "";
  for (var i = 0; i < factores.length; i++) {
    var f = factores[i];
    var estilo = getEstiloNivel(f.nivel);
    var porcentajeBarra = getPorcentajeBarra(f.nivel);
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

  // --- Sección Recomendación ---
  var textoRecomendacion = buscarInterpretacion(interpretaciones, "Recomendaciones", nivelMonotonia);
  var seccionRecomendacion = [
    '<div style="',
      'background-color:#FFF3F1;',
      'border:2px solid #FA523C;',
      'border-radius:12px;',
      'padding:20px 24px;',
      'margin-top:24px;',
    '">',
      '<p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#FA523C;text-transform:uppercase;letter-spacing:0.05em;">',
        'Recomendación',
      '</p>',
      '<p style="font-size:14px;color:#3D2E2A;line-height:1.6;margin:0;">',
        textoRecomendacion,
      '</p>',
    '</div>',
  ].join('');

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
          ' style="display:block;margin:0 auto 16px;max-width:140px;">',
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

        // Badge nivel de monotonía
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
            'Nivel de monotonía',
          '</p>',
          '<p style="margin:0;font-size:24px;font-weight:700;color:', estiloGeneral.text, ';">',
            nivelMonotonia,
          '</p>',
        '</div>',

        // Tarjetas de factores
        '<h2 style="font-size:16px;color:#3D2E2A;font-weight:700;margin:0 0 16px;">',
          'Detalle por área',
        '</h2>',
        tarjetasFactores,

        // Sección Recomendación
        seccionRecomendacion,

        // Separador
        '<hr style="border:none;border-top:1px solid #E8D9C8;margin:28px 0;">',

        // Reflexión + CTA
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;">',
          'La monotonía no aparece de un día para otro; suele ser el resultado de pequeños momentos de ',
          'desconexión que se van acumulando con el tiempo. La buena noticia es que las relaciones también ',
          'pueden transformarse cuando se les dedica espacio, atención y nuevas herramientas.',
        '</p>',
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;">',
          'Si quieres empezar a fortalecerla de forma consciente, la terapia de pareja puede ser un ',
          'espacio seguro para hacerlo. Puedes reservar una sesión conmigo aquí.',
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
function enviarCorreo(email, nombre, duracion, factores, nivelMonotonia, interpretaciones) {
  var htmlBody = generarHTMLCorreo(nombre, duracion, factores, nivelMonotonia, interpretaciones);

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
// Lee niveles pre-calculados de "Respuestas recodificadas":
//   Cols 53–58: niveles de los 6 factores
//   Col 59: nivel global de monotonía
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

  var datos = hojaRespuestas.getDataRange().getValues();

  for (var fila = 1; fila < datos.length; fila++) {
    var d = datos[fila];

    var email    = String(d[COL_EMAIL]).trim();
    var nombre   = String(d[COL_NOMBRE]).trim();
    var duracion = String(d[COL_DURACION]).trim();

    if (!email || email === "") {
      Logger.log("Fila " + (fila + 1) + " sin email, se omite.");
      continue;
    }

    var numFilaGAS = fila + 1; // índice 0-based → fila GAS 1-based
    var resultado = leerNivelesFila(hojaRecod, numFilaGAS);

    if (!resultado.nivelMonotonia) {
      Logger.log("Fila " + numFilaGAS + " sin nivel de monotonía calculado, se omite.");
      continue;
    }

    enviarCorreo(email, nombre, duracion, resultado.factores, resultado.nivelMonotonia, interpretaciones);

    Logger.log(
      "Correo enviado → " + email +
      " (" + nombre + ")" +
      " | Monotonía: " + resultado.nivelMonotonia
    );
  }
}

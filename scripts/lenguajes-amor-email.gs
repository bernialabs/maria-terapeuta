// ============================================================
// Test Lenguajes del Amor — Script de correo de resultados
// Para copiar/pegar en Google Apps Script (editor de la hoja)
//
// Estructura del Google Form / Sheets:
//   Pestaña "Respuestas de formulario 1"
//   Col 0   (A):     Marca temporal
//   Col 1–35  (B–AJ): Q1–7 RECIBIR (5 sub-items × 7 preguntas)
//   Col 36–70 (AK–BS): Q8–14 DAR (5 sub-items × 7 preguntas)
//   Col 71  (BT):    Q15 (familiaridad concepto)
//   Col 72–76 (BU–BY): Q16 (qué te gusta RECIBIR, directo)
//   Col 77–81 (BZ–CD): Q17 (qué te gusta DAR, directo)
//   Col 82  (CE):    Nombre
//   Col 83  (CF):    Email    ← verificado con diagnosticarUltimaFila()
//   Col 84  (CG):    Autorización
//   Col 85  (CH):    (vacío o campo extra)
//
//   Pestaña "recodificación"
//   Col 140–144 (EK–EO): Puntuaciones RECIBIR (5 lenguajes, %)
//   Col 145–149 (EP–ET): Puntuaciones DAR (5 lenguajes, %)
//   Los headers de EK–EO son las claves de lookup para Interpretación RECIBIR
//   Los headers de EP–ET son las claves de lookup para Interpretación DAR
//   Nota: "Regalos_RECIBIR" en EK y "Regalos_DAR" en EP → claves distintas en Interpretación
//
//   Pestaña "Interpretación"
//   A1:B6   → Significado RECIBIR  (fila 1 = header, filas 2–6 = lenguajes)
//   A8:B13  → Advertencia RECIBIR
//   A15:B20 → Salvedad RECIBIR
//   A22:B27 → Significado DAR
//   A29:B34 → Advertencia DAR
//   A36:B41 → Salvedad DAR
//   Columna A = clave del lenguaje (ej. "Regalos_RECIBIR"), Columna B = texto
// ============================================================

// Índices de columna (0-based) en "recodificación"
var COL_RECIBIR_INICIO = 140; // EK
var COL_DAR_INICIO     = 145; // EP
var NUM_LENGUAJES      = 5;

// Máximo porcentaje posible por lenguaje (escala de la gráfica)
var MAX_PCT_LENGUAJE = 33;

// Índices de columna (0-based) en "Respuestas de formulario 1"
var COL_NOMBRE = 82; // CE
var COL_EMAIL  = 83; // CF

// Alias para normalizar nombres de display (no afecta claves de lookup)
var ALIAS_DISPLAY = { "Dar regalos": "Regalos" };

// ------------------------------------------------------------
// INSTALAR TRIGGER (ejecutar UNA sola vez manualmente)
// Después de ejecutar, verificar en Activadores del proyecto.
// ------------------------------------------------------------
function configurarTrigger() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Eliminar triggers previos del mismo tipo para evitar duplicados
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "onFormSubmit") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();

  Logger.log("Trigger onFormSubmit instalado correctamente.");
}

// ------------------------------------------------------------
// ENTRY POINT — disparado por el formulario
// ------------------------------------------------------------
function onFormSubmit(e) {
  try {
    var fila = e.range.getRow();
    Logger.log("onFormSubmit disparado para fila: " + fila);
    procesarFila(fila);
  } catch (err) {
    Logger.log("Error en onFormSubmit: " + err.toString());
  }
}

// ------------------------------------------------------------
// ORQUESTADOR PRINCIPAL
// ------------------------------------------------------------
function procesarFila(numFila) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Dar tiempo a que las fórmulas de "recodificación" se calculen
  SpreadsheetApp.flush();
  Utilities.sleep(3000);

  // Leer fila de respuestas (ancho derivado de las constantes de columna)
  var anchoLectura = Math.max(COL_NOMBRE, COL_EMAIL) + 1;
  var hojaRespuestas = ss.getSheets()[0]; // primera pestaña
  var filaData = hojaRespuestas.getRange(numFila, 1, 1, anchoLectura).getValues()[0];

  var nombre = String(filaData[COL_NOMBRE]).trim();
  var email  = String(filaData[COL_EMAIL]).trim();

  if (!email || email === "") {
    Logger.log("Fila " + numFila + " sin email, se omite.");
    return;
  }

  // Leer pestaña "recodificación"
  var hojaRecod = ss.getSheetByName("recodificación");
  if (!hojaRecod) {
    Logger.log("ERROR: No se encontró la pestaña 'recodificación'.");
    return;
  }

  // Cabecera de nombres (fila 1, índice 0)
  var cabecera = hojaRecod.getRange(1, 1, 1, COL_DAR_INICIO + NUM_LENGUAJES).getValues()[0];

  // Construir tres arrays paralelos:
  //   nombresDisplay     → nombre visible en gráfica y correo (sin sufijo, con alias)
  //   lookupKeysRecibir  → clave real en Interpretación para dimensión RECIBIR (ej. "Regalos_RECIBIR")
  //   lookupKeysDar      → clave real en Interpretación para dimensión DAR     (ej. "Regalos_DAR")
  var nombresDisplay    = [];
  var lookupKeysRecibir = [];
  var lookupKeysDar     = [];

  for (var i = 0; i < NUM_LENGUAJES; i++) {
    var rawRecibir = String(cabecera[COL_RECIBIR_INICIO + i]).trim();
    var rawDar     = String(cabecera[COL_DAR_INICIO     + i]).trim();
    lookupKeysRecibir.push(rawRecibir);
    lookupKeysDar.push(rawDar);

    // Nombre de display: eliminar sufijo _RECIBIR/_DAR y aplicar alias
    var displayName = rawRecibir.replace(/_(RECIBIR|DAR)$/i, "").trim();
    nombresDisplay.push(ALIAS_DISPLAY[displayName] || displayName);
  }

  // Puntuaciones de la fila actual
  var scoreRow = hojaRecod.getRange(numFila, 1, 1, COL_DAR_INICIO + NUM_LENGUAJES).getValues()[0];

  function leerScores(row) {
    var recibir = [], dar = [];
    for (var n = 0; n < NUM_LENGUAJES; n++) {
      recibir.push(Number(row[COL_RECIBIR_INICIO + n]));
      dar.push(Number(row[COL_DAR_INICIO + n]));
    }
    return { recibir: recibir, dar: dar };
  }

  function scoresCargados(recibir, dar) {
    var sumR = recibir.reduce(function(a, b) { return a + b; }, 0);
    var sumD = dar.reduce(function(a, b) { return a + b; }, 0);
    return sumR > 0 && sumD > 0;
  }

  var scores = leerScores(scoreRow);

  // Reintentar si RECIBIR o DAR aún están vacíos (fórmulas calculando)
  if (!scoresCargados(scores.recibir, scores.dar)) {
    Logger.log("Scores vacíos en fila " + numFila + ", reintentando en 5s…");
    Utilities.sleep(5000);
    SpreadsheetApp.flush();
    scoreRow = hojaRecod.getRange(numFila, 1, 1, COL_DAR_INICIO + NUM_LENGUAJES).getValues()[0];
    scores = leerScores(scoreRow);
    if (!scoresCargados(scores.recibir, scores.dar)) {
      Logger.log("ERROR: scores aún vacíos tras retry en fila " + numFila + ", se omite.");
      return;
    }
  }

  var puntajesRecibir = scores.recibir;
  var puntajesDar     = scores.dar;

  // Leer interpretaciones
  var lookup = leerInterpretaciones(ss);

  // Ordenar por puntaje (cada ítem lleva su clave de lookup)
  var datosRecibir = ordenarPorPuntaje(nombresDisplay, lookupKeysRecibir, puntajesRecibir);
  var datosDar     = ordenarPorPuntaje(nombresDisplay, lookupKeysDar,     puntajesDar);

  // Construir bloques de interpretación usando la clave de lookup correcta
  var interpRecibir = construirInterpretacion(lookup, datosRecibir[0].lookupKey, "recibir");
  var interpDar     = construirInterpretacion(lookup, datosDar[0].lookupKey,     "dar");

  // Enviar correo
  enviarCorreo(email, nombre, datosRecibir, datosDar, interpRecibir, interpDar);

  Logger.log(
    "Correo enviado → " + email +
    " (" + nombre + ")" +
    " | RECIBIR: " + datosRecibir[0].nombre + " (" + datosRecibir[0].puntaje + "%)" +
    " | DAR: " + datosDar[0].nombre + " (" + datosDar[0].puntaje + "%)"
  );
}

// ------------------------------------------------------------
// LEER INTERPRETACIONES de la pestaña "Interpretación"
// Devuelve objeto lookup:
//   lookup[dimension][tipo][clavelenguaje] = texto
//   dimension: "recibir" | "dar"
//   tipo: "significado" | "advertencia" | "salvedad"
// ------------------------------------------------------------
function leerInterpretaciones(ss) {
  var hoja = ss.getSheetByName("Interpretación");
  if (!hoja) {
    Logger.log("ERROR: No se encontró la pestaña 'Interpretación'.");
    return {};
  }

  var lookup = {
    recibir: { significado: {}, advertencia: {}, salvedad: {} },
    dar:     { significado: {}, advertencia: {}, salvedad: {} }
  };

  // A1:B6   → Significado RECIBIR (fila 1 = header, filas 2–6 = datos)
  // A8:B13  → Advertencia RECIBIR
  // A15:B20 → Salvedad RECIBIR
  // A22:B27 → Significado DAR
  // A29:B34 → Advertencia DAR
  // A36:B41 → Salvedad DAR
  var bloques = [
    { dim: "recibir", tipo: "significado", filaInicio: 2,  filaFin: 6  },
    { dim: "recibir", tipo: "advertencia", filaInicio: 9,  filaFin: 13 },
    { dim: "recibir", tipo: "salvedad",    filaInicio: 16, filaFin: 20 },
    { dim: "dar",     tipo: "significado", filaInicio: 23, filaFin: 27 },
    { dim: "dar",     tipo: "advertencia", filaInicio: 30, filaFin: 34 },
    { dim: "dar",     tipo: "salvedad",    filaInicio: 37, filaFin: 41 }
  ];

  for (var b = 0; b < bloques.length; b++) {
    var bloque = bloques[b];
    var numFilas = bloque.filaFin - bloque.filaInicio + 1;
    var valores = hoja.getRange(bloque.filaInicio, 1, numFilas, 2).getValues();
    for (var r = 0; r < valores.length; r++) {
      var clave = String(valores[r][0]).trim();
      var texto = String(valores[r][1]).trim();
      if (clave) {
        lookup[bloque.dim][bloque.tipo][clave] = texto;
      }
    }
  }

  return lookup;
}

// ------------------------------------------------------------
// BUSCAR INTERPRETACIÓN en el lookup
// ------------------------------------------------------------
function buscarInterpretacion(lookup, lenguaje, tipo, dimension) {
  if (
    lookup[dimension] &&
    lookup[dimension][tipo] &&
    lookup[dimension][tipo][lenguaje]
  ) {
    return lookup[dimension][tipo][lenguaje];
  }
  Logger.log("AVISO: sin interpretación para lenguaje='" + lenguaje + "' tipo='" + tipo + "' dimension='" + dimension + "'");
  return "(Interpretación no disponible para: " + lenguaje + " / " + tipo + " / " + dimension + ")";
}

// ------------------------------------------------------------
// CONSTRUIR BLOQUE DE INTERPRETACIÓN para el lenguaje principal
// lenguajePrincipal = clave de lookup (ej. "Regalos_RECIBIR")
// ------------------------------------------------------------
function construirInterpretacion(lookup, lenguajePrincipal, dimension) {
  return {
    significado: buscarInterpretacion(lookup, lenguajePrincipal, "significado", dimension),
    advertencia: buscarInterpretacion(lookup, lenguajePrincipal, "advertencia", dimension),
    salvedad:    buscarInterpretacion(lookup, lenguajePrincipal, "salvedad",    dimension)
  };
}

// ------------------------------------------------------------
// ORDENAR LENGUAJES DE MAYOR A MENOR PUNTAJE
// Devuelve [{ nombre (display), lookupKey, puntaje }, …]
// ------------------------------------------------------------
function ordenarPorPuntaje(nombres, lookupKeys, puntajes) {
  var pares = [];
  for (var i = 0; i < nombres.length; i++) {
    pares.push({ nombre: nombres[i], lookupKey: lookupKeys[i], puntaje: puntajes[i] });
  }
  pares.sort(function(a, b) { return b.puntaje - a.puntaje; });
  return pares;
}

// ------------------------------------------------------------
// GRÁFICA DE BARRAS VERTICALES (email-safe, table-based)
// Altura máxima: 120px
// Escala: MAX_PCT_LENGUAJE (33%) = altura máxima
// Barras ordenadas de mayor a menor (recibe datos ya ordenados)
// ------------------------------------------------------------
function generarGraficaHTML(datos) {
  var alturaMax = 120;
  var anchoColumna = Math.floor(100 / datos.length);

  // Abreviaciones para labels cortos (máx ~8 chars visibles)
  var abrevs = {
    "Palabras de afirmación": "Palabras",
    "Palabras de Afirmación": "Palabras",
    "Actos de servicio":      "Actos",
    "Actos de Servicio":      "Actos",
    "Regalos":                "Regalos",
    "Tiempo de calidad":      "Tiempo",
    "Tiempo de Calidad":      "Tiempo",
    "Contacto físico":        "Contacto",
    "Contacto Físico":        "Contacto"
  };

  function abreviar(nombre) {
    return abrevs[nombre] || nombre.split(" ")[0];
  }

  var cols = "";
  for (var i = 0; i < datos.length; i++) {
    var d = datos[i];
    var pct = Math.round(d.puntaje);
    // Escalar al máximo de 33%: barra llena = MAX_PCT_LENGUAJE
    var altBarra = Math.round(Math.min(d.puntaje, MAX_PCT_LENGUAJE) / MAX_PCT_LENGUAJE * alturaMax);
    var altVacio  = alturaMax - altBarra;
    var esPrincipal = (i === 0);
    var colorBarra  = esPrincipal ? "#FA523C" : "#F7C5BD";
    var colorTexto  = esPrincipal ? "#FA523C" : "#888888";

    cols += [
      '<td style="width:', anchoColumna, '%;vertical-align:bottom;padding:0 4px;text-align:center;">',

        // Porcentaje encima de la barra (valor real)
        '<div style="font-size:12px;font-weight:700;color:', colorTexto, ';margin-bottom:4px;">',
          pct, '%',
        '</div>',

        // Contenedor de barra
        '<table width="100%" cellpadding="0" cellspacing="0" style="height:', alturaMax, 'px;">',
          '<tr>',
            '<td style="height:', altVacio, 'px;vertical-align:top;"></td>',
          '</tr>',
          '<tr>',
            '<td style="',
              'height:', altBarra, 'px;',
              'background-color:', colorBarra, ';',
              'border-radius:4px 4px 0 0;',
              'vertical-align:bottom;',
            '"></td>',
          '</tr>',
        '</table>',

        // Label bajo la barra
        '<div style="font-size:10px;color:#3D2E2A;margin-top:4px;word-break:break-word;line-height:1.2;">',
          abreviar(d.nombre),
        '</div>',

      '</td>'
    ].join('');
  }

  return [
    '<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">',
      '<tr>', cols, '</tr>',
    '</table>'
  ].join('');
}

// ------------------------------------------------------------
// BLOQUE DE INTERPRETACIÓN HTML (3 sub-secciones)
// ------------------------------------------------------------
function generarBloqueInterpretacionHTML(interp) {
  function subSeccion(icono, titulo, texto) {
    return [
      '<div style="margin-bottom:14px;">',
        '<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#3D2E2A;">',
          icono, ' ', titulo,
        '</p>',
        '<p style="margin:0;font-size:14px;color:#3D2E2A;line-height:1.6;">',
          texto,
        '</p>',
      '</div>'
    ].join('');
  }

  return [
    '<div style="',
      'background-color:#ffffff;',
      'border-radius:12px;',
      'padding:20px 24px;',
      'margin-top:12px;',
      'box-shadow:0 1px 4px rgba(0,0,0,0.08);',
    '">',
      subSeccion("💬", "¿Qué significa?",  interp.significado),
      subSeccion("⚠️", "Ten en cuenta",    interp.advertencia),
      subSeccion("✨", "Recomendación",    interp.salvedad),
    '</div>'
  ].join('');
}

// ------------------------------------------------------------
// HTML COMPLETO DEL CORREO
// ------------------------------------------------------------
function generarHTMLCorreo(nombre, datosRecibir, datosDar, interpRecibir, interpDar) {
  var graficaRecibir = generarGraficaHTML(datosRecibir);
  var graficaDar     = generarGraficaHTML(datosDar);

  var interpRecibirHTML = generarBloqueInterpretacionHTML(interpRecibir);
  var interpDarHTML     = generarBloqueInterpretacionHTML(interpDar);

  var lenguajePrincipalRecibir = datosRecibir[0].nombre;
  var lenguajePrincipalDar     = datosDar[0].nombre;

  return [
    '<!DOCTYPE html>',
    '<html lang="es">',
    '<head>',
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width,initial-scale=1.0">',
      '<title>Resultados de tu Test de Lenguajes del Amor</title>',
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
          'Resultados: Test de Lenguajes del Amor',
        '</h1>',
      '</td></tr>',

      // CUERPO principal
      '<tr><td style="background-color:#FAF2E8;padding:32px 28px;">',

        // Saludo e intro
        '<p style="font-size:16px;color:#3D2E2A;line-height:1.6;margin-top:0;">',
          'Hola <strong>', nombre, '</strong>,',
        '</p>',
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;">',
          'Gracias por completar el test. A continuación encontrarás tus resultados en dos ',
          'dimensiones: cómo prefieres <strong>recibir</strong> amor y cómo tiendes a ',
          '<strong>expresarlo</strong>.',
        '</p>',
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;margin-bottom:28px;">',
          'Este pequeño mapa puede ayudarte a comprender mejor lo que necesitas y también lo que ofreces.',
        '</p>',

        // ===== SECCIÓN RECIBIR =====
        '<h2 style="font-size:18px;font-weight:700;color:#FA523C;margin:0 0 4px;',
          'border-left:4px solid #FA523C;padding-left:12px;">',
          'Cómo prefieres RECIBIR amor',
        '</h2>',
        '<p style="font-size:13px;color:#888;margin:0 0 8px;padding-left:16px;">',
          '(de mayor a menor importancia)',
        '</p>',

        graficaRecibir,

        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;margin:12px 0 4px;">',
          'Tu lenguaje principal para <strong>recibir</strong> es:',
        '</p>',
        '<p style="',
          'font-size:20px;',
          'font-weight:700;',
          'color:#FA523C;',
          'margin:0 0 16px;',
        '">',
          lenguajePrincipalRecibir,
        '</p>',

        interpRecibirHTML,

        // SEPARADOR
        '<hr style="border:none;border-top:1px solid #E8D9C8;margin:32px 0;">',

        // ===== SECCIÓN DAR =====
        '<h2 style="font-size:18px;font-weight:700;color:#F26749;margin:0 0 4px;',
          'border-left:4px solid #F26749;padding-left:12px;">',
          'Cómo prefieres DAR amor',
        '</h2>',
        '<p style="font-size:13px;color:#888;margin:0 0 8px;padding-left:16px;">',
          '(de mayor a menor importancia)',
        '</p>',

        graficaDar,

        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;margin:12px 0 4px;">',
          'Tu lenguaje principal para <strong>dar</strong> es:',
        '</p>',
        '<p style="',
          'font-size:20px;',
          'font-weight:700;',
          'color:#F26749;',
          'margin:0 0 16px;',
        '">',
          lenguajePrincipalDar,
        '</p>',

        interpDarHTML,

        // SEPARADOR
        '<hr style="border:none;border-top:1px solid #E8D9C8;margin:32px 0;">',

        // REFLEXIÓN + CTA
        '<p style="font-size:15px;color:#3D2E2A;line-height:1.6;">',
          'Cuando tu lenguaje para recibir y el de tu pareja para dar son diferentes, ',
          'pueden surgir malentendidos aunque haya amor. La terapia de pareja es un espacio ',
          'ideal para aprender a hablar el lenguaje de amor del otro y enriquecer la conexión.',
        '</p>',

        // Botón WhatsApp
        '<div style="text-align:center;margin:28px 0;">',
          '<a href="https://wa.me/34666905970?text=Hola!%20Acab%C3%A9%20el%20test%20de%20lenguajes%20del%20amor%20y%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n."',
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
            'Agendar una sesión',
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
          'Este correo fue generado automáticamente tras completar el Test de Lenguajes del Amor.<br>',
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
// ENVIAR CORREO
// ------------------------------------------------------------
function enviarCorreo(email, nombre, datosRecibir, datosDar, interpRecibir, interpDar) {
  var htmlBody = generarHTMLCorreo(nombre, datosRecibir, datosDar, interpRecibir, interpDar);

  MailApp.sendEmail({
    to: email,
    subject: "Resultados de tu Test de Lenguajes del Amor",
    htmlBody: htmlBody,
  });
}

// ------------------------------------------------------------
// DIAGNÓSTICO — ejecutar manualmente para verificar columnas
// Imprime en el log los valores clave de la última fila de datos.
// ------------------------------------------------------------
function diagnosticarUltimaFila() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheets()[0];
  var ultimaFila = hoja.getLastRow();
  var datos = hoja.getRange(ultimaFila, 1, 1, 90).getValues()[0];

  Logger.log("=== FILA " + ultimaFila + " ===");
  Logger.log("COL 82 (CE) Nombre  → " + datos[82]);
  Logger.log("COL 83 (CF) Email   → " + datos[83]);
  Logger.log("COL 84 (CG) ¿Autor? → " + datos[84]);
  Logger.log("COL 85 (CH) ¿Vacío? → " + datos[85]);

  Logger.log("--- Recodificación ---");
  var hojaRecod = ss.getSheetByName("recodificación");
  var scoreRow = hojaRecod.getRange(ultimaFila, 1, 1, 155).getValues()[0];

  Logger.log("COL 140 (EK) RECIBIR[0] → " + scoreRow[140]);
  Logger.log("COL 141 (EL) RECIBIR[1] → " + scoreRow[141]);
  Logger.log("COL 142 (EM) RECIBIR[2] → " + scoreRow[142]);
  Logger.log("COL 143 (EN) RECIBIR[3] → " + scoreRow[143]);
  Logger.log("COL 144 (EO) RECIBIR[4] → " + scoreRow[144]);
  Logger.log("COL 145 (EP) DAR[0]     → " + scoreRow[145]);
  Logger.log("COL 146 (EQ) DAR[1]     → " + scoreRow[146]);
  Logger.log("COL 147 (ER) DAR[2]     → " + scoreRow[147]);
  Logger.log("COL 148 (ES) DAR[3]     → " + scoreRow[148]);
  Logger.log("COL 149 (ET) DAR[4]     → " + scoreRow[149]);

  Logger.log("--- Cabecera nombres (recodificación fila 1) ---");
  var cab = hojaRecod.getRange(1, 1, 1, 155).getValues()[0];
  Logger.log("COL 140 (EK) → " + cab[140]);
  Logger.log("COL 141 (EL) → " + cab[141]);
  Logger.log("COL 142 (EM) → " + cab[142]);
  Logger.log("COL 143 (EN) → " + cab[143]);
  Logger.log("COL 144 (EO) → " + cab[144]);
  Logger.log("COL 145 (EP) → " + cab[145]);
  Logger.log("COL 146 (EQ) → " + cab[146]);
  Logger.log("COL 147 (ER) → " + cab[147]);
  Logger.log("COL 148 (ES) → " + cab[148]);
  Logger.log("COL 149 (ET) → " + cab[149]);
}

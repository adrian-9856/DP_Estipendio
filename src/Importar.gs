// ============================================================
// IMPORTACIÓN DESDE KOBOTOOLBOX
// ============================================================

/**
 * Función principal de importación.
 * Descarga el CSV de KoboToolbox, filtra datos del año AÑO_FILTRO
 * y agrega solo registros nuevos (sin duplicados por _uuid).
 */
function importarDesdeKobo() {
  const ui = SpreadsheetApp.getUi();

  try {
    escribirLog('Iniciando importación desde KoboToolbox...', 'INFO');

    // 1. Descargar CSV
    const csvText = _fetchCSV(KOBO_URL);
    if (!csvText) {
      throw new Error('No se recibieron datos desde KoboToolbox.');
    }

    // 2. Parsear CSV
    const filas = parseCSV(csvText);
    escribirLog('CSV descargado. Registros totales: ' + filas.length, 'INFO');

    // 3. Filtrar solo AÑO_FILTRO
    const filasFiltradas = filas.filter(f => {
      const añoFecha = extraerAño(f[COL.FECHA]);
      const añoSub   = extraerAño(f[COL.SUBMISSION_TIME]);
      return añoFecha === AÑO_FILTRO || añoSub === AÑO_FILTRO;
    });
    escribirLog('Registros del año ' + AÑO_FILTRO + ': ' + filasFiltradas.length, 'INFO');

    if (filasFiltradas.length === 0) {
      escribirLog('No hay registros del año ' + AÑO_FILTRO + '.', 'INFO');
      ui.alert('Sin datos',
        'No se encontraron registros del año ' + AÑO_FILTRO + ' en KoboToolbox.',
        ui.ButtonSet.OK);
      return;
    }

    // 4. Obtener UUIDs ya importados
    const uuidsExistentes = _obtenerUUIDsExistentes();

    // 5. Filtrar duplicados
    const filasNuevas = filasFiltradas.filter(f => {
      const uuid = (f[COL.UUID] || '').trim();
      return uuid && !uuidsExistentes.has(uuid);
    });

    if (filasNuevas.length === 0) {
      const msg = 'No hay registros nuevos. Todos ya estaban importados.';
      escribirLog(msg, 'INFO');
      ui.alert('Sin novedades', msg, ui.ButtonSet.OK);
      return;
    }

    // 6. Escribir en hoja DATOS
    const hojaDatos = obtenerOCrearHoja(HOJAS.DATOS);
    _asegurarEncabezadosDatos(hojaDatos);

    const matrizNueva = filasNuevas.map(f =>
      HEADERS_DATOS.map(col => f[col] || '')
    );

    const primerFilaVacia = hojaDatos.getLastRow() + 1;
    hojaDatos.getRange(primerFilaVacia, 1, matrizNueva.length, HEADERS_DATOS.length)
      .setValues(matrizNueva);

    // Formato zebra para nuevas filas
    _aplicarFormatoZebra(hojaDatos, primerFilaVacia, matrizNueva.length);
    ajustarColumnas(hojaDatos, 1, Math.min(HEADERS_DATOS.length, 10), 200);

    // 7. Log y resumen
    const omitidos = filasFiltradas.length - filasNuevas.length;
    const resumen = `Importados: ${filasNuevas.length} | Omitidos (duplicados): ${omitidos} | Total en 2026: ${filasFiltradas.length}`;
    escribirLog(resumen, 'OK');

    // 8. Actualizar vistas derivadas
    actualizarDashboard();
    actualizarCohortes();
    actualizarResumenPresupuesto();

    ui.alert('Importación completada',
      `✅ ${resumen}\n\nEl Dashboard y Cohortes han sido actualizados.`,
      ui.ButtonSet.OK);

  } catch (e) {
    escribirLog('ERROR en importación: ' + e.message, 'ERROR', e.stack);
    ui.alert('Error en importación',
      'Ocurrió un error:\n' + e.message,
      ui.ButtonSet.OK);
  }
}

/** Descarga el CSV desde la URL de KoboToolbox. */
function _fetchCSV(url) {
  const opciones = {
    method: 'get',
    muteHttpExceptions: true,
    followRedirects: true,
    headers: {
      'Accept': 'text/csv',
    },
  };

  const respuesta = UrlFetchApp.fetch(url, opciones);
  const codigo = respuesta.getResponseCode();

  if (codigo !== 200) {
    throw new Error(`KoboToolbox respondió con código ${codigo}. Verifica el URL y permisos.`);
  }

  return respuesta.getContentText('UTF-8');
}

/** Retorna un Set con todos los _uuid ya importados en la hoja DATOS. */
function _obtenerUUIDsExistentes() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.DATOS);
  if (!hoja || hoja.getLastRow() < 2) return new Set();

  const colUUID = HEADERS_DATOS.indexOf(COL.UUID) + 1;
  if (colUUID === 0) return new Set();

  const valores = hoja.getRange(2, colUUID, hoja.getLastRow() - 1, 1).getValues();
  return new Set(valores.flat().map(v => String(v).trim()).filter(v => v));
}

/** Asegura que la hoja DATOS tenga los encabezados correctos. */
function _asegurarEncabezadosDatos(hoja) {
  if (hoja.getLastRow() === 0) {
    escribirEncabezados(hoja, HEADERS_DATOS, COLORES.PRIMARIO);
  }
}

/** Aplica color alternado (zebra) a filas de datos. */
function _aplicarFormatoZebra(hoja, desdeFilaNum, cantFilas) {
  for (let i = 0; i < cantFilas; i++) {
    const filaNum = desdeFilaNum + i;
    const color = (filaNum % 2 === 0) ? COLORES.FONDO_CARD : '#FFFFFF';
    hoja.getRange(filaNum, 1, 1, HEADERS_DATOS.length).setBackground(color);
  }
}

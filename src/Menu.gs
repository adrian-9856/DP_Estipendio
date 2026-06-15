// ============================================================
// MENÚ PRINCIPAL Y TRIGGERS
// ============================================================

/** Se ejecuta automáticamente al abrir el spreadsheet. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('DP Estipendios')
    .addItem('Importar datos desde KoboToolbox', 'importarDesdeKobo')
    .addSeparator()
    .addItem('Actualizar Dashboard', 'actualizarDashboard')
    .addItem('Actualizar Cohortes', 'actualizarCohortes')
    .addItem('Actualizar Presupuesto', 'actualizarResumenPresupuesto')
    .addSeparator()
    .addItem('Configurar estructura inicial', 'configurarEstructuraInicial')
    .addItem('Activar importación automática diaria', 'activarTriggerDiario')
    .addItem('Desactivar importación automática', 'desactivarTriggerDiario')
    .addToUi();
}

/**
 * Configura todas las hojas la primera vez.
 * Llama a esto antes de importar datos.
 */
function configurarEstructuraInicial() {
  const ui = SpreadsheetApp.getUi();

  try {
    // Asegura que existan todas las hojas
    Object.values(HOJAS).forEach(nombre => obtenerOCrearHoja(nombre));

    // Inicializa DATOS con encabezados
    const hojaDatos = obtenerOCrearHoja(HOJAS.DATOS);
    if (hojaDatos.getLastRow() === 0) {
      escribirEncabezados(hojaDatos, HEADERS_DATOS, COLORES.PRIMARIO);
    }

    // Inicializa PRESUPUESTO
    inicializarHojaPresupuesto();

    // Inicializa LOG
    const hojaLog = obtenerOCrearHoja(HOJAS.LOG);
    if (hojaLog.getLastRow() === 0) {
      escribirEncabezados(hojaLog,
        ['Fecha y Hora', 'Tipo', 'Mensaje', 'Detalles'],
        COLORES.PRIMARIO
      );
    }

    // Ordena las hojas
    _ordenarHojas();

    escribirLog('Estructura inicial configurada correctamente.', 'OK');
    ui.alert('DP Estipendios',
      '✅ Estructura inicial creada.\n\nAhora puedes importar datos desde KoboToolbox.',
      ui.ButtonSet.OK);

  } catch (e) {
    escribirLog('Error al configurar estructura: ' + e.message, 'ERROR');
    ui.alert('Error', 'No se pudo configurar la estructura:\n' + e.message, ui.ButtonSet.OK);
  }
}

/** Activa un trigger automático para importar cada día a las 6am Guatemala. */
function activarTriggerDiario() {
  // Elimina triggers existentes del mismo tipo
  desactivarTriggerDiario();

  ScriptApp.newTrigger('importarDesdeKobo')
    .timeBased()
    .everyDays(1)
    .atHour(6)
    .create();

  SpreadsheetApp.getUi().alert(
    'Importación automática activada',
    '✅ Los datos se importarán automáticamente todos los días a las 6:00 AM (hora Guatemala).',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
  escribirLog('Trigger diario activado.', 'OK');
}

/** Desactiva todos los triggers de importación automática. */
function desactivarTriggerDiario() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'importarDesdeKobo')
    .forEach(t => ScriptApp.deleteTrigger(t));
}

function _ordenarHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orden = [
    HOJAS.DASHBOARD, HOJAS.COHORTES,
    HOJAS.PRESUPUESTO, HOJAS.DATOS, HOJAS.LOG,
  ];
  orden.forEach((nombre, idx) => {
    const hoja = ss.getSheetByName(nombre);
    if (hoja) ss.moveActiveSheet && ss.setActiveSheet(hoja);
  });
}

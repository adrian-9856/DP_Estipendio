// ============================================================
// GESTIÓN DE PRESUPUESTO POR PROYECTO
// ============================================================

/**
 * Configura la hoja PRESUPUESTO con estructura inicial si está vacía.
 * Las personas ingresan manualmente el presupuesto asignado por proyecto.
 */
function inicializarHojaPresupuesto() {
  const hoja = obtenerOCrearHoja(HOJAS.PRESUPUESTO);

  if (hoja.getLastRow() > 0) return; // ya tiene datos

  // Título
  const rTit = hoja.getRange('B1:G1');
  rTit.merge();
  rTit.setValue('CONTROL DE PRESUPUESTO — ESTIPENDIOS ' + AÑO_FILTRO);
  rTit.setBackground(COLORES.PRIMARIO);
  rTit.setFontColor('#FFFFFF');
  rTit.setFontSize(14);
  rTit.setFontWeight('bold');
  rTit.setHorizontalAlignment('center');
  rTit.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 45);

  // Instrucciones
  const rInst = hoja.getRange('B2:G2');
  rInst.merge();
  rInst.setValue('Ingresa el Presupuesto Asignado por cada proyecto. El sistema calculará automáticamente lo Gastado y el Saldo.');
  rInst.setFontColor('#555555');
  rInst.setFontStyle('italic');
  rInst.setFontSize(9);
  hoja.setRowHeight(2, 22);

  // Encabezados
  const headers = [
    'Proyecto', 'Descripción', 'Presupuesto Asignado (Q)',
    'Total Gastado (Q)', 'Saldo Disponible (Q)', '% Ejecutado',
  ];
  const rEnc = hoja.getRange(3, 2, 1, headers.length);
  rEnc.setValues([headers]);
  rEnc.setBackground(COLORES.SECUNDARIO);
  rEnc.setFontColor('#FFFFFF');
  rEnc.setFontWeight('bold');
  rEnc.setFontSize(10);
  hoja.setFrozenRows(3);

  // Ejemplos (para guiar al usuario)
  const ejemplos = [
    ['Proyecto A', 'Descripción del proyecto', 50000, '', '', ''],
    ['Proyecto B', 'Descripción del proyecto', 30000, '', '', ''],
  ];
  const rEj = hoja.getRange(4, 2, ejemplos.length, headers.length);
  rEj.setValues(ejemplos);
  rEj.setBackground('#FFFDE7');
  rEj.setFontColor('#888888');
  rEj.setFontStyle('italic');

  // Nota sobre ejemplos
  hoja.getRange(6, 2).setValue(
    '⚠️ Reemplaza los ejemplos anteriores con tus proyectos reales y luego ejecuta "Actualizar Presupuesto".'
  ).setFontColor(COLORES.ROJO).setFontSize(9);

  // Anchos
  hoja.setColumnWidth(1, 20);
  hoja.setColumnWidth(2, 200);
  hoja.setColumnWidth(3, 200);
  hoja.setColumnWidth(4, 180);
  hoja.setColumnWidth(5, 180);
  hoja.setColumnWidth(6, 180);
  hoja.setColumnWidth(7, 140);
}

/**
 * Lee los proyectos y montos asignados en la hoja PRESUPUESTO,
 * cruza con los gastos reales de DATOS y actualiza las columnas calculadas.
 */
function actualizarResumenPresupuesto() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.PRESUPUESTO);
  if (!hoja || hoja.getLastRow() < 4) return;

  // Calcular gastos reales desde DATOS
  const datos    = _leerDatos();
  const gastosPorProyecto = _calcularGastosPorProyecto(datos);

  // Leer presupuesto asignado (fila 4 en adelante, columna B=proyecto, D=asignado)
  const ultimaFila = hoja.getLastRow();
  if (ultimaFila < 4) return;

  const rDatos = hoja.getRange(4, 2, ultimaFila - 3, 6);
  const valores = rDatos.getValues();

  const nuevosValores = valores.map((fila, idx) => {
    const proyecto  = String(fila[0] || '').trim();
    const descripcion = fila[1];
    let asignado    = parseMonto(fila[2]);

    if (!proyecto || proyecto.startsWith('⚠️')) return fila;

    const gastado   = gastosPorProyecto[proyecto] || 0;
    const saldo     = asignado - gastado;
    const pctEjec   = asignado > 0 ? ((gastado / asignado) * 100).toFixed(1) + '%' : '—';

    return [proyecto, descripcion, asignado, gastado, saldo, pctEjec];
  });

  rDatos.setValues(nuevosValores);

  // Aplicar formato a filas de datos
  nuevosValores.forEach((fila, idx) => {
    const filaNum = 4 + idx;
    const proyecto = String(fila[0] || '').trim();
    if (!proyecto || proyecto.startsWith('⚠️')) return;

    const gastado  = fila[3] || 0;
    const saldo    = fila[4] || 0;

    // Color del saldo: verde si positivo, rojo si negativo
    const colorSaldo = saldo >= 0 ? COLORES.VERDE : COLORES.ROJO;
    hoja.getRange(filaNum, 6).setFontColor(colorSaldo).setFontWeight('bold');

    // Color zebra
    const bg = idx % 2 === 0 ? COLORES.FONDO_CARD : '#FFFFFF';
    hoja.getRange(filaNum, 2, 1, 6).setBackground(bg);

    hoja.setRowHeight(filaNum, 22);
  });

  // Fila de TOTAL general
  _escribirTotalPresupuesto(hoja, nuevosValores, ultimaFila);

  escribirLog('Presupuesto actualizado.', 'OK');
}

function _calcularGastosPorProyecto(datos) {
  const gastos = {};
  datos.forEach(d => {
    const proyecto = (d[COL.PROYECTO] || 'Sin proyecto').trim();
    const monto    = parseMonto(d[COL.MONTO_TOTAL]);
    if (!gastos[proyecto]) gastos[proyecto] = 0;
    gastos[proyecto] += monto;
  });
  return gastos;
}

function _escribirTotalPresupuesto(hoja, valores, ultimaFilaDatos) {
  // Eliminar fila de total anterior si existe
  const filaTotal = ultimaFilaDatos + 2;

  let totalAsignado = 0;
  let totalGastado  = 0;

  valores.forEach(fila => {
    const proyecto = String(fila[0] || '').trim();
    if (!proyecto || proyecto.startsWith('⚠️')) return;
    totalAsignado += parseMonto(fila[2]);
    totalGastado  += parseMonto(fila[3]);
  });

  const totalSaldo = totalAsignado - totalGastado;
  const totalPct   = totalAsignado > 0
    ? ((totalGastado / totalAsignado) * 100).toFixed(1) + '%'
    : '—';

  const rTotal = hoja.getRange(filaTotal, 2, 1, 6);
  rTotal.setValues([[
    'TOTAL GENERAL', '',
    totalAsignado, totalGastado, totalSaldo, totalPct,
  ]]);
  rTotal.setBackground(COLORES.ACENTO);
  rTotal.setFontColor('#FFFFFF');
  rTotal.setFontWeight('bold');
  rTotal.setFontSize(11);
  hoja.setRowHeight(filaTotal, 26);

  // Colorear saldo total
  const colorTotal = totalSaldo >= 0 ? '#D5F5E3' : '#FADBD8';
  hoja.getRange(filaTotal, 6).setBackground(colorTotal).setFontColor('#000000');
}

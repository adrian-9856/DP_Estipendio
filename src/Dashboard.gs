// ============================================================
// DASHBOARD DE MÉTRICAS
// ============================================================

function actualizarDashboard() {
  const hoja = obtenerOCrearHoja(HOJAS.DASHBOARD);
  hoja.clearContents();
  hoja.clearFormats();
  hoja.clear();

  const datos = _leerDatos();

  if (datos.length === 0) {
    hoja.getRange('B2').setValue('Sin datos importados aún.');
    return;
  }

  const metricas = _calcularMetricas(datos);

  _escribirTituloDashboard(hoja);
  _escribirKPIs(hoja, metricas);
  _escribirTablaProyectos(hoja, metricas);
  _escribirGastoMensual(hoja, metricas);
  _escribirTopParticipantes(hoja, metricas);
  _escribirUltimaActualizacion(hoja);

  hoja.setColumnWidth(1, 20);
  hoja.setColumnWidth(2, 200);
  hoja.setColumnWidth(3, 160);
  hoja.setColumnWidth(4, 160);
  hoja.setColumnWidth(5, 160);
  hoja.setColumnWidth(6, 160);
  hoja.setColumnWidth(7, 20);
}

// ── Lectura de datos ──────────────────────────────────────────

function _leerDatos() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.DATOS);
  if (!hoja || hoja.getLastRow() < 2) return [];

  const headers = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];
  const filas   = hoja.getRange(2, 1, hoja.getLastRow() - 1, hoja.getLastColumn()).getValues();

  return filas.map(fila => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = fila[i]; });
    return obj;
  });
}

// ── Cálculo de métricas ───────────────────────────────────────

function _calcularMetricas(datos) {
  let totalGastado    = 0;
  const proyectos     = {};
  const participantes = new Set();
  const gastoMensual  = {};
  const porParticipante = {};

  datos.forEach(d => {
    const monto   = parseMonto(d[COL.MONTO_TOTAL]);
    const proyecto = (d[COL.PROYECTO] || 'Sin proyecto').trim();
    const nombre   = ((d[COL.NOMBRE] || '') + ' ' + (d[COL.APELLIDO] || '')).trim();
    const mes      = extraerMes(d[COL.FECHA]) || extraerMes(d[COL.SUBMISSION_TIME]);

    totalGastado += monto;

    if (nombre) participantes.add(nombre);

    if (!proyectos[proyecto]) {
      proyectos[proyecto] = { total: 0, count: 0, fases: new Set() };
    }
    proyectos[proyecto].total += monto;
    proyectos[proyecto].count += 1;
    if (d[COL.FASE]) proyectos[proyecto].fases.add(d[COL.FASE].trim());

    if (mes) {
      if (!gastoMensual[mes]) gastoMensual[mes] = 0;
      gastoMensual[mes] += monto;
    }

    if (nombre) {
      if (!porParticipante[nombre]) porParticipante[nombre] = { total: 0, count: 0 };
      porParticipante[nombre].total += monto;
      porParticipante[nombre].count += 1;
    }
  });

  const topParticipantes = Object.entries(porParticipante)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10);

  const gastoMensualOrdenado = Object.keys(gastoMensual)
    .map(m => parseInt(m, 10))
    .sort((a, b) => a - b)
    .map(m => ({ mes: m, nombre: MESES_ES[m], total: gastoMensual[m] }));

  return {
    totalGastado,
    totalRegistros:   datos.length,
    totalParticipantes: participantes.size,
    proyectosActivos: Object.keys(proyectos).length,
    porProyecto:      Object.entries(proyectos).sort((a, b) => b[1].total - a[1].total),
    gastoMensual:     gastoMensualOrdenado,
    topParticipantes,
  };
}

// ── Escritura en hoja ─────────────────────────────────────────

function _escribirTituloDashboard(hoja) {
  const rTitulo = hoja.getRange('B1:F1');
  rTitulo.merge();
  rTitulo.setValue('DASHBOARD — ESTIPENDIOS ' + AÑO_FILTRO);
  rTitulo.setBackground(COLORES.PRIMARIO);
  rTitulo.setFontColor('#FFFFFF');
  rTitulo.setFontSize(16);
  rTitulo.setFontWeight('bold');
  rTitulo.setHorizontalAlignment('center');
  rTitulo.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 50);
}

function _escribirKPIs(hoja, m) {
  hoja.setRowHeight(2, 15); // espaciado

  const kpis = [
    { label: 'TOTAL GASTADO',    valor: fmtQ(m.totalGastado),         col: 2 },
    { label: 'REGISTROS',        valor: m.totalRegistros,             col: 3 },
    { label: 'PARTICIPANTES',    valor: m.totalParticipantes,         col: 4 },
    { label: 'PROYECTOS ACTIVOS',valor: m.proyectosActivos,           col: 5 },
  ];

  hoja.setRowHeight(3, 28);
  hoja.setRowHeight(4, 45);
  hoja.setRowHeight(5, 15);

  kpis.forEach(kpi => {
    // Etiqueta
    const rLabel = hoja.getRange(3, kpi.col);
    rLabel.setValue(kpi.label);
    rLabel.setBackground(COLORES.SECUNDARIO);
    rLabel.setFontColor('#FFFFFF');
    rLabel.setFontWeight('bold');
    rLabel.setFontSize(9);
    rLabel.setHorizontalAlignment('center');

    // Valor
    const rValor = hoja.getRange(4, kpi.col);
    rValor.setValue(kpi.valor);
    rValor.setBackground(COLORES.FONDO_CARD);
    rValor.setFontSize(kpi.col === 2 ? 16 : 18);
    rValor.setFontWeight('bold');
    rValor.setFontColor(COLORES.PRIMARIO);
    rValor.setHorizontalAlignment('center');
    rValor.setVerticalAlignment('middle');
    rValor.setBorder(false, false, true, false, false, false,
      COLORES.ACENTO, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  });
}

function _escribirTablaProyectos(hoja, m) {
  let fila = 6;

  // Título sección
  const rTit = hoja.getRange(fila, 2, 1, 5);
  rTit.merge();
  rTit.setValue('GASTO POR PROYECTO');
  rTit.setBackground(COLORES.PRIMARIO);
  rTit.setFontColor('#FFFFFF');
  rTit.setFontWeight('bold');
  rTit.setHorizontalAlignment('center');
  hoja.setRowHeight(fila, 28);
  fila++;

  // Encabezados
  const encabezados = ['Proyecto', 'Registros', 'Fases', 'Total Gastado', '% del Total'];
  const rEnc = hoja.getRange(fila, 2, 1, 5);
  rEnc.setValues([encabezados]);
  rEnc.setBackground(COLORES.SECUNDARIO);
  rEnc.setFontColor('#FFFFFF');
  rEnc.setFontWeight('bold');
  hoja.setRowHeight(fila, 22);
  fila++;

  const totalGlobal = m.totalGastado || 1;

  m.porProyecto.forEach(([nombre, info], idx) => {
    const pct = ((info.total / totalGlobal) * 100).toFixed(1) + '%';
    const valores = [
      nombre,
      info.count,
      info.fases.size,
      fmtQ(info.total),
      pct,
    ];
    const rFila = hoja.getRange(fila, 2, 1, 5);
    rFila.setValues([valores]);
    rFila.setBackground(idx % 2 === 0 ? COLORES.FONDO_CARD : '#FFFFFF');
    hoja.setRowHeight(fila, 20);
    fila++;
  });

  // Fila total
  const rTotal = hoja.getRange(fila, 2, 1, 5);
  rTotal.setValues([['TOTAL', m.totalRegistros, '', fmtQ(m.totalGastado), '100%']]);
  rTotal.setBackground(COLORES.ACENTO);
  rTotal.setFontWeight('bold');
  rTotal.setFontColor('#FFFFFF');
  hoja.setRowHeight(fila, 22);
}

function _escribirGastoMensual(hoja, m) {
  if (m.gastoMensual.length === 0) return;

  const filaInicio = 6 + 3 + m.porProyecto.length + 2; // después de tabla proyectos + espacio

  const rTit = hoja.getRange(filaInicio, 2, 1, 5);
  rTit.merge();
  rTit.setValue('GASTO MENSUAL ' + AÑO_FILTRO);
  rTit.setBackground(COLORES.PRIMARIO);
  rTit.setFontColor('#FFFFFF');
  rTit.setFontWeight('bold');
  rTit.setHorizontalAlignment('center');
  hoja.setRowHeight(filaInicio, 28);

  const rEnc = hoja.getRange(filaInicio + 1, 2, 1, 3);
  rEnc.setValues([['Mes', 'Total Gastado', 'Barra']]);
  rEnc.setBackground(COLORES.SECUNDARIO);
  rEnc.setFontColor('#FFFFFF');
  rEnc.setFontWeight('bold');

  const maxMes = Math.max(...m.gastoMensual.map(g => g.total), 1);

  m.gastoMensual.forEach((g, idx) => {
    const f = filaInicio + 2 + idx;
    const barLen = Math.round((g.total / maxMes) * 20);
    const barra  = '█'.repeat(barLen);

    const rFila = hoja.getRange(f, 2, 1, 3);
    rFila.setValues([[g.nombre, fmtQ(g.total), barra]]);
    rFila.setBackground(idx % 2 === 0 ? COLORES.FONDO_CARD : '#FFFFFF');

    // Color de barra
    hoja.getRange(f, 4).setFontColor(COLORES.SECUNDARIO);
    hoja.setRowHeight(f, 20);
  });
}

function _escribirTopParticipantes(hoja, m) {
  if (m.topParticipantes.length === 0) return;

  const filaInicio = 6 + 3 + m.porProyecto.length + 2 + 2 + m.gastoMensual.length + 2;

  const rTit = hoja.getRange(filaInicio, 2, 1, 4);
  rTit.merge();
  rTit.setValue('TOP PARTICIPANTES POR MONTO RECIBIDO');
  rTit.setBackground(COLORES.PRIMARIO);
  rTit.setFontColor('#FFFFFF');
  rTit.setFontWeight('bold');
  rTit.setHorizontalAlignment('center');
  hoja.setRowHeight(filaInicio, 28);

  const rEnc = hoja.getRange(filaInicio + 1, 2, 1, 3);
  rEnc.setValues([['#', 'Participante', 'Total Recibido']]);
  rEnc.setBackground(COLORES.SECUNDARIO);
  rEnc.setFontColor('#FFFFFF');
  rEnc.setFontWeight('bold');

  m.topParticipantes.forEach(([nombre, info], idx) => {
    const f = filaInicio + 2 + idx;
    hoja.getRange(f, 2, 1, 3).setValues([[idx + 1, nombre, fmtQ(info.total)]]);
    hoja.getRange(f, 2, 1, 3).setBackground(idx % 2 === 0 ? COLORES.FONDO_CARD : '#FFFFFF');
    hoja.setRowHeight(f, 20);
  });
}

function _escribirUltimaActualizacion(hoja) {
  const ult = hoja.getRange(2, 6);
  ult.setValue('Actualizado: ' + Utilities.formatDate(new Date(), 'America/Guatemala', 'dd/MM/yyyy HH:mm'));
  ult.setFontColor('#888888');
  ult.setFontSize(8);
  ult.setHorizontalAlignment('right');
}

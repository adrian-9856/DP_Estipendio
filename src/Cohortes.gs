// ============================================================
// VISTA DE COHORTES (agrupado por Proyecto + Fase)
// ============================================================

function actualizarCohortes() {
  const hoja = obtenerOCrearHoja(HOJAS.COHORTES);
  hoja.clearContents();
  hoja.clearFormats();

  const datos = _leerDatos();

  if (datos.length === 0) {
    hoja.getRange('B2').setValue('Sin datos importados aún.');
    return;
  }

  const cohortes = _agruparPorCohorte(datos);
  _escribirVistaCohortes(hoja, cohortes);

  hoja.setColumnWidth(1, 20);
  hoja.setColumnWidth(2, 200);
  hoja.setColumnWidth(3, 180);
  hoja.setColumnWidth(4, 120);
  hoja.setColumnWidth(5, 130);
  hoja.setColumnWidth(6, 130);
  hoja.setColumnWidth(7, 130);
  hoja.setColumnWidth(8, 150);
  hoja.setColumnWidth(9, 20);
}

function _agruparPorCohorte(datos) {
  const cohortes = {};

  datos.forEach(d => {
    const proyecto = (d[COL.PROYECTO] || 'Sin proyecto').trim();
    const fase     = (d[COL.FASE]     || 'Sin fase').trim();
    const clave    = proyecto + '||' + fase;

    if (!cohortes[clave]) {
      cohortes[clave] = {
        proyecto,
        fase,
        participantes: [],
        totalMonto: 0,
        totalHoras: 0,
        registros: 0,
      };
    }

    const c      = cohortes[clave];
    const nombre = ((d[COL.NOMBRE] || '') + ' ' + (d[COL.APELLIDO] || '')).trim();
    const monto  = parseMonto(d[COL.MONTO_TOTAL]);
    const horas  = parseFloat(d[COL.TOTAL_HORAS]) || 0;

    c.totalMonto += monto;
    c.totalHoras += horas;
    c.registros  += 1;

    c.participantes.push({
      creamos_id:  d[COL.CREAMOS_ID]  || '',
      nombre,
      fecha:       d[COL.FECHA]       || '',
      especialidad: d[COL.ESPECIALIDAD] || '',
      incentivo:   d[COL.INCENTIVO]   || '',
      horas,
      monto,
      motivo_descuento: d[COL.MOTIVO_DESCUENTO] || '',
      comentarios: d[COL.COMENTARIOS] || '',
    });
  });

  return Object.values(cohortes).sort((a, b) => {
    if (a.proyecto !== b.proyecto) return a.proyecto.localeCompare(b.proyecto);
    return a.fase.localeCompare(b.fase);
  });
}

function _escribirVistaCohortes(hoja, cohortes) {
  // Título principal
  const rTitulo = hoja.getRange('B1:H1');
  rTitulo.merge();
  rTitulo.setValue('COHORTES — ESTIPENDIOS ' + AÑO_FILTRO);
  rTitulo.setBackground(COLORES.PRIMARIO);
  rTitulo.setFontColor('#FFFFFF');
  rTitulo.setFontSize(15);
  rTitulo.setFontWeight('bold');
  rTitulo.setHorizontalAlignment('center');
  rTitulo.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 48);

  let fila = 3;

  cohortes.forEach((coh, idx) => {
    // Encabezado de cohorte
    fila = _escribirEncabezadoCohorte(hoja, fila, coh, idx);

    // Encabezados de participantes
    fila = _escribirEncabezadosParticipantes(hoja, fila);

    // Filas de participantes
    coh.participantes.forEach((p, pIdx) => {
      fila = _escribirFilaParticipante(hoja, fila, p, pIdx);
    });

    // Fila de subtotal
    fila = _escribirSubtotalCohorte(hoja, fila, coh);

    fila += 2; // espacio entre cohortes
  });
}

function _escribirEncabezadoCohorte(hoja, fila, coh, idx) {
  const colorFondo = idx % 2 === 0 ? COLORES.PRIMARIO : COLORES.SECUNDARIO;

  const rProyecto = hoja.getRange(fila, 2, 1, 4);
  rProyecto.merge();
  rProyecto.setValue('PROYECTO: ' + coh.proyecto.toUpperCase());
  rProyecto.setBackground(colorFondo);
  rProyecto.setFontColor('#FFFFFF');
  rProyecto.setFontWeight('bold');
  rProyecto.setFontSize(11);
  hoja.setRowHeight(fila, 26);
  fila++;

  const rFase = hoja.getRange(fila, 2, 1, 4);
  rFase.merge();
  rFase.setValue('Fase: ' + coh.fase + '   |   ' +
    coh.registros + ' registros   |   ' +
    fmtQ(coh.totalMonto) + '   |   ' +
    coh.totalHoras.toFixed(1) + ' horas');
  rFase.setBackground(COLORES.ACENTO);
  rFase.setFontColor('#FFFFFF');
  rFase.setFontWeight('bold');
  hoja.setRowHeight(fila, 22);
  fila++;

  return fila;
}

function _escribirEncabezadosParticipantes(hoja, fila) {
  const cols = [
    'Creamos ID', 'Participante', 'Fecha', 'Especialidad',
    'Incentivo', 'Horas', 'Monto', 'Observaciones',
  ];
  const r = hoja.getRange(fila, 2, 1, cols.length);
  r.setValues([cols]);
  r.setBackground('#E8E0F7');
  r.setFontWeight('bold');
  r.setFontSize(9);
  r.setBorder(true, true, true, true, true, true,
    COLORES.PRIMARIO, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  hoja.setRowHeight(fila, 20);
  return fila + 1;
}

function _escribirFilaParticipante(hoja, fila, p, pIdx) {
  const valores = [
    p.creamos_id,
    p.nombre,
    p.fecha,
    p.especialidad,
    p.incentivo,
    p.horas || '',
    fmtQ(p.monto),
    p.motivo_descuento || p.comentarios,
  ];
  const r = hoja.getRange(fila, 2, 1, valores.length);
  r.setValues([valores]);
  r.setBackground(pIdx % 2 === 0 ? '#F8F4FF' : '#FFFFFF');
  r.setFontSize(9);
  hoja.setRowHeight(fila, 18);
  return fila + 1;
}

function _escribirSubtotalCohorte(hoja, fila, coh) {
  const r = hoja.getRange(fila, 2, 1, 8);
  r.setValues([[
    '', 'SUBTOTAL',
    '', '',
    '',
    coh.totalHoras.toFixed(1),
    fmtQ(coh.totalMonto),
    coh.registros + ' registros',
  ]]);
  r.setBackground(COLORES.FONDO_CARD);
  r.setFontWeight('bold');
  r.setFontColor(COLORES.PRIMARIO);
  r.setFontSize(9);
  hoja.setRowHeight(fila, 20);
  return fila + 1;
}

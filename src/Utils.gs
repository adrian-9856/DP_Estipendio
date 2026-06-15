// ============================================================
// UTILIDADES
// ============================================================

/**
 * Parsea un CSV completo manejando campos entre comillas y comas internas.
 * Devuelve array de objetos {columna: valor}.
 */
function parseCSV(csvText) {
  const lines = splitCSVLines(csvText);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = (values[idx] !== undefined) ? values[idx].trim() : '';
    });
    rows.push(obj);
  }
  return rows;
}

function splitCSVLines(text) {
  const lines = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      current += ch;
    } else if (ch === '\n' && !inQuotes) {
      lines.push(current);
      current = '';
    } else if (ch === '\r' && !inQuotes) {
      // skip \r
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push(current);
  return lines;
}

function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

/** Obtiene o crea una hoja por nombre. */
function obtenerOCrearHoja(nombre) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = ss.getSheetByName(nombre);
  if (!hoja) {
    hoja = ss.insertSheet(nombre);
  }
  return hoja;
}

/** Limpia una hoja y escribe encabezados con formato. */
function escribirEncabezados(hoja, headers, colorFondo, colorTexto) {
  hoja.clearContents();
  hoja.clearFormats();

  const rango = hoja.getRange(1, 1, 1, headers.length);
  rango.setValues([headers]);
  rango.setBackground(colorFondo || COLORES.PRIMARIO);
  rango.setFontColor(colorTexto || COLORES.TEXTO_CLARO);
  rango.setFontWeight('bold');
  rango.setFontSize(10);
  hoja.setFrozenRows(1);
}

/** Formatea un número como quetzales: Q 1,234.56 */
function fmtQ(numero) {
  if (numero === null || numero === undefined || isNaN(numero)) return 'Q 0.00';
  return 'Q ' + Number(numero).toLocaleString('es-GT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Convierte un string de monto a número (limpia Q, comas, espacios). */
function parseMonto(valor) {
  if (!valor) return 0;
  const limpio = String(valor).replace(/[Q,\s]/g, '').trim();
  const num = parseFloat(limpio);
  return isNaN(num) ? 0 : num;
}

/** Extrae el año de un string de fecha ISO o DD/MM/YYYY. */
function extraerAño(valor) {
  if (!valor) return null;
  const s = String(valor).trim();
  // ISO: 2026-03-15T...
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return parseInt(s.substring(0, 4), 10);
  // DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}/.test(s)) return parseInt(s.substring(6, 10), 10);
  // YYYY/MM/DD
  if (/^\d{4}\/\d{2}\/\d{2}/.test(s)) return parseInt(s.substring(0, 4), 10);
  return null;
}

/** Extrae el mes (1-12) de un string de fecha. */
function extraerMes(valor) {
  if (!valor) return null;
  const s = String(valor).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return parseInt(s.substring(5, 7), 10);
  if (/^\d{2}\/\d{2}\/\d{4}/.test(s)) return parseInt(s.substring(3, 5), 10);
  return null;
}

const MESES_ES = [
  '', 'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

/** Escribe una entrada en la hoja LOG. */
function escribirLog(mensaje, tipo, detalles) {
  const hoja = obtenerOCrearHoja(HOJAS.LOG);

  if (hoja.getLastRow() === 0) {
    escribirEncabezados(hoja,
      ['Fecha y Hora', 'Tipo', 'Mensaje', 'Detalles'],
      COLORES.PRIMARIO
    );
  }

  const fila = [
    new Date(),
    tipo || 'INFO',
    mensaje,
    detalles || '',
  ];
  hoja.appendRow(fila);

  // Color por tipo
  const ultima = hoja.getLastRow();
  const color = tipo === 'ERROR' ? '#FDECEA' : tipo === 'OK' ? '#E8F5E9' : '#FFFFFF';
  hoja.getRange(ultima, 1, 1, 4).setBackground(color);
}

/** Aplica formato de bordes y alineación a un rango de datos. */
function aplicarFormatoDatos(rango) {
  rango.setBorder(true, true, true, true, true, true, '#CCCCCC', SpreadsheetApp.BorderStyle.SOLID);
  rango.setVerticalAlignment('middle');
}

/** Ajusta ancho de columnas automáticamente (con límite máximo). */
function ajustarColumnas(hoja, desde, hasta, maximo) {
  for (let c = desde; c <= hasta; c++) {
    hoja.autoResizeColumn(c);
    if (maximo && hoja.getColumnWidth(c) > maximo) {
      hoja.setColumnWidth(c, maximo);
    }
  }
}

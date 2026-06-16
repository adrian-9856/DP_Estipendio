// ============================================================
// CONFIGURACIÓN GLOBAL - DP Estipendios 2026
// ============================================================

const KOBO_URL =
  'https://kf.kobotoolbox.org/api/v2/assets/aNpJWVRoxxQ5a8pwBQVJac' +
  '/export-settings/esqLSo9A8oFvxVwZKUXwADx/data.csv';

// Fuentes externas de cohortes — agrega aquí cada Google Sheet de proyecto
const FUENTES_COHORTES = [
  {
    id:       '1Ay1z3HdFHTzSjq7891sQVuEpIXBA8g9XGibjI-wFklc',
    proyecto: 'Alimentos y Bebidas',
    hoja:     'Cohortes',
  },
  {
    id:       '1En60zjrwPTrSMFrLUWr2KgXmH7y3vcopfpQgy6lY3HU',
    proyecto: 'Tech',
    hoja:     'Cohortes',
  },
];

// Columnas del sheet externo de cohortes
const COL_COHORTE = {
  NOMBRE:        'Nombre Cohorte',
  PROYECTO:      'Proyecto',
  ANIO:          'Año',
  FECHA_INICIO:  'Fecha Inicio',
  FECHA_FIN:     'Fecha Fin',
  RESPONSABLE:   'Responsable',
  CUPO:          'Cupo Máximo',
  PRE_INSCRITOS: 'Pre-Inscritxs',
  GRADUADOS:     'Graduadx',
  RETIRADOS:     'Retiradx',
  UBICACION:     'Ubicación',
  HORARIO:       'Horario',
  NOTAS:         'Notas',
  ESTADO:        'Estado',
  PRESUP_CURSO:  'Presupuesto Curso (Q)',
  PRESUP_PRACT:  'Presupuesto Prácticas (Q)',
  PRESUP_TOTAL:  'Presupuesto Total (Q)',
  GASTADO:       'Gastado (Q)',
  DISPONIBLE:    'Disponible (Q)',
  PCT_EJECUCION: '% Ejecución',
};

const HOJAS = {
  DATOS:         'DATOS',
  DASHBOARD:     'DASHBOARD',
  COHORTES:      'COHORTES',
  COHORTES_REF:  'COHORTES_REF',
  PRESUPUESTO:   'PRESUPUESTO',
  LOG:           'LOG',
};

// Nombres de columnas en el CSV exportado del formulario v11
// Cada proyecto tiene su propio grupo de campos
const COL_RAW = {
  // Campos comunes
  PROYECTO:         'Proyecto',
  FECHA:            'Fecha',
  KOBO_ID:          '_id',
  UUID:             '_uuid',
  SUBMISSION_TIME:  '_submission_time',
  VALIDATION:       '_validation_status',
  STATUS:           '_status',
  SUBMITTED_BY:     '_submitted_by',
  INDEX:            '_index',

  // Grupo Alimentos y Bebidas
  AB_COHORTE:       'group_ab/Cohorte_AB',
  AB_PARTICIPANTE:  'group_ab/Participante_AB',
  AB_CREAMOS_ID:    'group_ab/Creamos_ID_AB',
  AB_MONTO_BASE:    'group_ab/Monto_base_ab',
  AB_DESCUENTO:     'group_ab/Descuento_ab',
  AB_MONTO_TOTAL:   'group_ab/Monto_total_ab',
  AB_MOTIVO:        'group_ab/Motivo_de_descuento_ab',
  AB_INCENTIVO:     'group_ab/Incentivo_ab',
  AB_FIRMA:         'group_ab/Firma_ab',

  // Grupo Tecnología
  TECH_COHORTE:     'group_tech/Cohorte_Tech',
  TECH_PARTICIPANTE:'group_tech/Participante_Tech',
  TECH_CREAMOS_ID:  'group_tech/Creamos_ID_Tech',
  TECH_MONTO_BASE:  'group_tech/Monto_base_tech',
  TECH_DESCUENTO:   'group_tech/Descuento_tech',
  TECH_MONTO_TOTAL: 'group_tech/Monto_total_tech',
  TECH_MOTIVO:      'group_tech/Motivo_de_descuento_tech',
  TECH_INCENTIVO:   'group_tech/Incentivo_tech',
  TECH_FIRMA:       'group_tech/Firma_tech',

};

// Columnas NORMALIZADAS en la hoja DATOS (esquema unificado sin importar el proyecto)
const COL = {
  CREAMOS_ID:       'creamos_id',
  NOMBRE:           'nombre',
  APELLIDO:         'apellido',
  FECHA:            'fecha',
  PROYECTO:         'proyecto',
  FASE:             'fase',
  MONTO_BASE:       'monto_base',
  DESCUENTO:        'descuento',
  MONTO_TOTAL:      'monto_total',
  MOTIVO_DESCUENTO: 'motivo_descuento',
  INCENTIVO:        'incentivo',
  COMENTARIOS:      'comentarios',
  FIRMA:            'firma',
  KOBO_ID:          'kobo_id',
  UUID:             'uuid',
  SUBMISSION_TIME:  'submission_time',
  VALIDATION:       'validation_status',
  STATUS:           'status',
  SUBMITTED_BY:     'submitted_by',
  INDEX:            'kobo_index',
};

// Encabezados amigables para la hoja DATOS (mismo orden que HEADERS_DATOS)
const HEADERS_DISPLAY = [
  'Creamos ID', 'Nombre', 'Apellido', 'Fecha',
  'Proyecto', 'Fase / Cohorte',
  'Monto Base (Q)', 'Descuento (Q)', 'Monto Total (Q)',
  'Motivo de Descuento', 'Incentivo', 'Comentarios', 'Firma',
  '_id', '_uuid', '_submission_time',
  '_validation_status', '_status', '_submitted_by', '_index',
];

// Claves internas (mismo orden que HEADERS_DISPLAY)
const HEADERS_DATOS = [
  COL.CREAMOS_ID, COL.NOMBRE, COL.APELLIDO, COL.FECHA,
  COL.PROYECTO,   COL.FASE,
  COL.MONTO_BASE, COL.DESCUENTO, COL.MONTO_TOTAL,
  COL.MOTIVO_DESCUENTO, COL.INCENTIVO, COL.COMENTARIOS, COL.FIRMA,
  COL.KOBO_ID, COL.UUID, COL.SUBMISSION_TIME,
  COL.VALIDATION, COL.STATUS, COL.SUBMITTED_BY, COL.INDEX,
];

// Colores de marca
const COLORES = {
  PRIMARIO:    '#4A1C96',
  SECUNDARIO:  '#7B2FBE',
  ACENTO:      '#F0A500',
  FONDO_CARD:  '#F8F4FF',
  VERDE:       '#1E8449',
  ROJO:        '#C0392B',
  GRIS_CLARO:  '#F2F2F2',
  TEXTO_CLARO: '#FFFFFF',
};

const AÑO_FILTRO = 2026;
// ============================================================
// UTILIDADES
// ============================================================

/**
 * Parsea un CSV completo. Detecta automáticamente si el separador es , o ;
 * Devuelve array de objetos {columna: valor}.
 */
function parseCSV(csvText) {
  const lines = splitCSVLines(csvText);
  if (lines.length < 2) return [];

  // Detectar delimitador: cuenta cuántas , y ; hay en la primera línea
  const primeraLinea = lines[0];
  const nComas = (primeraLinea.match(/,/g) || []).length;
  const nPuntoComa = (primeraLinea.match(/;/g) || []).length;
  const delimitador = nPuntoComa > nComas ? ';' : ',';

  const headers = parseCSVLine(lines[0], delimitador);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseCSVLine(line, delimitador);
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

function parseCSVLine(line, sep) {
  const delim = sep || ',';
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
    } else if (ch === delim && !inQuotes) {
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

// Diccionario de correcciones para valores con codificación de acentos
const CORRECCIONES_TEXTO = {
  'pr cticas':         'Prácticas',
  'practicas':         'Prácticas',
  'pr_cticas':         'Prácticas',
  'tecnolog a':        'Tecnología',
  'tecnologia':        'Tecnología',
  'tecnolog_a':        'Tecnología',
  'tramites':          'Trámites',
  'tr mites':          'Trámites',
  'panader a':         'Panadería',
  'panaderia':         'Panadería',
  'telef nica':        'Telefónica',
  'construcci n':      'Construcción',
  'construccion':      'Construcción',
  'administraci n':    'Administración',
  'administracion':    'Administración',
  'comunicaci n':      'Comunicación',
  'comunicacion':      'Comunicación',
  'producci n':        'Producción',
  'produccion':        'Producción',
  'informaci n':       'Información',
  'informacion':       'Información',
};

/**
 * Normaliza un texto de KoboToolbox:
 * reemplaza guiones bajos con espacios, aplica Title Case
 * y corrige acentos usando el diccionario.
 */
function normalizarTexto(valor) {
  if (!valor) return '';
  // Reemplazar guiones bajos por espacios
  let s = String(valor).replace(/_/g, ' ').trim();
  // Title Case
  s = s.replace(/\b\w/g, c => c.toUpperCase());
  // Revisar diccionario (en minúsculas)
  const clave = s.toLowerCase();
  if (CORRECCIONES_TEXTO[clave]) return CORRECCIONES_TEXTO[clave];
  // Revisar parciales: si alguna clave del diccionario es igual al texto sin acentos
  for (const [k, v] of Object.entries(CORRECCIONES_TEXTO)) {
    if (clave === k) return v;
  }
  return s;
}

/**
 * Convierte una fecha ISO (2026-04-17T16:00:00.000-06:00) a DD/MM/YYYY.
 * Si ya tiene otro formato limpio, la devuelve tal cual.
 */
function normalizarFecha(valor) {
  if (!valor) return '';
  const s = String(valor).trim();
  // ISO con T: 2026-04-17T16:00:00...
  const matchISO = s.match(/^(\d{4})-(\d{2})-(\d{2})T/);
  if (matchISO) {
    return matchISO[3] + '/' + matchISO[2] + '/' + matchISO[1];
  }
  // ISO sin T: 2026-04-17
  const matchDate = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (matchDate) {
    return matchDate[3] + '/' + matchDate[2] + '/' + matchDate[1];
  }
  // Ya está en DD/MM/YYYY → dejar igual
  return s;
}

/**
 * Normaliza un registro crudo del CSV de KoboToolbox v11
 * y devuelve un objeto con el esquema unificado de HEADERS_DATOS.
 * Detecta automáticamente qué proyecto fue seleccionado y extrae
 * los campos del grupo correspondiente.
 */
function normalizarRegistroKobo(raw) {
  const proy = String(raw[COL_RAW.PROYECTO] || '').toLowerCase();

  let creamos_id = '', nombre = '', apellido = '', fase = '';
  let monto_base = '', descuento = '0', monto_total = '';
  let motivo = '', incentivo = '', comentarios = '', firma = '';

  if (proy.includes('alimentos') || proy === 'alimentos_y_bebidas') {
    // ── Alimentos y Bebidas ──
    creamos_id  = raw[COL_RAW.AB_CREAMOS_ID]    || '';
    const part  = String(raw[COL_RAW.AB_PARTICIPANTE] || '');
    // El campo Participante_AB puede venir como "Apellido Nombre (ID)" — usar completo como nombre
    nombre      = part;
    apellido    = '';
    fase        = normalizarTexto(raw[COL_RAW.AB_COHORTE]   || '');
    monto_base  = raw[COL_RAW.AB_MONTO_BASE]    || '';
    descuento   = raw[COL_RAW.AB_DESCUENTO]     || '0';
    monto_total = raw[COL_RAW.AB_MONTO_TOTAL]   || monto_base;
    motivo      = normalizarTexto(raw[COL_RAW.AB_MOTIVO]    || '');
    incentivo   = normalizarTexto(raw[COL_RAW.AB_INCENTIVO] || '');
    firma       = raw[COL_RAW.AB_FIRMA]         || '';

  } else if (proy.includes('tech') || proy.includes('tecnolog')) {
    // ── Tecnología ──
    creamos_id  = raw[COL_RAW.TECH_CREAMOS_ID]    || '';
    nombre      = String(raw[COL_RAW.TECH_PARTICIPANTE] || '');
    apellido    = '';
    fase        = normalizarTexto(raw[COL_RAW.TECH_COHORTE]   || '');
    monto_base  = raw[COL_RAW.TECH_MONTO_BASE]    || '';
    descuento   = raw[COL_RAW.TECH_DESCUENTO]     || '0';
    monto_total = raw[COL_RAW.TECH_MONTO_TOTAL]   || monto_base;
    motivo      = normalizarTexto(raw[COL_RAW.TECH_MOTIVO]    || '');
    incentivo   = normalizarTexto(raw[COL_RAW.TECH_INCENTIVO] || '');
    firma       = raw[COL_RAW.TECH_FIRMA]         || '';

  } else {
    // Proyecto no reconocido — registrar en LOG pero no descartar
    nombre  = raw[COL_RAW.AB_PARTICIPANTE] || raw[COL_RAW.TECH_PARTICIPANTE] || '';
    fase    = '';
  }

  return {
    [COL.CREAMOS_ID]:       creamos_id,
    [COL.NOMBRE]:           nombre,
    [COL.APELLIDO]:         apellido,
    [COL.FECHA]:            normalizarFecha(raw[COL_RAW.FECHA] || ''),
    [COL.PROYECTO]:         normalizarTexto(raw[COL_RAW.PROYECTO] || ''),
    [COL.FASE]:             fase,
    [COL.MONTO_BASE]:       monto_base,
    [COL.DESCUENTO]:        descuento,
    [COL.MONTO_TOTAL]:      monto_total,
    [COL.MOTIVO_DESCUENTO]: motivo,
    [COL.INCENTIVO]:        incentivo,
    [COL.COMENTARIOS]:      comentarios,
    [COL.FIRMA]:            firma,
    [COL.KOBO_ID]:          raw[COL_RAW.KOBO_ID]          || '',
    [COL.UUID]:             raw[COL_RAW.UUID]             || '',
    [COL.SUBMISSION_TIME]:  raw[COL_RAW.SUBMISSION_TIME]  || '',
    [COL.VALIDATION]:       raw[COL_RAW.VALIDATION]       || '',
    [COL.STATUS]:           raw[COL_RAW.STATUS]           || '',
    [COL.SUBMITTED_BY]:     raw[COL_RAW.SUBMITTED_BY]     || '',
    [COL.INDEX]:            raw[COL_RAW.INDEX]            || '',
  };
}

/** Convierte un string de monto a número (limpia Q, comas, espacios). */
function parseMonto(valor) {
  if (!valor) return 0;
  const limpio = String(valor).replace(/[Q,\s]/g, '').trim();
  const num = parseFloat(limpio);
  return isNaN(num) ? 0 : num;
}

// Mapa de meses en español (abreviados y completos) a número
const MESES_NUM = {
  'ene': 1, 'enero': 1, 'jan': 1,
  'feb': 2, 'febrero': 2,
  'mar': 3, 'marzo': 3,
  'abr': 4, 'abril': 4, 'apr': 4,
  'may': 5, 'mayo': 5,
  'jun': 6, 'junio': 6,
  'jul': 7, 'julio': 7,
  'ago': 8, 'agosto': 8, 'aug': 8,
  'sep': 9, 'sept': 9, 'septiembre': 9,
  'oct': 10, 'octubre': 10,
  'nov': 11, 'noviembre': 11,
  'dic': 12, 'diciembre': 12, 'dec': 12,
};

/** Extrae el año de un string de fecha en cualquier formato. */
function extraerAño(valor) {
  if (!valor) return null;
  if (valor instanceof Date) return valor.getFullYear();
  const s = String(valor).trim();
  if (!s) return null;
  // ISO: 2026-03-15 o 2026-03-15T10:30:00
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return parseInt(s.substring(0, 4), 10);
  // DD/MM/YYYY o D/M/YYYY
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(s)) {
    return parseInt(s.split('/')[2], 10);
  }
  // Español KoboToolbox: "2 de jun. de 2026 9:01"
  const matchEs = s.match(/\bde\s+(\d{4})\b/i);
  if (matchEs) return parseInt(matchEs[1], 10);
  // Fallback general: cualquier 20XX en el string
  const match = s.match(/(20\d{2})/);
  if (match) return parseInt(match[1], 10);
  return null;
}

/** Extrae el mes (1-12) de un string de fecha. */
function extraerMes(valor) {
  if (!valor) return null;
  if (valor instanceof Date) return valor.getMonth() + 1;
  const s = String(valor).trim();
  // ISO: 2026-06-02
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return parseInt(s.substring(5, 7), 10);
  // DD/MM/YYYY
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(s)) return parseInt(s.split('/')[1], 10);
  // Español KoboToolbox: "2 de jun. de 2026" → busca nombre de mes
  const matchEs = s.match(/\b(\w+?)\.?\s+de\s+\d{4}/i);
  if (matchEs) {
    const mesNombre = matchEs[1].toLowerCase();
    if (MESES_NUM[mesNombre]) return MESES_NUM[mesNombre];
  }
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
// ============================================================
// MENÚ PRINCIPAL Y TRIGGERS
// ============================================================

/**
 * Se ejecuta automáticamente al abrir el spreadsheet.
 * IMPORTANTE: No correr desde el editor con el botón Run — solo funciona
 * al abrir el Google Sheets directamente.
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('DP Estipendios')
      .addItem('⬇️ Importar datos nuevos de KoboToolbox', 'importarDesdeKobo')
      .addItem('🔄 Reimportar TODO (borra y recarga)', 'reimportarTodo')
      .addSeparator()
      .addItem('🏫 Importar Cohortes desde proyectos', 'importarCohortes')
      .addSeparator()
      .addItem('📊 Actualizar Dashboard', 'actualizarDashboard')
      .addItem('👥 Actualizar vista de Cohortes', 'actualizarCohortes')
      .addItem('💰 Actualizar Presupuesto', 'actualizarResumenPresupuesto')
      .addSeparator()
      .addItem('⚙️ Configurar estructura inicial', 'configurarEstructuraInicial')
      .addItem('⏰ Activar importación automática diaria', 'activarTriggerDiario')
      .addItem('🚫 Desactivar importación automática', 'desactivarTriggerDiario')
      .addSeparator()
      .addItem('🗑️ REINSTALAR TODO DESDE CERO', 'reinstalarTodo')
      .addToUi();
  } catch (e) {
    // Silencioso — ocurre al ejecutar desde el editor, no desde el spreadsheet
  }
}

/**
 * Reinstala el sistema completo desde cero.
 * Borra todas las hojas del sistema, las recrea con estructura limpia,
 * reactiva el trigger diario y muestra los pasos a seguir.
 */
function reinstalarTodo() {
  const ui = SpreadsheetApp.getUi();

  const confirm1 = ui.alert(
    '⚠️ REINSTALAR TODO',
    'Esto BORRARÁ todas las hojas del sistema (DATOS, DASHBOARD, COHORTES, ' +
    'COHORTES_REF, PRESUPUESTO, LOG) y las recreará vacías.\n\n' +
    '¿Deseas continuar?',
    ui.ButtonSet.YES_NO
  );
  if (confirm1 !== ui.Button.YES) return;

  const confirm2 = ui.alert(
    '⚠️ Confirmación final',
    'Se perderán TODOS los datos importados. ¿Estás seguro?',
    ui.ButtonSet.YES_NO
  );
  if (confirm2 !== ui.Button.YES) return;

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Borrar hojas del sistema
    const hojasABorrar = Object.values(HOJAS);
    hojasABorrar.forEach(nombre => {
      const h = ss.getSheetByName(nombre);
      if (h) {
        // No se puede borrar la última hoja — primero crea una temporal si hace falta
        if (ss.getSheets().length === 1) {
          ss.insertSheet('_temp_');
        }
        ss.deleteSheet(h);
      }
    });

    // 2. Borrar hoja temporal si existe
    const temp = ss.getSheetByName('_temp_');
    if (temp && ss.getSheets().length > 1) ss.deleteSheet(temp);

    // 3. Crear todas las hojas en orden correcto
    const ordenHojas = [
      HOJAS.DASHBOARD, HOJAS.COHORTES, HOJAS.COHORTES_REF,
      HOJAS.PRESUPUESTO, HOJAS.DATOS, HOJAS.LOG,
    ];
    ordenHojas.reverse().forEach(nombre => {
      const h = ss.insertSheet(nombre, 0);
      Utilities.sleep(100);
    });

    // 4. Inicializar estructura de cada hoja

    // DATOS
    const hojaDatos = ss.getSheetByName(HOJAS.DATOS);
    escribirEncabezados(hojaDatos, HEADERS_DISPLAY, COLORES.PRIMARIO);
    hojaDatos.setFrozenRows(1);

    // LOG
    const hojaLog = ss.getSheetByName(HOJAS.LOG);
    escribirEncabezados(hojaLog, ['Fecha y Hora', 'Tipo', 'Mensaje', 'Detalles'], COLORES.PRIMARIO);

    // PRESUPUESTO (estructura inicial)
    inicializarHojaPresupuesto();

    // DASHBOARD placeholder
    const hojaDash = ss.getSheetByName(HOJAS.DASHBOARD);
    const rTit = hojaDash.getRange('B2:F2');
    rTit.merge();
    rTit.setValue('DASHBOARD — Ejecuta "Importar datos" para ver métricas');
    rTit.setBackground(COLORES.PRIMARIO);
    rTit.setFontColor('#FFFFFF');
    rTit.setFontSize(12);
    rTit.setHorizontalAlignment('center');

    // COHORTES placeholder
    const hojaCoh = ss.getSheetByName(HOJAS.COHORTES);
    hojaCoh.getRange('B2').setValue('Sin datos — importa desde KoboToolbox primero.');

    // COHORTES_REF placeholder
    const hojaRef = ss.getSheetByName(HOJAS.COHORTES_REF);
    hojaRef.getRange('B2').setValue('Sin cohortes — ejecuta "Importar Cohortes desde proyectos".');

    // 5. Desactivar triggers viejos y activar uno nuevo
    desactivarTriggerDiario();
    ScriptApp.newTrigger('importarDesdeKobo')
      .timeBased()
      .everyDays(1)
      .atHour(6)
      .create();

    escribirLog('Sistema reinstalado correctamente.', 'OK');

    // 6. Instrucciones finales
    ui.alert(
      '✅ Reinstalación completada',
      'El sistema quedó limpio y listo.\n\n' +
      'Pasos a seguir:\n' +
      '1️⃣  Menú → 🏫 Importar Cohortes desde proyectos\n' +
      '2️⃣  Actualiza el KOBO_URL si cambió el formulario\n' +
      '3️⃣  Menú → ⬇️ Importar datos nuevos de KoboToolbox\n' +
      '4️⃣  Agrega presupuestos en la hoja PRESUPUESTO\n\n' +
      'La importación automática diaria quedó activada (6:00 AM).',
      ui.ButtonSet.OK
    );

  } catch (e) {
    ui.alert('Error en reinstalación', e.message, ui.ButtonSet.OK);
  }
}

/**
 * Función para ejecutar desde el editor (botón Run).
 * Actualiza las vistas sin hacer llamadas externas.
 */
function actualizarVistas() {
  actualizarDashboard();
  actualizarCohortes();
  actualizarResumenPresupuesto();
  escribirLog('Vistas actualizadas manualmente.', 'OK');
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

/**
 * Borra todos los datos de la hoja DATOS y reimporta todo desde KoboToolbox.
 * Usar cuando los datos están desincronizados o para forzar una carga limpia.
 */
function reimportarTodo() {
  const ui = SpreadsheetApp.getUi();
  const respuesta = ui.alert(
    '¿Confirmar reimportación?',
    'Esto borrará TODOS los datos actuales de la hoja DATOS y los volverá a importar desde KoboToolbox.\n\n¿Deseas continuar?',
    ui.ButtonSet.YES_NO
  );
  if (respuesta !== ui.Button.YES) return;

  try {
    // Limpiar hoja DATOS
    const hojaDatos = obtenerOCrearHoja(HOJAS.DATOS);
    hojaDatos.clearContents();
    hojaDatos.clearFormats();
    escribirEncabezados(hojaDatos, HEADERS_DATOS, COLORES.PRIMARIO);
    escribirLog('Reimportación: hoja DATOS limpiada.', 'INFO');

    // Reimportar
    importarDesdeKobo();

  } catch (e) {
    escribirLog('Error en reimportación: ' + e.message, 'ERROR');
    ui.alert('Error', e.message, ui.ButtonSet.OK);
  }
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

    // 3. Diagnóstico: muestra columnas reales del CSV y valores de la primera fila
    if (filas.length > 0) {
      const colsReales = Object.keys(filas[0]);
      escribirLog('Columnas del CSV (' + colsReales.length + '): ' + colsReales.join(' | '), 'INFO');
      const uuidReal = filas[0][COL.UUID]          || '(col _uuid no encontrada)';
      const idReal   = filas[0][COL.KOBO_ID]       || '(col _id no encontrada)';
      const fechaReal = filas[0][COL.FECHA]         || '(col Fecha no encontrada)';
      const subReal  = filas[0][COL.SUBMISSION_TIME]|| '(col _submission_time no encontrada)';
      escribirLog('Primera fila — _uuid: "' + uuidReal + '" | _id: "' + idReal +
        '" | Fecha: "' + fechaReal + '" | sub_time: "' + subReal + '"', 'INFO');
    }

    // 4. Filtrar solo AÑO_FILTRO — busca el año como texto en cualquier campo de fecha
    const añoStr = String(AÑO_FILTRO);
    const filasFiltradas = filas.filter(f => {
      const fecha   = String(f[COL.FECHA]           || '');
      const subTime = String(f[COL.SUBMISSION_TIME] || '');
      // Busca "2026" como substring — funciona con cualquier formato de fecha
      if (fecha.includes(añoStr) || subTime.includes(añoStr)) return true;
      // Fallback: busca en todos los campos de la fila
      return Object.values(f).some(v => String(v || '').includes(añoStr));
    });
    escribirLog('Registros del año ' + AÑO_FILTRO + ': ' + filasFiltradas.length, 'INFO');

    if (filasFiltradas.length === 0) {
      // Muestra muestra de fechas para diagnóstico
      const muestras = filas.slice(0, 3).map(f =>
        'Fecha="' + (f[COL.FECHA] || '') + '" sub_time="' + (f[COL.SUBMISSION_TIME] || '') + '"'
      ).join(' | ');
      escribirLog('Sin registros 2026. Muestra de fechas: ' + muestras, 'ERROR');
      ui.alert('Sin datos del año ' + AÑO_FILTRO,
        'No se encontraron registros del año ' + AÑO_FILTRO + '.\n\n' +
        'Revisa la hoja LOG para ver el formato de fechas que llegó de KoboToolbox.',
        ui.ButtonSet.OK);
      return;
    }

    // 5. Obtener IDs ya importados (usa _uuid o _id como clave única)
    const idsExistentes = _obtenerIDsExistentes();

    // 6. Filtrar duplicados — si no tiene ningún ID único, importar de todas formas
    const filasNuevas = filasFiltradas.filter(f => {
      const uuid = (f[COL.UUID]     || '').trim();
      const id   = (f[COL.KOBO_ID] || '').trim();
      // Sin ningún identificador → siempre importar
      if (!uuid && !id) return true;
      // Excluir si ya existe cualquiera de los dos IDs
      if (uuid && idsExistentes.has(uuid)) return false;
      if (id   && idsExistentes.has(id))   return false;
      return true;
    });

    if (filasNuevas.length === 0) {
      // Diagnóstico: cuántos registros hay en DATOS
      const hojaDatos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.DATOS);
      const filasEnDatos = hojaDatos ? Math.max(0, hojaDatos.getLastRow() - 1) : 0;
      const msg = 'No hay registros nuevos. Todos ya estaban importados.\n\n' +
        'Registros actualmente en hoja DATOS: ' + filasEnDatos + '\n' +
        'Registros en KoboToolbox (2026): ' + filasFiltradas.length;
      escribirLog(msg, 'INFO');
      // Aunque no haya nuevos, actualiza las vistas con lo que ya hay
      actualizarDashboard();
      actualizarCohortes();
      actualizarResumenPresupuesto();
      ui.alert('Sin novedades', msg + '\n\nEl Dashboard ha sido actualizado con los datos existentes.', ui.ButtonSet.OK);
      return;
    }

    // 6. Escribir en hoja DATOS
    const hojaDatos = obtenerOCrearHoja(HOJAS.DATOS);
    _asegurarEncabezadosDatos(hojaDatos);

    // Normalizar cada registro usando el esquema del formulario v11
    const matrizNueva = filasNuevas.map(f => {
      const normalizado = normalizarRegistroKobo(f);
      return HEADERS_DATOS.map(col => normalizado[col] || '');
    });

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

/** Retorna un Set con todos los _uuid y _id ya importados en la hoja DATOS. */
function _obtenerIDsExistentes() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.DATOS);
  if (!hoja || hoja.getLastRow() < 2) return new Set();

  const ids = new Set();
  [COL.UUID, COL.KOBO_ID].forEach(colNombre => {
    const colIdx = HEADERS_DATOS.indexOf(colNombre) + 1;
    if (colIdx === 0) return;
    const valores = hoja.getRange(2, colIdx, hoja.getLastRow() - 1, 1).getValues();
    valores.flat().forEach(v => { const s = String(v).trim(); if (s) ids.add(s); });
  });
  return ids;
}

/** Asegura que la hoja DATOS tenga los encabezados correctos (nombres amigables). */
function _asegurarEncabezadosDatos(hoja) {
  if (hoja.getLastRow() === 0) {
    escribirEncabezados(hoja, HEADERS_DISPLAY, COLORES.PRIMARIO);
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

  const numCols = Math.min(hoja.getLastColumn(), HEADERS_DATOS.length);
  const filas   = hoja.getRange(2, 1, hoja.getLastRow() - 1, numCols).getValues();

  // Usa HEADERS_DATOS (nombres reales del CSV) como claves — ignora los encabezados visuales del sheet
  return filas.map(fila => {
    const obj = {};
    HEADERS_DATOS.forEach((col, i) => {
      obj[col] = fila[i] !== undefined ? String(fila[i]) : '';
    });
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

  // Cargar cohortes de referencia para cruzar presupuesto
  const cohortesRef = _leerCohortesRef();
  const cohortes    = _agruparPorCohorte(datos, cohortesRef);
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

/** Lee la hoja COHORTES_REF y devuelve un mapa {nombreCohorte: {presupuesto, estado}}. */
function _leerCohortesRef() {
  const mapa = {};
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.COHORTES_REF);
  if (!hoja || hoja.getLastRow() < 3) return mapa;

  // Encabezados en fila 2, datos desde fila 3
  const headers = hoja.getRange(2, 2, 1, hoja.getLastColumn() - 1).getValues()[0];
  const filas   = hoja.getRange(3, 2, hoja.getLastRow() - 2, headers.length).getValues();

  filas.forEach(fila => {
    const obj = {};
    headers.forEach((h, i) => { obj[String(h).trim()] = fila[i]; });
    const nombre = String(obj['Nombre Cohorte'] || '').trim();
    if (nombre) {
      mapa[nombre.toLowerCase()] = {
        nombre:      nombre,
        proyecto:    String(obj['Fuente'] || obj['Proyecto'] || '').trim(),
        estado:      String(obj['Estado'] || '').trim(),
        presupuesto: parseMonto(obj['Presupuesto Total (Q)']),
      };
    }
  });
  return mapa;
}

function _agruparPorCohorte(datos, cohortesRef) {
  const ref      = cohortesRef || {};
  const cohortes = {};

  datos.forEach(d => {
    const proyecto = (d[COL.PROYECTO] || 'Sin proyecto').trim();
    const fase     = (d[COL.FASE]     || 'Sin cohorte').trim();
    const clave    = proyecto + '||' + fase;

    if (!cohortes[clave]) {
      // Buscar en referencia por nombre de cohorte (sin importar mayúsculas)
      const refInfo    = ref[fase.toLowerCase()] || null;
      const registrada = refInfo !== null;

      cohortes[clave] = {
        proyecto,
        fase,
        participantes: [],
        totalMonto: 0,
        registros:  0,
        registrada,
        presupuesto: refInfo ? refInfo.presupuesto : 0,
        estadoRef:   refInfo ? refInfo.estado       : '',
      };
    }

    const c      = cohortes[clave];
    const nombre = ((d[COL.NOMBRE] || '') + ' ' + (d[COL.APELLIDO] || '')).trim();
    const monto  = parseMonto(d[COL.MONTO_TOTAL]);

    c.totalMonto += monto;
    c.registros  += 1;

    c.participantes.push({
      creamos_id:       d[COL.CREAMOS_ID]       || '',
      nombre,
      fecha:            d[COL.FECHA]            || '',
      monto_base:       d[COL.MONTO_BASE]       || '',
      descuento:        d[COL.DESCUENTO]        || '0',
      monto,
      motivo_descuento: d[COL.MOTIVO_DESCUENTO] || '',
      incentivo:        d[COL.INCENTIVO]        || '',
      comentarios:      d[COL.COMENTARIOS]      || '',
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

  // Fila 1: Proyecto + estado de cohorte
  const labelCohorte = coh.registrada
    ? '✅ ' + coh.fase + (coh.estadoRef ? '  [' + coh.estadoRef + ']' : '')
    : '⚠️ ' + coh.fase + '  — cohorte no registrada en COHORTES_REF';

  const rProyecto = hoja.getRange(fila, 2, 1, 7);
  rProyecto.merge();
  rProyecto.setValue('PROYECTO: ' + coh.proyecto.toUpperCase() + '   |   ' + labelCohorte);
  rProyecto.setBackground(colorFondo);
  rProyecto.setFontColor('#FFFFFF');
  rProyecto.setFontWeight('bold');
  rProyecto.setFontSize(10);
  hoja.setRowHeight(fila, 26);
  fila++;

  // Fila 2: métricas + presupuesto
  const saldo       = coh.presupuesto - coh.totalMonto;
  const pct         = coh.presupuesto > 0
    ? ((coh.totalMonto / coh.presupuesto) * 100).toFixed(1) + '%'
    : '—';
  const presupInfo  = coh.registrada
    ? '  |  Presupuesto: ' + fmtQ(coh.presupuesto) +
      '  Gastado: ' + fmtQ(coh.totalMonto) +
      '  Saldo: ' + fmtQ(saldo) +
      '  (' + pct + ')'
    : '  |  Sin presupuesto registrado';

  const rFase = hoja.getRange(fila, 2, 1, 7);
  rFase.merge();
  rFase.setValue(coh.registros + ' estipendios' + presupInfo);
  const colorFila2 = coh.registrada
    ? (saldo >= 0 ? '#1A5276' : COLORES.ROJO)
    : '#7D6608';
  rFase.setBackground(colorFila2);
  rFase.setFontColor('#FFFFFF');
  rFase.setFontWeight('bold');
  hoja.setRowHeight(fila, 22);
  fila++;

  return fila;
}

function _escribirEncabezadosParticipantes(hoja, fila) {
  const cols = [
    'Creamos ID', 'Participante', 'Fecha',
    'Monto Base', 'Descuento', 'Monto Total', 'Motivo / Incentivo',
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
  const motivoInfo = [p.motivo_descuento, p.incentivo, p.comentarios]
    .filter(v => v).join(' / ');
  const valores = [
    p.creamos_id,
    p.nombre,
    p.fecha,
    p.monto_base ? fmtQ(parseMonto(p.monto_base)) : '—',
    p.descuento && p.descuento !== '0' ? fmtQ(parseMonto(p.descuento)) : '—',
    fmtQ(p.monto),
    motivoInfo,
  ];
  const r = hoja.getRange(fila, 2, 1, valores.length);
  r.setValues([valores]);
  r.setBackground(pIdx % 2 === 0 ? '#F8F4FF' : '#FFFFFF');
  r.setFontSize(9);
  hoja.setRowHeight(fila, 18);
  return fila + 1;
}

function _escribirSubtotalCohorte(hoja, fila, coh) {
  const saldo = coh.presupuesto - coh.totalMonto;
  const r = hoja.getRange(fila, 2, 1, 7);
  r.setValues([[
    '', 'SUBTOTAL',
    '',
    '',
    '',
    fmtQ(coh.totalMonto),
    coh.registros + ' estipendios' + (coh.registrada ? '  |  Saldo: ' + fmtQ(saldo) : ''),
  ]]);
  r.setBackground(COLORES.FONDO_CARD);
  r.setFontWeight('bold');
  r.setFontColor(COLORES.PRIMARIO);
  r.setFontSize(9);
  hoja.setRowHeight(fila, 20);
  return fila + 1;
}
// ============================================================
// COHORTES EXTERNAS — Importación desde Google Sheets de proyectos
// ============================================================

/**
 * Importa cohortes desde todos los Google Sheets externos definidos en FUENTES_COHORTES.
 * Crea/actualiza la hoja COHORTES_REF con todos los datos unificados.
 */
function importarCohortes() {
  const ui = SpreadsheetApp.getUi();
  const hoja = obtenerOCrearHoja(HOJAS.COHORTES_REF);

  try {
    escribirLog('Importando cohortes desde fuentes externas...', 'INFO');

    const todasLasCohortes = [];

    FUENTES_COHORTES.forEach(fuente => {
      try {
        const filas = _leerSheetExterno(fuente.id, fuente.hoja);
        // Solo incluir filas que tengan Nombre Cohorte no vacío
        const validas = filas.filter(f =>
          String(f[COL_COHORTE.NOMBRE] || '').trim() !== ''
        );
        escribirLog('Cohortes de "' + fuente.proyecto + '": ' + validas.length + ' válidas de ' + filas.length + ' leídas', 'INFO');
        validas.forEach(f => {
          todasLasCohortes.push({ ...f, _fuente: fuente.proyecto });
        });
      } catch (e) {
        escribirLog('Error leyendo "' + fuente.proyecto + '": ' + e.message, 'ERROR');
      }
    });

    if (todasLasCohortes.length === 0) {
      ui.alert('Sin cohortes', 'No se encontraron cohortes en las fuentes externas.\nVerifica que los IDs de spreadsheet sean correctos y que tengas acceso.', ui.ButtonSet.OK);
      return;
    }

    // Cruzar con gastos reales de KoboToolbox
    const datos = _leerDatos();
    const gastosPorCohorte = _calcularGastosPorCohorte(datos);

    // Escribir hoja COHORTES_REF
    _escribirCohorteRef(hoja, todasLasCohortes, gastosPorCohorte);

    // Actualizar PRESUPUESTO con los datos de cohortes
    _sincronizarPresupuestoDesdeCohortes(todasLasCohortes, gastosPorCohorte);

    escribirLog('Cohortes importadas: ' + todasLasCohortes.length, 'OK');
    ui.alert('Cohortes importadas',
      '✅ ' + todasLasCohortes.length + ' cohortes importadas correctamente.\n\n' +
      'Hoja COHORTES_REF y PRESUPUESTO actualizados.',
      ui.ButtonSet.OK);

  } catch (e) {
    escribirLog('Error importando cohortes: ' + e.message, 'ERROR', e.stack);
    ui.alert('Error', e.message, ui.ButtonSet.OK);
  }
}

/** Lee todas las filas de una hoja en un Google Sheet externo. */
function _leerSheetExterno(spreadsheetId, nombreHoja) {
  const ss    = SpreadsheetApp.openById(spreadsheetId);
  const hoja  = ss.getSheetByName(nombreHoja);
  if (!hoja) throw new Error('No se encontró la hoja "' + nombreHoja + '" en el spreadsheet ' + spreadsheetId);

  const ultimaFila = hoja.getLastRow();
  const ultimaCol  = hoja.getLastColumn();
  if (ultimaFila < 2 || ultimaCol < 1) return [];

  const headers = hoja.getRange(1, 1, 1, ultimaCol).getValues()[0];
  const filas   = hoja.getRange(2, 1, ultimaFila - 1, ultimaCol).getValues();

  return filas
    .filter(fila => fila.some(v => v !== '' && v !== null))
    .map(fila => {
      const obj = {};
      headers.forEach((h, i) => { obj[String(h).trim()] = fila[i]; });
      return obj;
    });
}

/** Calcula el total de estipendios gastados agrupado por Proyecto+Fase (cohorte). */
function _calcularGastosPorCohorte(datos) {
  const gastos = {};
  datos.forEach(d => {
    const proyecto = (d[COL.PROYECTO] || '').trim();
    const fase     = (d[COL.FASE]     || '').trim();
    const clave    = proyecto + '||' + fase;
    const monto    = parseMonto(d[COL.MONTO_TOTAL]);
    if (!gastos[clave]) gastos[clave] = { total: 0, count: 0 };
    gastos[clave].total += monto;
    gastos[clave].count += 1;
  });
  return gastos;
}

/** Escribe la hoja COHORTES_REF con todos los datos cruzados. */
function _escribirCohorteRef(hoja, cohortes, gastosPorCohorte) {
  hoja.clearContents();
  hoja.clearFormats();

  // Título
  const rTit = hoja.getRange('B1:M1');
  rTit.merge();
  rTit.setValue('REFERENCIA DE COHORTES — TODAS LAS FUENTES');
  rTit.setBackground(COLORES.PRIMARIO);
  rTit.setFontColor('#FFFFFF');
  rTit.setFontSize(13);
  rTit.setFontWeight('bold');
  rTit.setHorizontalAlignment('center');
  hoja.setRowHeight(1, 40);

  // Encabezados
  const encabezados = [
    'Fuente', 'Nombre Cohorte', 'Proyecto', 'Año', 'Estado',
    'Cupo', 'Pre-Inscritos', 'Graduados', 'Retirados',
    'Presupuesto Total (Q)', 'Estipendios Gastados (Q)', 'Saldo Estipendios (Q)',
  ];
  const rEnc = hoja.getRange(2, 2, 1, encabezados.length);
  rEnc.setValues([encabezados]);
  rEnc.setBackground(COLORES.SECUNDARIO);
  rEnc.setFontColor('#FFFFFF');
  rEnc.setFontWeight('bold');
  rEnc.setFontSize(9);
  hoja.setFrozenRows(2);

  // Filas de datos
  let nuevasCohortes = 0;
  cohortes.forEach((c, idx) => {
    const fila = idx + 3;
    const nombreCohorte = String(c[COL_COHORTE.NOMBRE]   || '').trim();
    const proyecto      = String(c[COL_COHORTE.PROYECTO] || c._fuente || '').trim();
    const fase          = nombreCohorte; // La "fase" en Kobo equivale al nombre de cohorte

    // Buscar gastos: intentar match exacto primero, luego parcial
    const claveExacta = proyecto + '||' + fase;
    let gastadoEstip  = (gastosPorCohorte[claveExacta] || {}).total || 0;

    // Si no hay match exacto, buscar por nombre parcial
    if (gastadoEstip === 0) {
      Object.entries(gastosPorCohorte).forEach(([k, v]) => {
        const [p, f] = k.split('||');
        if (_textoSimilar(proyecto, p) || _textoSimilar(nombreCohorte, f)) {
          gastadoEstip += v.total;
        }
      });
    }

    const presupTotal = parseMonto(c[COL_COHORTE.PRESUP_TOTAL]) ||
                        parseMonto(c[COL_COHORTE.PRESUP_PRACT]);
    const saldoEstip  = presupTotal - gastadoEstip;

    const estado = String(c[COL_COHORTE.ESTADO] || '').trim();
    const esNueva = estado.toLowerCase().includes('activ') ||
                    estado.toLowerCase().includes('en curso');
    if (esNueva) nuevasCohortes++;

    const valores = [
      c._fuente,
      nombreCohorte,
      proyecto,
      c[COL_COHORTE.ANIO]         || '',
      estado,
      c[COL_COHORTE.CUPO]         || '',
      c[COL_COHORTE.PRE_INSCRITOS]|| '',
      c[COL_COHORTE.GRADUADOS]    || '',
      c[COL_COHORTE.RETIRADOS]    || '',
      presupTotal,
      gastadoEstip,
      saldoEstip,
    ];

    hoja.getRange(fila, 2, 1, valores.length).setValues([valores]);

    // Color por estado
    const bg = esNueva
      ? '#E8F5E9'
      : (idx % 2 === 0 ? COLORES.FONDO_CARD : '#FFFFFF');
    hoja.getRange(fila, 2, 1, valores.length).setBackground(bg);

    // Color saldo
    const colorSaldo = saldoEstip >= 0 ? COLORES.VERDE : COLORES.ROJO;
    hoja.getRange(fila, 13).setFontColor(colorSaldo).setFontWeight('bold');

    hoja.setRowHeight(fila, 20);
  });

  // Nota de cohortes activas
  const filaInfo = cohortes.length + 4;
  hoja.getRange(filaInfo, 2, 1, 5).merge()
    .setValue('✅ Cohortes activas: ' + nuevasCohortes + '  |  Total: ' + cohortes.length +
              '  |  Actualizado: ' + Utilities.formatDate(new Date(), 'America/Guatemala', 'dd/MM/yyyy HH:mm'))
    .setFontColor('#555555').setFontSize(9);

  // Anchos de columna
  hoja.setColumnWidth(1, 20);
  [2,3,4,5,6,7,8,9,10,11,12,13].forEach((c, i) => {
    hoja.setColumnWidth(c, [120,200,160,50,80,60,60,60,60,130,140,130][i]);
  });
}

/**
 * Sincroniza la hoja PRESUPUESTO usando los datos de cohortes externas.
 * Crea o actualiza una fila por cada proyecto/cohorte con presupuesto.
 */
function _sincronizarPresupuestoDesdeCohortes(cohortes, gastosPorCohorte) {
  const hoja = obtenerOCrearHoja(HOJAS.PRESUPUESTO);

  // Leer proyectos ya existentes (filas 4+)
  const proyectosExistentes = {};
  if (hoja.getLastRow() >= 4) {
    const rango = hoja.getRange(4, 2, hoja.getLastRow() - 3, 3).getValues();
    rango.forEach((fila, idx) => {
      const nombre = String(fila[0] || '').trim();
      if (nombre && !nombre.startsWith('⚠️')) {
        proyectosExistentes[nombre] = 4 + idx;
      }
    });
  }

  // Agregar cohortes que no existan todavía
  let agregadas = 0;
  cohortes.forEach(c => {
    const nombre = String(c[COL_COHORTE.NOMBRE]   || '').trim();
    const proyec = String(c[COL_COHORTE.PROYECTO] || c._fuente || '').trim();
    const clave  = nombre || proyec;
    if (!clave) return;

    const presup = parseMonto(c[COL_COHORTE.PRESUP_TOTAL]) ||
                   parseMonto(c[COL_COHORTE.PRESUP_PRACT]);

    if (!proyectosExistentes[clave] && !proyectosExistentes[nombre]) {
      hoja.appendRow(['', nombre, proyec + ' — ' + (c[COL_COHORTE.ESTADO] || ''), presup, '', '', '']);
      agregadas++;
    }
  });

  if (agregadas > 0) {
    escribirLog('Agregadas ' + agregadas + ' nuevas cohortes a PRESUPUESTO.', 'OK');
  }

  // Actualizar los cálculos
  actualizarResumenPresupuesto();
}

/** Compara dos textos ignorando acentos, mayúsculas y guiones bajos. */
function _textoSimilar(a, b) {
  if (!a || !b) return false;
  const limpiar = s => s.toLowerCase()
    .replace(/[_-]/g, ' ')
    .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
    .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
    .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
    .trim();
  return limpiar(String(a)).includes(limpiar(String(b))) ||
         limpiar(String(b)).includes(limpiar(String(a)));
}

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

  // Borrar filas de totales anteriores (evita duplicados)
  // Busca y borra cualquier fila que diga "TOTAL GENERAL" desde la fila 4 en adelante
  const totalFilas = hoja.getLastRow();
  for (let f = totalFilas; f >= 4; f--) {
    const val = String(hoja.getRange(f, 2).getValue()).trim();
    if (val === 'TOTAL GENERAL' || val === '') {
      hoja.deleteRow(f);
    } else {
      break; // Parar al encontrar una fila con datos reales
    }
  }

  // Calcular gastos reales desde DATOS
  const datos    = _leerDatos();
  const gastosPorProyecto = _calcularGastosPorProyecto(datos);

  // Leer presupuesto asignado (fila 4 en adelante)
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

// ============================================================
// CONFIGURACIÓN GLOBAL - DP Estipendios 2026
// ============================================================

const KOBO_URL =
  'https://kf.kobotoolbox.org/api/v2/assets/aNpJWVRoxxQ5a8pwBQVJac' +
  '/export-settings/esqLSo9A8oFvxVwZKUXwADx/data.csv';

const HOJAS = {
  DATOS:       'DATOS',
  DASHBOARD:   'DASHBOARD',
  COHORTES:    'COHORTES',
  PRESUPUESTO: 'PRESUPUESTO',
  LOG:         'LOG',
};

// Columnas exactas del CSV de KoboToolbox
const COL = {
  CREAMOS_ID:       'Creamos ID',
  NOMBRE:           'Nombre(s)',
  APELLIDO:         'Apellido(s)',
  FECHA:            'Fecha',
  PROYECTO:         'Proyecto',
  FASE:             'Fase',
  ESPECIALIDAD:     'Formaciones / Especialidad',
  MOTIVO_DESCUENTO: 'Formaciones / Motivo de descuento',
  INCENTIVO:        'Formaciones / Incentivo',
  TOTAL_HORAS:      'Formaciones / Total de horas',
  MONTO_TOTAL:      'Formaciones / Monto total',
  COMENTARIOS:      'Formaciones / Comentarios',
  FIRMA_FORMACION:  'Formaciones / Firma',
  FIRMA:            'Firma',
  KOBO_ID:          '_id',
  UUID:             '_uuid',
  SUBMISSION_TIME:  '_submission_time',
  VALIDATION:       '_validation_status',
  NOTES:            '_notes',
  STATUS:           '_status',
  SUBMITTED_BY:     '_submitted_by',
  TAGS:             '_tags',
  INDEX:            '_index',
  VERSION:          '__version__',
  ROOT_UUID:        'meta/rootUuid',
};

// Orden de columnas en la hoja DATOS
const HEADERS_DATOS = [
  COL.CREAMOS_ID, COL.NOMBRE, COL.APELLIDO, COL.FECHA,
  COL.PROYECTO,   COL.FASE,
  COL.ESPECIALIDAD, COL.MOTIVO_DESCUENTO, COL.INCENTIVO,
  COL.TOTAL_HORAS,  COL.MONTO_TOTAL, COL.COMENTARIOS,
  COL.FIRMA_FORMACION, COL.FIRMA,
  COL.KOBO_ID, COL.UUID, COL.SUBMISSION_TIME,
  COL.VALIDATION, COL.NOTES, COL.STATUS,
  COL.SUBMITTED_BY, COL.TAGS, COL.INDEX,
  COL.VERSION, COL.ROOT_UUID,
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

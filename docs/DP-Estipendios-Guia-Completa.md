# DP Estipendios 2026 — Guía de Conocimiento

> **Propósito de este documento:** Guía centralizada para cualquier persona (o IA) que necesite entender, usar o modificar el sistema de control de estipendios de Creamos Guatemala.
> 
> **Última actualización:** 2026-06-22
> **Autor original:** Adrian Torres — adrian@creamosguatemala.org

---

## ¿Qué es este sistema?

Sistema construido en **Google Sheets + Google Apps Script** para registrar y controlar los estipendios (bonos) entregados a participantes de cohortes de los programas de Creamos Guatemala.

**Reemplaza** el proceso manual de llevar esto en hojas de cálculo sin estructura.

**Se conecta a:**
- KoboToolbox (formulario de registro de pagos)
- Google Sheets externos de cada proyecto (catálogo de cohortes)

---

## Dónde vive el código

| Componente | Ubicación |
|---|---|
| Código fuente | Repositorio GitHub: `adrian-9856/DP_Estipendio` |
| Archivo principal | `DPEstipendios.gs` — un solo archivo, todo el sistema |
| Google Sheets en producción | El spreadsheet donde está instalado el Apps Script |
| KoboToolbox | Formulario v11 — URL configurada en `KOBO_URL` al inicio del código |

---

## Estructura de hojas — qué hace cada una

| Hoja | Color pestaña | Para qué sirve | ¿Se edita a mano? |
|---|---|---|---|
| **INICIO** | Blanco | Guía visual del sistema. Explica cada hoja y el flujo de trabajo. | No |
| **DASHBOARD** | Morado | Métricas ejecutivas: total gastado, presupuesto ejecutado, top participantes, gasto por proyecto. | No |
| **COHORTES** | Azul | Registros de KoboToolbox agrupados por cohorte. Muestra cada participante y monto pagado. | No |
| **COHORTES_REF** | Verde | Catálogo de cohortes importado de los Google Sheets externos. Fuente de verdad de qué cohortes existen. | No |
| **PRESUPUESTO** | Naranja | Presupuesto asignado vs. gastado por proyecto. Saldo en verde (ok) o rojo (excedido). | No — se llena automáticamente |
| **DATOS** | Gris oscuro | Datos crudos importados de KoboToolbox, normalizados. No editar a mano. | **NUNCA** |
| **LOG** | Gris | Historial de operaciones, importaciones y errores del sistema. | No |

---

## Menú del sistema

El sistema agrega un menú **"DP Estipendios"** en la barra de Google Sheets con estas opciones:

| Opción | Qué hace |
|---|---|
| ⬇️ Importar datos nuevos de KoboToolbox | Descarga el CSV, filtra solo 2026, agrega registros nuevos sin duplicar |
| 🏫 Importar Cohortes desde proyectos | Jala el catálogo de cohortes de los Google Sheets externos |
| 🔄 Reimportar todo desde KoboToolbox | Limpia DATOS y reimporta todo desde cero |
| ⚙️ Configurar estructura inicial | Crea todas las hojas si no existen, aplica orden y colores |
| 🕐 Activar importación automática diaria | Programa importación automática a las 6am Guatemala |
| 🔄 Reinstalar todo | **Borra todo** y recrea el sistema desde cero (pide doble confirmación) |

---

## Flujo de trabajo correcto

```
1. Importar Cohortes (una vez al inicio, o cuando hay cohortes nuevas)
        ↓
2. Importar datos de KoboToolbox (diario — automático a las 6am)
        ↓
3. Revisar DASHBOARD (métricas actualizadas)
        ↓
4. Revisar PRESUPUESTO (saldo disponible por proyecto)
        ↓
5. Revisar COHORTES (detalle por cohorte si es necesario)
```

> La importación automática diaria corre sola. Solo hay que intervenir si se agregan cohortes nuevas o si el formulario de KoboToolbox cambia.

---

## Cómo está construido — arquitectura técnica

### Tecnologías
- **Google Apps Script (V8 runtime)** — JavaScript moderno en el servidor de Google
- **SpreadsheetApp API** — manejo de hojas, rangos, formato
- **UrlFetchApp** — descarga del CSV de KoboToolbox
- **ScriptApp Triggers** — importación automática diaria

### Archivo único: `DPEstipendios.gs`

El sistema vive en un solo archivo de ~2000 líneas organizado en secciones:

```
CONFIGURACIÓN GLOBAL (líneas 1-165)
    - KOBO_URL: URL del CSV de KoboToolbox
    - FUENTES_COHORTES: IDs de Google Sheets externos
    - HOJAS / TAB_COLORS: nombres y colores de pestañas
    - COL_RAW: nombres de columnas en el CSV crudo de KoboToolbox
    - COL: claves internas normalizadas
    - HEADERS_DISPLAY / HEADERS_DATOS: encabezados de la hoja DATOS

UTILIDADES (parseCSV, normalización de texto, fechas)

IMPORTACIÓN DESDE KOBOTOOLBOX (importarDesdeKobo)

IMPORTACIÓN DE COHORTES (importarCohortes)

VISTAS (actualizarDashboard, actualizarCohortes, actualizarResumenPresupuesto)

GESTIÓN DEL SISTEMA (configurarEstructuraInicial, reinstalarTodo, etc.)

MENÚ (onOpen)
```

### Constantes clave — la sección más importante

Al inicio del archivo hay un bloque de configuración. **Si algo cambia en KoboToolbox o en los proyectos, aquí es donde se toca:**

```javascript
// URL del CSV exportado de KoboToolbox (formulario v11 — versión 2026061611)
// Asset ID: aKHz2RcV5eYtZ8oWpZVqq9
const KOBO_URL = 'https://kf.kobotoolbox.org/api/v2/assets/aKHz2RcV5eYtZ8oWpZVqq9/export-settings/esiHbDfadENGuL6btMr55Mi/data.csv';

// Google Sheets externos con catálogo de cohortes
const FUENTES_COHORTES = [
  { id: '1Ay1z3...', proyecto: 'Alimentos y Bebidas', hoja: 'Cohortes' },
  { id: '1En60z...', proyecto: 'Tech', hoja: 'Cohortes' },
];

// Nombres de columnas en el CSV de KoboToolbox (formulario v11)
const COL_RAW = {
  AB_COHORTE: 'group_ab/Cohorte_AB',
  AB_PARTICIPANTE: 'group_ab/Participante_AB',
  // ... etc.
};
```

---

## KoboToolbox — cómo funciona la conexión

### Formulario v11 (estructura actual)

El formulario tiene **grupos separados por proyecto**. Cuando alguien llena el formulario, elige un proyecto (Alimentos y Bebidas o Tech) y solo llena los campos de ese grupo:

```
Campos comunes: Proyecto, Fecha, _id, _uuid, _submission_time
Grupo AB:       group_ab/Cohorte_AB, group_ab/Participante_AB, group_ab/Monto_total_ab ...
Grupo Tech:     group_tech/Cohorte_Tech, group_tech/Participante_Tech, group_tech/Monto_total_tech ...
```

### Proceso de importación

1. Se descarga el CSV completo vía URL
2. Se detecta automáticamente el delimitador (`,` o `;`)
3. Se filtra solo registros del año 2026 (busca "2026" como texto en los campos de fecha)
4. Se verifica cuáles `_uuid` ya están en la hoja DATOS (para evitar duplicados)
5. Los registros nuevos se normalizan (`normalizarRegistroKobo`) y se escriben en DATOS
6. Se actualizan DASHBOARD, COHORTES y PRESUPUESTO

### Normalización de datos

El CSV de KoboToolbox viene con formato sucio. El sistema normaliza:
- **Underscores** → espacios (`Cohorte_AB_01` → `Cohorte AB 01`)
- **Fechas ISO** → DD/MM/YYYY (`2026-06-02T09:01:00` → `02/06/2026`)
- **Acentos faltantes** — diccionario de correcciones (`Tecnologia` → `Tecnología`)
- **Montos** — se convierten a número (`Q 250.00` → `250`)

---

## Google Sheets externos — cómo funciona la conexión

Se conecta a los Google Sheets de cada proyecto para obtener el catálogo de cohortes:

| Proyecto | ID del Google Sheet |
|---|---|
| Alimentos y Bebidas | `1Ay1z3HdFHTzSjq7891sQVuEpIXBA8g9XGibjI-wFklc` |
| Tech | `1En60zjrwPTrSMFrLUWr2KgXmH7y3vcopfpQgy6lY3HU` |

Los datos se leen de la hoja **"Cohortes"** de cada spreadsheet y se guardan en COHORTES_REF. Esto requiere que el Google Account que corre el script tenga acceso de lectura a esos sheets.

**Columnas esperadas en la hoja Cohortes de los sheets externos:**

| Columna | Descripción |
|---|---|
| Nombre Cohorte | Nombre oficial de la cohorte |
| Proyecto | Nombre del proyecto |
| Año | Año de la cohorte |
| Fecha Inicio / Fecha Fin | Fechas de la cohorte |
| Responsable | Persona a cargo |
| Presupuesto Total (Q) | Presupuesto asignado |

---

## Qué se puede tocar y qué no

### ✅ SE PUEDE tocar

| Qué | Dónde | Para qué |
|---|---|---|
| `KOBO_URL` | Línea ~6 del código | Cuando cambia el formulario de KoboToolbox |
| `FUENTES_COHORTES` | Línea ~10 del código | Para agregar o quitar proyectos |
| `COL_RAW` | Línea ~70 del código | Si cambian los nombres de columnas en KoboToolbox |
| `AÑO_FILTRO` | Línea ~162 del código | Para filtrar un año diferente |
| `COLORES` | Línea ~150 del código | Para cambiar la paleta de colores |

### ❌ NO tocar sin entender

| Qué | Por qué |
|---|---|
| `normalizarRegistroKobo()` | Mapea campos del CSV al esquema interno — cambiar sin entender rompe la importación |
| `_leerDatos()` | Lee DATOS usando posición de columna, no nombre — si se reordena DATOS, se rompe |
| `parseCSV()` | Detecta delimitador automáticamente — no tiene bugs conocidos |
| `HEADERS_DATOS` y `HEADERS_DISPLAY` | Deben estar en el mismo orden exacto — son paralelos |
| Hoja DATOS | **Nunca editar a mano** — el sistema asume que el contenido viene solo de KoboToolbox |

### ⚠️ Cuidado especial

- **No ejecutar `onOpen()` desde el editor de Apps Script** — provoca error de contexto. Solo se ejecuta automáticamente al abrir el spreadsheet.
- **Para probar desde el editor:** usar `actualizarVistas()` en su lugar.
- **Reinstalar todo borra TODOS los datos** — tiene doble confirmación pero es irreversible.

---

## Cómo agregar un nuevo proyecto

1. Crear la hoja "Cohortes" en el Google Sheet del nuevo proyecto con las columnas esperadas
2. En el código, agregar una entrada a `FUENTES_COHORTES`:
   ```javascript
   { id: 'ID_DEL_SPREADSHEET', proyecto: 'Nombre del Proyecto', hoja: 'Cohortes' }
   ```
3. En KoboToolbox, agregar un nuevo grupo de campos al formulario para el proyecto
4. En `COL_RAW`, agregar las constantes del nuevo grupo
5. En `normalizarRegistroKobo()`, agregar el caso del nuevo proyecto
6. Ejecutar **Importar Cohortes** y luego **Importar datos**

---

## Problemas conocidos y soluciones

| Problema | Causa | Solución |
|---|---|---|
| "Sin datos del año 2026" | El campo de fecha tiene formato en español | El filtro usa `String(value).includes('2026')` — revisa que `AÑO_FILTRO = 2026` |
| "No hay registros nuevos" con DATOS vacío | CSV usa `;` como delimitador | El parser lo detecta automáticamente — si falla, revisar `parseCSV()` |
| COHORTES_REF con filas vacías | Sheet externo tiene filas vacías entre datos | El filtro requiere que `Nombre Cohorte` no esté vacío |
| Error "Cannot call SpreadsheetApp.getUi()" | Se ejecutó `onOpen()` desde el editor | Normal — nunca ejecutar `onOpen()` desde el editor. Usar `actualizarVistas()` |
| Nombres sin acentos en COHORTES | KoboToolbox exporta texto sin normalizar | El sistema tiene diccionario de correcciones en `_normalizarTexto()` |
| Duplicados en fila TOTAL GENERAL del PRESUPUESTO | `_escribirTotalPresupuesto()` no limpiaba el total anterior | Corregido — borra filas con "TOTAL GENERAL" antes de escribir |

---

## Historial de versiones del sistema

| Versión | Fecha | Cambios principales |
|---|---|---|
| v1.0 | 2026-06 | Sistema inicial: importación KoboToolbox, DASHBOARD, COHORTES, PRESUPUESTO, LOG |
| v1.1 | 2026-06 | Fix delimitador CSV (semicolon vs comma), fix filtro de año 2026 |
| v1.2 | 2026-06 | Fix `_leerDatos()` — mapeo por posición en lugar de por nombre de encabezado |
| v1.3 | 2026-06 | Formulario v11: grupos separados por proyecto (group_ab, group_tech) |
| v1.4 | 2026-06 | Conexión a Google Sheets externos para catálogo de cohortes (COHORTES_REF) |
| v1.5 | 2026-06 | Solo Alimentos y Bebidas + Tech (Empleabilidad eliminado) |
| v1.6 | 2026-06 | Fix COHORTES_REF con filas vacías, botón Reinstalar todo |
| v1.7 | 2026-06-22 | Hoja INICIO (guía visual), colores de pestañas, orden correcto de hojas |
| v1.8 | 2026-06-22 | Actualización a formulario KoboToolbox v11 nuevo (asset aKHz2RcV5eYtZ8oWpZVqq9). Cohortes activas: Barismo 3, Barismo 4, Gastronomía 1 (AB) · Alfa Digital 1, SAC 1 (Tech) |

---

## Contacto y mantenimiento

- **Responsable del sistema:** Adrian Torres — adrian@creamosguatemala.org
- **Repositorio:** github.com/adrian-9856/DP_Estipendio
- **Para cambios:** editar `DPEstipendios.gs`, copiar todo el contenido al Apps Script del spreadsheet, guardar y recargar el spreadsheet

# Prompt para sincronizar IA con el sistema DP Estipendios

> Copia este prompt y pégalo al inicio de cualquier conversación con una IA (Claude, ChatGPT, Gemini, etc.) para que tenga todo el contexto necesario sobre el sistema.

---

## PROMPT BASE (copiar y pegar)

```
Eres un asistente técnico para el sistema "DP Estipendios 2026" de Creamos Guatemala.

## Qué es el sistema
Sistema en Google Sheets + Google Apps Script para registrar y controlar estipendios (bonos) 
pagados a participantes de cohortes. Se conecta a KoboToolbox para importar registros de pagos 
y a Google Sheets externos para obtener el catálogo de cohortes.

## Archivo principal
Todo el código vive en un único archivo: DPEstipendios.gs (~2000 líneas de JavaScript).
Repositorio: github.com/adrian-9856/DP_Estipendio

## Hojas del sistema
- INICIO: Guía visual del sistema (no tocar)
- DASHBOARD: Métricas ejecutivas (se actualiza automáticamente)
- COHORTES: Registros de KoboToolbox agrupados por cohorte (se actualiza automáticamente)
- COHORTES_REF: Catálogo de cohortes importado de los sheets externos (no tocar a mano)
- PRESUPUESTO: Presupuesto asignado vs. gastado por proyecto (se actualiza automáticamente)
- DATOS: Datos crudos de KoboToolbox normalizados (NUNCA editar a mano)
- LOG: Historial de operaciones y errores

## Estructura del código (secciones en orden)
1. CONFIGURACIÓN GLOBAL (constantes: KOBO_URL, FUENTES_COHORTES, HOJAS, TAB_COLORS, COL_RAW, COL, HEADERS)
2. UTILIDADES (parseCSV con detección automática de delimitador, normalización de texto y fechas)
3. IMPORTACIÓN DESDE KOBOTOOLBOX (importarDesdeKobo)
4. IMPORTACIÓN DE COHORTES (importarCohortes — lee Google Sheets externos)
5. VISTAS (actualizarDashboard, actualizarCohortes, actualizarResumenPresupuesto)
6. GESTIÓN DEL SISTEMA (configurarEstructuraInicial, reinstalarTodo, _crearHojaInicio, _ordenarHojas)
7. MENÚ (onOpen — NO ejecutar desde el editor, solo abre el spreadsheet)

## Proyectos activos
- Alimentos y Bebidas (Sheet ID: 1Ay1z3HdFHTzSjq7891sQVuEpIXBA8g9XGibjI-wFklc)
- Tech (Sheet ID: 1En60zjrwPTrSMFrLUWr2KgXmH7y3vcopfpQgy6lY3HU)
(Empleabilidad fue eliminado del sistema)

## Formulario KoboToolbox v11
El formulario tiene grupos separados por proyecto:
- group_ab/Cohorte_AB, group_ab/Participante_AB, group_ab/Monto_total_ab ... (Alimentos y Bebidas)
- group_tech/Cohorte_Tech, group_tech/Participante_Tech, group_tech/Monto_total_tech ... (Tech)

## Reglas críticas
- NUNCA ejecutar onOpen() desde el editor de Apps Script (da error de contexto)
- NUNCA editar la hoja DATOS a mano
- HEADERS_DATOS y HEADERS_DISPLAY deben mantener el mismo orden (son paralelos)
- _leerDatos() mapea por posición de columna, no por nombre
- La detección de año usa String(value).includes('2026') en los campos de fecha

## Qué hacer cuando se solicita un cambio
1. Leer DPEstipendios.gs completo antes de proponer cambios
2. Identificar la sección correcta donde va el cambio
3. Mantener el estilo de código existente (español para variables de dominio, inglés evitado)
4. Después de cualquier cambio, actualizar el archivo docs/DP-Estipendios-Guia-Completa.md
   con la nueva versión en el historial y cualquier cambio en las secciones relevantes
5. Hacer commit y push al branch claude/modest-meitner-7ylbg3

## Contexto de la persona
- Nombre: Adrian Torres
- Email: adrian@creamosguatemala.org
- No es desarrollador — prefiere explicaciones claras sin jerga técnica innecesaria
- El sistema lo usa el equipo de Creamos Guatemala para reportes internos

Ahora dime qué necesitas hacer con el sistema.
```

---

## Variantes del prompt según la tarea

### Para pedir solo una explicación
Agrega al final del prompt base:
```
Solo necesito que me expliques [TEMA] sin hacer cambios al código todavía.
```

### Para pedir un cambio específico
Agrega al final del prompt base:
```
Necesito hacer el siguiente cambio: [DESCRIPCIÓN DEL CAMBIO]
Primero dime qué archivos/funciones afecta antes de tocar nada.
```

### Para reportar un error
Agrega al final del prompt base:
```
Tengo este error: [MENSAJE DE ERROR EXACTO]
Esto pasó cuando: [QUÉ ACCIÓN HICE]
El LOG del sistema muestra: [CONTENIDO DEL LOG SI HAY]
```

### Para agregar un nuevo proyecto
Agrega al final del prompt base:
```
Quiero agregar un nuevo proyecto al sistema:
- Nombre del proyecto: [NOMBRE]
- ID del Google Sheet: [ID]
- Nombre de la hoja con cohortes: [NOMBRE DE LA HOJA]
- Columnas del formulario KoboToolbox para este proyecto: [LISTA DE COLUMNAS]
```

---

## Regla para la IA: actualizar siempre la guía

> Cualquier IA que trabaje en este sistema debe seguir esta regla:
> 
> **Después de cada cambio al código, actualizar `docs/DP-Estipendios-Guia-Completa.md`:**
> 1. Agregar una línea en la tabla "Historial de versiones" con la fecha y descripción del cambio
> 2. Si el cambio afecta cómo usar el sistema, actualizar la sección correspondiente
> 3. Si se agrega una función nueva importante, documentarla en "Arquitectura técnica"
> 4. Hacer commit de ambos archivos juntos (código + guía)

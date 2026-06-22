# DP Estipendios — Sistema de Control de Bonos por Cohorte

Sistema completo en **Google Sheets + Apps Script** para registrar, controlar y analizar los estipendios entregados a participantes de cohortes.

---

## ¿Qué hace este sistema?

- **Importa automáticamente** los registros de KoboToolbox (solo datos del 2026)
- **Evita duplicados**: nunca importa el mismo registro dos veces
- **Dashboard** con métricas en tiempo real: total gastado, participantes, proyectos activos
- **Vista por Cohortes**: cada proyecto/fase con su lista de participantes y montos
- **Control de Presupuesto**: ingresas el presupuesto asignado, el sistema calcula saldo automáticamente
- **Log de importaciones**: historial de cada importación realizada
- **Importación automática diaria** (opcional, a las 6am hora Guatemala)

---

## Estructura de hojas

| Hoja | Descripción |
|------|-------------|
| `DASHBOARD` | Métricas principales, gasto por proyecto, top participantes |
| `COHORTES` | Vista agrupada por proyecto y fase con participantes |
| `PRESUPUESTO` | Control de presupuesto asignado vs. gastado vs. saldo |
| `DATOS` | Datos raw importados de KoboToolbox |
| `LOG` | Historial de importaciones y errores |

---

## Instalación paso a paso

### Paso 1: Crear el Google Spreadsheet

1. Abre [Google Sheets](https://sheets.google.com) y crea un nuevo documento
2. Nómbralo: `DP Estipendios 2026`

### Paso 2: Abrir el Editor de Apps Script

1. En el menú del spreadsheet: **Extensiones → Apps Script**
2. Se abrirá el editor de código

### Paso 3: Copiar el código

1. Abre el archivo **`DPEstipendios.gs`** de este repositorio
2. Copia **todo** su contenido
3. En el editor de Apps Script, haz clic en el archivo `Code.gs` que aparece por defecto
4. **Borra todo** lo que hay y **pega** el contenido copiado
5. Guarda (Ctrl+S)

### Paso 4: Guardar y ejecutar la configuración inicial

1. Guarda todos los archivos (Ctrl+S)
2. **Cierra y vuelve a abrir** el spreadsheet
3. Aparecerá el menú **"DP Estipendios"** en la barra de menús
4. Ve a **DP Estipendios → Configurar estructura inicial**
5. Autoriza los permisos cuando se soliciten

### Paso 5: Ingresar presupuestos

1. Ve a la hoja **PRESUPUESTO**
2. Reemplaza los ejemplos con tus proyectos reales:
   - Columna B: Nombre del proyecto (igual que en KoboToolbox)
   - Columna C: Descripción
   - Columna D: Presupuesto asignado en Quetzales

### Paso 6: Importar datos

1. Ve a **DP Estipendios → Importar datos desde KoboToolbox**
2. El sistema descargará los datos, filtrará solo 2026 y actualizará todas las hojas

### Paso 7 (opcional): Activar importación automática

- **DP Estipendios → Activar importación automática diaria**
- Los datos se actualizarán cada día a las 6:00 AM automáticamente

---

## Uso diario

Una vez configurado, el equipo **solo necesita abrir el Google Sheets** y ver:

- **DASHBOARD**: Resumen ejecutivo con todas las métricas
- **COHORTES**: Ver qué participantes recibieron estipendio en cada cohorte
- **PRESUPUESTO**: Verificar cuánto presupuesto queda por proyecto

No hay que hacer nada más — la importación automática lo actualiza todo.

---

## Manejo de nuevas cohortes

Cuando se crea una nueva cohorte en KoboToolbox:
1. La próxima importación traerá los nuevos registros automáticamente
2. La hoja COHORTES mostrará la nueva cohorte sin configuración adicional
3. En PRESUPUESTO, agrega una fila con el nombre del nuevo proyecto y su presupuesto

---

## URL de KoboToolbox

```
https://kf.kobotoolbox.org/api/v2/assets/aNpJWVRoxxQ5a8pwBQVJac/export-settings/esqLSo9A8oFvxVwZKUXwADx/data.csv
```

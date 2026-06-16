# Prompt para generar Guía de Conocimiento de un sistema

> Plantilla genérica. Úsala con cualquier IA (Claude, ChatGPT, Gemini, etc.) para que
> analice un sistema y genere su guía de conocimiento centralizada.

---

## PROMPT (copiar, pegar y rellenar los [ ])

```
Necesito que analices el siguiente sistema y generes una Guía de Conocimiento completa
en formato Markdown, lista para guardar en Obsidian.

## Información del sistema
- Nombre del sistema: [NOMBRE]
- Para qué sirve: [DESCRIPCIÓN BREVE]
- Tecnologías usadas: [LISTA: ej. Google Sheets, Apps Script, Python, etc.]
- Dónde vive el código: [REPOSITORIO / CARPETA / ARCHIVO]
- Quién lo usa: [EQUIPO O PERSONAS]
- Responsable: [NOMBRE Y CORREO]

## Contexto adicional
[Pega aquí cualquier cosa relevante: capturas de pantalla, el código, errores comunes,
decisiones de diseño que ya tomaste, lo que sea que la IA necesite saber]

## Lo que quiero en la guía

La guía debe incluir estas secciones:

1. **¿Qué es este sistema?** — Propósito, problema que resuelve, a quién va dirigido
2. **Dónde vive** — Repositorio, archivos principales, accesos necesarios
3. **Estructura** — Componentes, módulos, hojas, tablas o lo que aplique según el sistema
4. **Cómo está construido** — Arquitectura, tecnologías, decisiones importantes
5. **Flujo de trabajo** — Cómo se usa día a día, paso a paso
6. **Qué se puede tocar y qué no** — Tabla clara: qué modificar, qué nunca tocar y por qué
7. **Cómo agregar o extender** — Pasos para agregar nueva funcionalidad o módulos
8. **Problemas conocidos y soluciones** — Tabla de errores comunes con causa y solución
9. **Historial de versiones** — Tabla con fecha, versión y cambios principales
10. **Contacto y mantenimiento** — Responsable, cómo reportar problemas

## Reglas de formato
- Markdown limpio, compatible con Obsidian
- Usar tablas donde haya listas de elementos comparables
- Bloques de código con el lenguaje correcto para fragmentos de código
- Emojis solo en encabezados de sección si ayudan a la lectura rápida
- Lenguaje claro, sin jerga innecesaria — debe entenderlo alguien no técnico

## Regla de mantenimiento
Al final de la guía incluye una sección llamada "Cómo mantener esta guía actualizada"
que indique: cada vez que se haga un cambio importante al sistema, qué secciones
actualizar y cómo registrarlo en el historial de versiones.

Genera la guía completa ahora.
```

---

## Consejos de uso

- **Cuanto más contexto pegues, mejor la guía.** Si tienes el código, pégalo. Si tienes
  capturas de pantalla, descríbelas. Si hay decisiones que tomaste por una razón específica,
  mencionalo.

- **Después de generarla, pídele a la IA que la revise:**
  ```
  Revisa la guía que generaste. ¿Hay algo importante que faltó o que no quedó claro
  para alguien que nunca ha visto este sistema?
  ```

- **Para actualizarla después de un cambio:**
  ```
  El sistema tuvo este cambio: [DESCRIPCIÓN DEL CAMBIO]
  Actualiza la guía en las secciones que correspondan y agrega una línea al historial
  de versiones con la fecha de hoy.
  ```

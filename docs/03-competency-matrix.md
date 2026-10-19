# Matriz de competencias

Escala:

- **0 · No observado:** no puede abordarlo.
- **1 · Guiado:** lo resuelve con instrucciones paso a paso.
- **2 · Funcional:** lo resuelve de forma autónoma en casos habituales.
- **3 · Sólido:** maneja casos límite y explica decisiones.

| Competencia | Evidencia mínima | Ejercicios | Nivel requerido |
|---|---|---:|---:|
| Semántica HTML | Landmarks, jerarquía, controles correctos | 01-03 | 2 |
| Formularios accesibles | Label, ayuda, agrupación, error y teclado | 02, 14, capstone | 2 |
| CSS y cascada | Resuelve layout sin aumentar especificidad indiscriminadamente | 04 | 2 |
| Flexbox y Grid | Elige la herramienta adecuada y mantiene responsive | 05-07 | 2 |
| Transformación de datos | Funciones puras y métodos de arrays | 08-09 | 2 |
| Módulos y errores | Separa responsabilidades y conserva contexto del error | 10 | 2 |
| Asincronía | Usa concurrencia, timeout y recuperación conscientemente | 11 | 2 |
| DOM seguro | Crea nodos y evita inyección de contenido | 12 | 2 |
| Eventos | Comprende bubbling y delegación | 13 | 2 |
| Estado del navegador | URL y storage con serialización defensiva | 15 | 2 |
| HTTP | Distingue error de red y respuesta HTTP no satisfactoria | 16-18 | 2 |
| Estados de UI | Loading, empty, error y success coherentes | 16, capstone | 2 |
| Cancelación | Evita resultados obsoletos en búsquedas | 18, capstone | 1 |
| Modelado TypeScript | Tipos de dominio, narrowing y `unknown` | 19 | 2 |
| Genéricos | Abstracción útil sin ocultar el contrato | 20 | 2 |
| Estados discriminados | Render exhaustivo y sin combinaciones imposibles | 21 | 2 |
| Depuración | Usa consola, Network, breakpoints y reproducción mínima | transversal | 2 |
| Explicación técnica | Defiende decisiones y reconoce trade-offs | capstone | 2 |

## Regla de decisión

La media no debe ocultar carencias esenciales. Para pasar a Angular:

- ninguna competencia marcada como obligatoria puede estar en nivel 0;
- HTML, JavaScript, DOM, HTTP y TypeScript deben alcanzar nivel 2;
- el capstone debe superar los mínimos de accesibilidad y manejo de errores;
- la persona debe explicar el flujo completo desde interacción hasta respuesta de la API.

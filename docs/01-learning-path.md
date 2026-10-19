# Itinerario de aprendizaje

## Objetivo

Este itinerario prepara a una persona para trabajar con Angular sin convertir el framework en un sustituto de los fundamentos web.

La secuencia es acumulativa. Cada bloque presupone que los anteriores se manejan con suficiente autonomía. El tiempo es orientativo: debe adaptarse al punto de partida, no utilizarse como objetivo de productividad.

## Diagnóstico inicial

Antes de empezar, pide a la persona que resuelva durante 60-90 minutos una página sencilla con:

- estructura semántica;
- una lista renderizada desde un array;
- filtro por texto;
- un formulario con validación nativa;
- una petición `fetch`;
- estado de carga y error.

No se busca terminar todo. El diagnóstico permite decidir qué bloques pueden abreviarse y dónde existe dependencia excesiva de tutoriales o asistentes. El enunciado y la pauta de observación están en [`diagnostic/README.md`](../diagnostic/README.md).

## Bloque 1 · HTML y accesibilidad

**Ejercicios:** 01-03  
**Duración orientativa:** 4-6 horas

Competencias:

- jerarquía de encabezados y landmarks;
- HTML semántico frente a `div` genéricos;
- enlaces y botones según intención;
- formularios, etiquetas, ayudas y agrupaciones;
- tablas de datos accesibles;
- navegación por teclado y foco visible.

Salida esperada: una persona puede estructurar una página sin depender de componentes visuales.

## Bloque 2 · CSS

**Ejercicios:** 04-07  
**Duración orientativa:** 6-9 horas

Competencias:

- cascada, herencia, especificidad y box model;
- Flexbox para distribución unidimensional;
- Grid para composición bidimensional;
- diseño mobile-first;
- unidades fluidas, `min()`, `max()`, `clamp()`;
- estados `:hover`, `:focus-visible`, `:disabled`, `:invalid`;
- reducción de movimiento y contraste.

Salida esperada: una persona puede reproducir un layout sencillo y explicar por qué utiliza Grid o Flexbox.

## Bloque 3 · JavaScript

**Ejercicios:** 08-11  
**Duración orientativa:** 8-12 horas

Competencias:

- valores, referencias y mutabilidad;
- funciones puras y separación de responsabilidades;
- transformaciones con `map`, `filter`, `find`, `some`, `every` y `reduce`;
- módulos ES;
- errores de dominio y tratamiento de `unknown`;
- promesas, `async/await`, concurrencia y recuperación de errores.

Salida esperada: una persona puede implementar reglas de negocio comprobables sin mezclar lógica con DOM.

## Bloque 4 · DOM y APIs del navegador

**Ejercicios:** 12-15  
**Duración orientativa:** 8-12 horas

Competencias:

- creación segura de nodos y uso de `textContent`;
- eventos, bubbling y delegación;
- formularios nativos, `FormData` y Constraint Validation API;
- `URLSearchParams` e History API;
- persistencia pequeña con `localStorage`;
- sincronización de estado con la interfaz.

Salida esperada: una persona puede construir una interfaz interactiva sin framework y sin listeners repetidos innecesariamente.

## Bloque 5 · HTTP y asincronía aplicada

**Ejercicios:** 16-18  
**Duración orientativa:** 8-12 horas

Competencias:

- contrato HTTP, códigos de estado y serialización JSON;
- estados `idle`, `loading`, `success`, `empty` y `error`;
- CRUD con `GET`, `POST`, `PATCH` y `DELETE`;
- errores de red frente a errores HTTP;
- debounce y cancelación con `AbortController`;
- subida con `FormData`;
- evitar respuestas obsoletas en búsquedas rápidas.

Salida esperada: una persona puede integrar una API sin dejar la UI en estados incoherentes.

## Bloque 6 · TypeScript

**Ejercicios:** 19-21  
**Duración orientativa:** 6-10 horas

Competencias:

- modelado de entidades y DTOs;
- uniones literales y discriminadas;
- narrowing y type guards;
- `unknown` en fronteras externas;
- genéricos con propósito;
- `Partial`, `Pick`, `Omit`, `Readonly` y `Record`;
- exhaustividad con `never`.

Salida esperada: una persona puede tipar el dominio sin recurrir a `any` ni convertir tipos en documentación decorativa.

## Bloque 7 · Proyecto final

**Carpeta:** `capstone/`  
**Duración orientativa:** 12-20 horas

La persona construye un explorador de productos que debe incluir:

- listado remoto paginado;
- búsqueda, filtro y ordenación sincronizados con la URL;
- estados de carga, error y vacío;
- alta, edición y borrado;
- favoritos persistidos en `localStorage`;
- formulario accesible;
- diseño responsive;
- cancelación de búsquedas;
- separación entre acceso a datos, estado y renderizado.

No se evalúa que la implementación siga un único enfoque. Se evalúa que sea correcta, defendible y mantenible.

## Bloque 8 · Revisión y paso a Angular

La evaluación combina:

- comportamiento observable;
- calidad del HTML y CSS;
- claridad del código;
- manejo de errores;
- accesibilidad;
- explicación oral de decisiones.

Consulta:

- [03-competency-matrix.md](03-competency-matrix.md)
- [04-assessment-rubric.md](04-assessment-rubric.md)
- [07-angular-entry-criteria.md](07-angular-entry-criteria.md)

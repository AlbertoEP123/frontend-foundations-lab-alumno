# Rúbrica de evaluación del capstone

Total: 100 puntos. Recomendación de aprobado: **70 puntos**, cumpliendo además todos los mínimos obligatorios.

## 1. HTML y accesibilidad · 15 puntos

- 4: landmarks y jerarquía de encabezados correctos.
- 4: formularios etiquetados, ayudas y errores asociados.
- 3: navegación completa por teclado y foco visible.
- 2: controles con elemento HTML adecuado.
- 2: estados y mensajes anunciables/comprensibles.

**Mínimo obligatorio:** no existen acciones esenciales inaccesibles por teclado.

## 2. CSS y responsive · 15 puntos

- 4: layout estable desde 320 px hasta escritorio.
- 3: uso razonado de Grid/Flexbox.
- 3: cascada y selectores mantenibles.
- 3: estados de interacción y validación visibles.
- 2: respeta `prefers-reduced-motion` cuando aplica.

## 3. JavaScript y diseño del código · 20 puntos

- 5: funciones con responsabilidades claras.
- 4: separación entre API, estado y renderizado.
- 4: transformaciones sin mutaciones accidentales.
- 3: módulos y nombres coherentes.
- 2: no hay duplicación relevante.
- 2: errores conservan contexto útil.

**Mínimo obligatorio:** no se utiliza `innerHTML` con datos procedentes de API o usuario.

## 4. DOM y estado · 15 puntos

- 4: renderizado consistente y sin listeners duplicados.
- 3: delegación de eventos cuando aporta valor.
- 3: filtros sincronizados con URL.
- 3: favoritos persistidos y lectura defensiva de storage.
- 2: foco y diálogo se gestionan correctamente.

## 5. HTTP y asincronía · 20 puntos

- 5: GET, POST, PATCH y DELETE funcionales.
- 4: loading, empty, error y success explícitos.
- 3: distingue error HTTP de red.
- 3: evita respuestas de búsqueda obsoletas.
- 3: reintento o recuperación razonable.
- 2: feedback durante mutaciones.

**Mínimo obligatorio:** un error de API no deja la interfaz bloqueada ni muestra éxito falso.

## 6. TypeScript y contrato · 10 puntos

- 3: entidades y DTOs diferenciados.
- 2: `unknown` en fronteras externas.
- 2: narrowing o parser antes de confiar en datos externos.
- 2: sin `any` injustificado.
- 1: estados imposibles reducidos mediante tipos.

Para una entrega del capstone en JavaScript, esta sección puede evaluarse mediante los ejercicios 19-21.

## 7. Explicación y depuración · 5 puntos

- 2: explica el flujo de una acción de extremo a extremo.
- 2: reproduce y localiza un fallo introducido durante el desarrollo.
- 1: identifica una mejora futura y su coste.

## Fallos que bloquean el paso

Aunque la puntuación supere 70, no se recomienda pasar a Angular si:

- no puede explicar código esencial de su entrega;
- la app solo funciona en el camino feliz;
- utiliza contenido no confiable con `innerHTML`;
- no sabe localizar una petición en Network;
- no comprende por qué una promesa puede completarse después de otra iniciada más tarde;
- depende permanentemente de instrucciones paso a paso.

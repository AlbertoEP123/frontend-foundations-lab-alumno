# Capstone · Product Explorer

## Objetivo

Construir una aplicacion completa sin framework que integre los fundamentos trabajados antes de Angular.

No se evalúa que la implementación siga un único enfoque. Se evalúa que el comportamiento sea correcto, el código sea defendible y la interfaz gestione también los casos no ideales.

## Alcance obligatorio

### Catalogo

- listado remoto desde `GET /api/products`;
- paginacion;
- busqueda por texto;
- filtro por categoria;
- ordenacion;
- filtros sincronizados con query params;
- loading, empty, error y success;
- cancelacion de peticiones obsoletas.

### Mutaciones

- alta mediante `POST /api/products`;
- edicion mediante `PATCH /api/products/:id`;
- borrado mediante `DELETE /api/products/:id`;
- errores de validacion 422 junto a los campos;
- bloqueo de doble envio;
- feedback de exito o error.

### Estado local

- favoritos persistidos en `localStorage`;
- lectura defensiva de storage;
- la preferencia local no debe mezclarse innecesariamente con el contrato de API.

### HTML, CSS y accesibilidad

- landmarks y jerarquia de encabezados;
- formulario etiquetado;
- operacion completa con teclado;
- foco visible;
- dialogo nativo o comportamiento equivalente correcto;
- layout responsive desde 320 px;
- estados comprensibles sin depender solo del color;
- reduccion de movimiento.

### Organizacion

Como minimo, separa:

- acceso HTTP;
- estado y persistencia;
- renderizado o componentes de DOM;
- orquestacion y eventos.

No es necesario crear una arquitectura empresarial. La separacion debe ayudar a comprender y probar, no añadir ceremonias.

## Restricciones

- Sin Angular, React, Vue, jQuery ni librerias de componentes.
- Sin `innerHTML` para datos de API o usuario.
- Sin `any` en los ejercicios TypeScript asociados.
- Sin refrescar la pagina para sincronizar una mutacion.
- Sin ocultar errores mediante `catch {}` vacio.

## Milestones recomendados

1. HTML y layout responsive estatico.
2. GET con loading/error/empty/success.
3. filtros y URL.
4. paginacion y cancelacion.
5. favoritos.
6. alta.
7. edicion y borrado.
8. accesibilidad, casos limite y limpieza.
9. defensa y evaluacion.

## Escenarios de comprobacion

- red lenta: añade `delay=1500` temporalmente;
- error de servidor: añade `status=500`;
- busqueda sin resultados;
- escritura rapida en el buscador;
- alta con nombre corto y precio negativo;
- borrado del ultimo elemento de una pagina;
- storage manualmente corrupto desde DevTools;
- navegacion solo con teclado;
- ancho de 320 px y zoom al 200 %.

## Entrega

Incluye en el Pull Request:

1. resumen funcional;
2. decisiones principales;
3. casos probados;
4. deuda o mejoras pendientes;
5. ayuda de IA o fuentes utilizadas.

La evaluacion se realiza con [la rubrica](../docs/04-assessment-rubric.md).

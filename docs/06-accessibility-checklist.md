# Checklist de accesibilidad

## Estructura

- [ ] Existe un único `main` y un `h1` que describe la página.
- [ ] Los encabezados representan la jerarquía del contenido.
- [ ] Se utilizan `header`, `nav`, `main`, `section`, `article`, `aside` y `footer` cuando corresponden.
- [ ] El idioma del documento está definido.

## Controles

- [ ] Las acciones usan `button`; la navegación usa `a` con `href`.
- [ ] Todo control tiene nombre accesible.
- [ ] El foco visible no se elimina.
- [ ] El orden de tabulación sigue el orden visual y lógico.
- [ ] No se requieren gestos o puntero para acciones esenciales.

## Formularios

- [ ] Cada control tiene `label` asociado.
- [ ] Las ayudas se enlazan con `aria-describedby` cuando aportan contexto.
- [ ] Campos obligatorios y formatos se indican antes del error.
- [ ] Los errores identifican el campo y explican cómo corregirlo.
- [ ] Los grupos relacionados utilizan `fieldset` y `legend`.
- [ ] No se depende únicamente del color.

## Contenido dinámico

- [ ] Loading, error, vacío y éxito son distinguibles.
- [ ] Los mensajes importantes se anuncian de forma razonable (`role="status"` o `aria-live`).
- [ ] Un diálogo mueve el foco al abrirse y lo devuelve al cerrar.
- [ ] El contenido oculto no permanece interactivo.

## Visual

- [ ] El contenido funciona con zoom al 200 %.
- [ ] No aparece scroll horizontal a 320 CSS px salvo contenido que lo requiera.
- [ ] Texto y controles mantienen contraste suficiente.
- [ ] El diseño no depende de orientación o tamaño fijo.
- [ ] Las animaciones respetan `prefers-reduced-motion`.

## Tablas

- [ ] La tabla tiene `caption`.
- [ ] Encabezados usan `th` y `scope`.
- [ ] No se usa una tabla para maquetar.
- [ ] En móvil se conserva la relación entre cabecera y dato.

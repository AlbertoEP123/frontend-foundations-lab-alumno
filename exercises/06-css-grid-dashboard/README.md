# 06 · Dashboard con CSS Grid

**Tiempo orientativo:** 75-90 minutos

## Objetivos

- Construir una composicion bidimensional.
- Usar tracks fluidos y `minmax`.
- Reordenar mediante layout, no mediante DOM artificial.

## Tarea

1. Crea una rejilla principal con cabecera de metricas, panel de actividad y panel lateral.
2. En movil todo debe apilarse en el orden del DOM.
3. A partir de un ancho razonable, la actividad debe ocupar mas espacio que el lateral.
4. Las metricas deben usar `auto-fit` o `auto-fill` con `minmax`.
5. Evita alturas fijas y filas calculadas manualmente.

## Criterios de aceptacion

- [ ] A 320 px existe una sola columna.
- [ ] Las metricas crean tantas columnas como caben.
- [ ] La composicion de escritorio tiene dos columnas desiguales.
- [ ] No se utiliza posicionamiento absoluto.
- [ ] El contenido largo expande su panel.

## Pistas

- Grid es apropiado cuando controlas filas y columnas a la vez.
- Las areas con nombre mejoran legibilidad en layouts pequeños.
- El DOM debe seguir siendo logico sin CSS.

## Comprobacion

Prueba la pagina a 320 px, 768 px y 1280 px. Activa el inspector de estilos para justificar que regla gana y por que.

# 05 · Layout con Flexbox

**Tiempo orientativo:** 60-90 minutos

## Objetivos

- Controlar eje principal y transversal.
- Permitir wrapping sin puntos de ruptura fragiles.
- Distribuir espacio sin anchuras rigidas.

## Tarea

1. Convierte la toolbar en un layout flexible.
2. Permite que los filtros salten de linea antes de desbordarse.
3. Haz que las tarjetas compartan fila y crezcan desde una base razonable.
4. Mantiene las acciones alineadas al final de cada tarjeta aunque las descripciones tengan distinta longitud.
5. Evita alturas fijas.

## Criterios de aceptacion

- [ ] La toolbar no se desborda a 320 px.
- [ ] Las tarjetas ocupan el espacio disponible y hacen wrap.
- [ ] Las acciones quedan al final sin `position: absolute`.
- [ ] Se utiliza `gap` en lugar de margenes compensatorios.
- [ ] El orden visual coincide con el DOM.

## Pistas

- `flex: 1 1 16rem` puede expresar crecimiento, reduccion y base.
- Para empujar una zona dentro de una tarjeta vertical puede servir `margin-block-start: auto`.
- No conviertas todo en Flexbox: solo los grupos que lo necesitan.

## Comprobacion

Prueba la pagina a 320 px, 768 px y 1280 px. Activa el inspector de estilos para justificar que regla gana y por que.

# 04 · Cascada y box model

**Tiempo orientativo:** 60-75 minutos

## Objetivos

- Entender como se calcula el tamaño final de una caja.
- Resolver conflictos de cascada sin `!important`.
- Usar custom properties para decisiones repetidas.

## Tarea

1. Corrige el desbordamiento horizontal de las tarjetas.
2. Elimina la regla excesivamente especifica y sustituye selectores por clases.
3. Haz que el espaciado sea coherente mediante custom properties.
4. Consigue que el aviso herede tipografia pero conserve su color contextual.
5. No cambies el HTML salvo para añadir una clase con significado.

## Criterios de aceptacion

- [ ] No aparece scroll horizontal a 320 px.
- [ ] No se usa `!important`.
- [ ] Todas las cajas usan `border-box`.
- [ ] Los selectores no dependen de una cadena larga de ancestros.
- [ ] El padding no aumenta el ancho declarado.

## Pistas

- Inspecciona `Computed > box model`.
- La especificidad no debe utilizarse como una carrera armamentistica.
- Un reset de `box-sizing` suele incluir pseudoelementos.

## Comprobacion

Prueba la pagina a 320 px, 768 px y 1280 px. Activa el inspector de estilos para justificar que regla gana y por que.

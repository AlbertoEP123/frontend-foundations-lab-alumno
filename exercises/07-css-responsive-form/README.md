# 07 · Responsive y estados de formulario

**Tiempo orientativo:** 75-90 minutos

## Objetivos

- Diseñar mobile-first.
- Usar escalas fluidas sin saltos innecesarios.
- Representar foco, invalidez y deshabilitado.
- Respetar preferencias de movimiento.

## Tarea

1. Parte de una columna y crea dos columnas solo cuando exista espacio.
2. Haz que tipografia y espaciado crezcan con limites mediante `clamp`.
3. Estiliza `:focus-visible`, `:invalid:not(:placeholder-shown)` y `:disabled`.
4. Añade una transicion discreta que desaparezca con `prefers-reduced-motion`.
5. Asegura que el resumen y el formulario no provoquen overflow.

## Criterios de aceptacion

- [ ] Funciona a 320 px sin scroll horizontal.
- [ ] Los labels no se truncan.
- [ ] El foco es claramente visible.
- [ ] Un campo invalido no se comunica solo mediante color.
- [ ] La reduccion de movimiento elimina transiciones no esenciales.

## Pistas

- El media query debe responder al contenido, no a un dispositivo concreto.
- No ocultes el outline sin reemplazo equivalente.
- Puedes usar iconos textuales o mensajes para complementar el color.

## Comprobacion

Prueba la pagina a 320 px, 768 px y 1280 px. Activa el inspector de estilos para justificar que regla gana y por que.

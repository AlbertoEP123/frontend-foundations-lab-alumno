# Diagnostico inicial · 90 minutos

## Proposito

Este ejercicio no se utiliza para aprobar o suspender. Sirve para identificar qué bloques del itinerario necesita realmente cada persona.

Puedes consultar documentación. Puedes utilizar IA si declaras cómo la utilizaste, pero deberás explicar y modificar tu implementación durante la revisión.

## Enunciado

Construye una pequeña página de catálogo que:

1. tenga estructura HTML semántica y un `h1`;
2. cargue productos desde `GET /api/products?limit=10`;
3. represente loading, error, vacío y resultados;
4. permita filtrar por nombre en el navegador;
5. incluya un formulario con nombre, categoría, precio y stock;
6. cree un producto mediante `POST /api/products`;
7. valide el formulario y muestre errores comprensibles;
8. funcione a 320 px y con teclado.

No es obligatorio terminar todo. Se valora el enfoque, el orden de trabajo, el uso de DevTools y la capacidad para explicar lo construido.

## Arranque

```bash
npm install
npm run dev
```

Abre `http://localhost:4173/diagnostic/starter/`.

## Reglas

- Sin framework ni librerías de UI.
- No uses `innerHTML` con datos de API o formulario.
- No recargues la página para actualizar el listado.
- Conserva los errores; no utilices `catch {}` vacío.
- Anota qué no has podido completar.

## Autoevaluación

Puntúa de 0 a 3:

| Área | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| HTML | No estructura | Estructura guiada | Semántica funcional | Semántica y accesibilidad sólidas |
| CSS | No puede maquetar | Requiere guía constante | Responsive funcional | Layout razonado y robusto |
| JavaScript | No descompone | Copia/adapta con ayuda | Funciones claras | Casos límite y separación sólida |
| DOM | No interactúa | Manipulación frágil | Render y eventos funcionales | Seguro, mantenible y accesible |
| HTTP | No completa petición | Camino feliz guiado | Estados y errores básicos | Contrato, errores y recuperación |
| Depuración | No localiza fallos | Sigue instrucciones | Usa consola/Network | Aísla y explica causas |

Utiliza el resultado para abreviar o reforzar bloques; no para asignar una etiqueta global a la persona.

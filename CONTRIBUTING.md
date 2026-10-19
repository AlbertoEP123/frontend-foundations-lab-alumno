# Contribuir al programa formativo

## Cambios de contenido

Toda modificación de un ejercicio debe preservar:

- objetivo de aprendizaje explícito;
- starter incompleto pero ejecutable;
- criterios de aceptación observables;
- criterios de aceptación verificables;
- accesibilidad básica;
- ausencia de dependencias innecesarias.

## Pull Request

Antes de abrirlo:

```bash
npm install
npm run verify
```

Describe:

1. problema formativo que resuelve;
2. competencias afectadas;
3. comportamiento comprobado;
4. impacto en ejercicios y documentación;
5. migración necesaria para participantes en curso.

## Convenciones

- Identificadores de ejercicio: `NN-area-topic`.
- Texto y enunciados: español claro y directo.
- Código: nombres en inglés por coherencia con APIs y ecosistema.
- Sin frameworks en ejercicios salvo que se cree un itinerario separado.
- Las implementaciones pueden variar mientras cumplan los criterios de aceptación.

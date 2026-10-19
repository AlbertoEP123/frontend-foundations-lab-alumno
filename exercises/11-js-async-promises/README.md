# 11 · Promesas y concurrencia

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Distinguir ejecucion secuencial y concurrente.
- Aplicar timeout y cancelacion.
- Reintentar solo operaciones recuperables.

## Tarea

1. Implementa `withTimeout(operation, timeoutMs)` pasando un `AbortSignal` a la operacion.
2. Implementa `retry` con numero maximo de intentos y espera configurable.
3. Implementa `loadDashboard` ejecutando loaders independientes en paralelo.
4. Devuelve datos parciales y errores por clave mediante `Promise.allSettled`.
5. No conviertas una cancelacion en un reintento infinito.

## Criterios de aceptacion

- [ ] El timeout aborta la operacion y limpia el temporizador.
- [ ] El numero de llamadas de retry es predecible.
- [ ] Los loaders arrancan concurrentemente.
- [ ] Un loader fallido no elimina los resultados correctos.
- [ ] Los errores conservan su instancia o mensaje.

## Ejecutar pruebas

```bash
npm run test:exercise -- 11
```

## Pistas

- `Promise.allSettled` preserva el orden de entrada.
- Una funcion `sleep` simplifica el backoff.
- Utiliza `finally` para liberar temporizadores.

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function withTimeout(operation, timeoutMs) {
  const controller = new AbortController();
  let timeoutId;

  const timeout = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      const error = new Error(`Operation timed out after ${timeoutMs} ms.`);
      error.name = 'TimeoutError';
      controller.abort(error);
      reject(error);
    }, timeoutMs);
  });

  try {
    return await Promise.race([
      Promise.resolve().then(() => operation(controller.signal)),
      timeout
    ]);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function retry(operation, { retries = 2, delayMs = 0, shouldRetry = () => true } = {}) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      const cancelled = error?.name === 'AbortError';
      if (cancelled || attempt > retries || !(await shouldRetry(error))) {
        throw error;
      }

      if (delayMs > 0) {
        await sleep(delayMs);
      }
    }
  }
}

export async function loadDashboard(loaders) {
  const entries = Object.entries(loaders);
  const results = await Promise.allSettled(
    entries.map(([, loader]) => Promise.resolve().then(() => loader()))
  );

  const data = [];
  const errors = [];

  results.forEach((result, index) => {
    const [key] = entries[index];
    if (result.status === 'fulfilled') {
      data.push([key, result.value]);
    } else {
      errors.push([key, result.reason]);
    }
  });

  return {
    data: Object.fromEntries(data),
    errors: Object.fromEntries(errors)
  };
}

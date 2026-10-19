export type Parser<T> = (value: unknown) => T;

export interface Page<T> {
  items: T[];
  meta: {
    page: number;
    total: number;
    totalPages: number;
  };
}

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  options: { parser: Parser<T>; init?: RequestInit; fetcher?: typeof fetch }
): Promise<T> {
  const fetcher = options.fetcher ?? fetch;
  const response = await fetcher(input, options.init);
  // TODO: no conviertas JSON a T mediante cast.
  return response.json() as Promise<T>;
}

export function parsePage<T>(itemParser: Parser<T>): Parser<Page<T>> {
  // TODO
  return (value) => value as Page<T>;
}

export type Parser<T> = (value: unknown) => T;

export interface Page<T> {
  readonly items: readonly T[];
  readonly meta: {
    readonly page: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

export class ApiContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiContractError';
  }
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
  
  if (!response.ok) {
    throw new ApiError(response.status, 'La petición no se pudo completar.');
  }
  const value: unknown = await response.json();
  return options.parser(value);
}

export function parsePage<T>(itemParser: Parser<T>): Parser<Page<T>> {
  return (value) => {
    if (!isRecord(value) || !Array.isArray(value.items) || !isRecord(value.meta)) {
      throw new ApiContractError('La respuesta no tiene el formato correcto');
    }

    const { page, total, totalPages } = value.meta;
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(total) ||
      !Number.isInteger(totalPages) ||
      (page as number) < 1 ||
      (total as number) < 0 ||
      (totalPages as number) < 1
    ) {
      throw new ApiContractError('Los metadatos de paginación no son válidos.');
    }

    const pageNumber = page as number;
    const totalNumber = total as number;
    const totalPagesNumber = totalPages as number;

    return {
      items: value.items.map(itemParser),
      meta: { page: pageNumber, total: totalNumber, totalPages: totalPagesNumber }
    };
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

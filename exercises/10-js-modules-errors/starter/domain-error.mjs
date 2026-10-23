export class DomainError extends Error {
  constructor(code, message, options = {}) {
    super(message, { cause: options.cause });
    this.name = 'DomainError';
    this.code = code;
    this.details = options.details;
  }
}
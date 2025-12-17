export class ShowValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShowValidationError';
  }
}

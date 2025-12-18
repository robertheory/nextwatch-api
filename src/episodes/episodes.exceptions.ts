export class EpisodeValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EpisodeValidationError';
  }
}

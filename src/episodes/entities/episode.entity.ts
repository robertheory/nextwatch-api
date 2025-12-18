import { IsDate, IsInt, IsOptional, validateSync } from 'class-validator';
import { EpisodeValidationError } from '../episodes.exceptions';

export class Episode {
  @IsInt()
  @IsOptional()
  private _id?: number;

  @IsInt()
  private _showId: number;

  @IsInt()
  private _episodeId: number;

  @IsDate()
  @IsOptional()
  private _watchedAt: Date | null;

  constructor(data?: Partial<Episode>) {
    if (data) {
      this._id = data.id;

      if (data.showId === undefined || data.showId === null) {
        throw new EpisodeValidationError('showId is a required field.');
      }

      this._showId = data.showId;

      if (data.episodeId === undefined || data.episodeId === null) {
        throw new EpisodeValidationError('episodeId is a required field.');
      }

      this._episodeId = data.episodeId;
      this._watchedAt = data.watchedAt ?? new Date();

      this.validate();
    }
  }

  validate(): void {
    const errors = validateSync(this, { validationError: { target: false } });

    if (errors.length > 0) {
      const [firstError] = errors;

      const [constraintMessage] = Object.values(firstError.constraints ?? {});

      throw new EpisodeValidationError(
        constraintMessage ?? 'Episode validation failed.',
      );
    }
  }

  get id(): number | undefined {
    return this._id;
  }

  get showId(): number {
    return this._showId;
  }

  get episodeId(): number {
    return this._episodeId;
  }

  get watchedAt(): Date | null {
    return this._watchedAt ?? null;
  }

  watch(): void {
    this._watchedAt = new Date();
  }

  unwatch(): void {
    this._watchedAt = null;
  }

  touch(): void {
    this._watchedAt = new Date();
  }
}

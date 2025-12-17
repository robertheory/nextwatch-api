import { IsEnum, IsInt, IsOptional, validateSync } from 'class-validator';
import { ShowStatus as PrismaShowStatus } from '../../../generated/prisma/enums';
import { ShowValidationError } from '../shows.exceptions';

export type ShowsStatus =
  (typeof PrismaShowStatus)[keyof typeof PrismaShowStatus];

export class Show {
  @IsInt()
  @IsOptional()
  private _id?: number;

  @IsInt()
  private _showId: number;

  @IsEnum(PrismaShowStatus)
  private _status: ShowsStatus;

  private _createdAt: Date;

  @IsOptional()
  private _updatedAt?: Date | null;

  constructor(data?: Partial<Show>) {
    if (data) {
      this._id = data.id;

      if (data.showId === undefined || data.showId === null) {
        throw new ShowValidationError('showId is a required field.');
      }

      this._showId = data.showId;
      this._status = data.status ?? PrismaShowStatus.NOT_STARTED;
      this._createdAt = data.createdAt ?? new Date();
      this._updatedAt = data.updatedAt ?? null;

      this.validate();
    }
  }

  validate(): void {
    const errors = validateSync(this, { validationError: { target: false } });

    if (errors.length > 0) {
      const [firstError] = errors;
      const [constraintMessage] = Object.values(firstError.constraints ?? {});
      throw new ShowValidationError(
        constraintMessage ?? 'Show validation failed.',
      );
    }
  }

  get id(): number | undefined {
    return this._id;
  }

  get showId(): number {
    return this._showId;
  }

  get status(): ShowsStatus {
    return this._status;
  }

  updateStatus(value: ShowsStatus): void {
    this._status = value;
    this.touch();
    this.validate();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | null | undefined {
    return this._updatedAt;
  }

  touch(): void {
    this._updatedAt = new Date();
  }
}

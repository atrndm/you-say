import { BaseError } from 'services/errors';

export class TokenExpiredError extends BaseError {
  get statusCode() {
    return 401;
  }
}

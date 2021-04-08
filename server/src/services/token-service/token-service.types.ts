import { BaseError } from 'services/error-handler';

export class TokenExpiredError extends BaseError {
  get statusCode() {
    return 401;
  }
}

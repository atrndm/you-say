/* tslint:disable:max-classes-per-file */

import { VError } from 'verror';

export interface CustomError {
  name: string,
  statusCode: number,
  message: string,
  data?: any,
}

export class RuntimeError extends VError implements CustomError {
  get statusCode() {
    return 500;
  }
}

export class BaseError extends VError implements CustomError {
  get statusCode() {
    return 500;
  }
}

export class DatabaseError extends BaseError {

  get statusCode() {
    return 500;
  }
}

export class ErrorUnknown extends BaseError {
  get statusCode() {
    return 500;
  }
}

export class ErrorUnauthorized extends BaseError {

  get statusCode() {
    return 401;
  }
}

export class ErrorNotFound extends BaseError {
  get statusCode() {
    return 404;
  }
}

export class InputValidationError extends BaseError {
  get statusCode() {
    return 400;
  }
}
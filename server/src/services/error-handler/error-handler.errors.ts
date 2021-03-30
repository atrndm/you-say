/* tslint:disable:max-classes-per-file */

import { VError } from 'verror';
export interface CustomError {
  name: string,
  statusCode: number,
  message: string,
  data?: any,
}


export class DatabaseError extends VError {

  get statusCode() {
    return 500;
  }
}

export class ErrorNotFound extends VError {
  get statusCode() {
    return 404;
  }
}
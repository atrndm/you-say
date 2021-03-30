/* tslint:disable:max-classes-per-file */
export interface CustomError {
  statusCode: number,
  message: string,
  data?: any,
}

export class DatabaseError extends Error implements CustomError {
  statusCode;
  data;

  constructor(msg:string, data?:any) {
    super(msg);

    this.statusCode = 500;
    this.data = data;
  }
}

export class ErrorNotFound extends Error implements CustomError {
  statusCode;
  data;

  constructor(msg:string, data?:any) {
    super(msg);

    this.statusCode = 404;
    this.data = data;
  }
}
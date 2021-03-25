export interface CustomError {
  statusCode: number,
  message: string,
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
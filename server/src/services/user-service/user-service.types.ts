import { FindQueryFilter } from 'src/db/types';
import { IUser } from 'models/user';

export interface IUserFindQuery extends FindQueryFilter {
  guid?: string,
  email?: string,
  lastName?: string,
  firstName?: string,
}

export interface IServiceUser extends IUser {
  id?: string,
}
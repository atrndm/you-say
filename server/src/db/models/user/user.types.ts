import { Document, Model } from 'mongoose';

export interface IUser {
  email: string,
  firstName?: string,
  lastName?: string,
}

export interface IUserDocument extends IUser, Document {

}

export interface IUserModel extends Model<IUserDocument> {

}

import mongoose, { Schema } from 'mongoose';
import { IUserDocument, IUserModel } from './user.types';

const UserSchema = new Schema<IUserDocument>(
	{
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
	}, {
    collection: 'users',
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
export default UserModel;

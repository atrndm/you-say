/**
 * DAL for the User Entity
 */
import User from 'models/user';
import { DatabaseError } from 'services/errors';
import transformFilter from 'src/db/helpers/transform-filter';
import { IUserFindQuery, IServiceUser } from './user-service.types';

export const findUser = async (filter:IUserFindQuery):Promise<IServiceUser> => {
  try {
    const user = await User.findOne(transformFilter(filter));
    return user?.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error fetching user' , { filter });
  }
}

export const createUser = async (payload:IServiceUser):Promise<IServiceUser> => {
  const { email, firstName, lastName } = payload;

  try {
    const user = await User.create({ email, firstName, lastName });
    return user.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error creating user');
  }
}

export const updateUser = async (id:string, payload:IServiceUser):Promise<IServiceUser> => {
  const filter = { _id: id };

  try {
    const user = await User.findOneAndUpdate(filter, payload, {
      new: true
    });
    return user.toJSON();
  } catch (error) {
    throw new DatabaseError(error, 'Error updating user', { filter, payload });
  }
}

export const deleteUser = async (id:string) => {
  const filter = { _id: id };
  try {
    const { deletedCount } = await User.deleteOne(filter);
    return {
      rowsAffected: deletedCount
    }
  } catch (error) {
    throw new DatabaseError(error, 'Error deleting user' , { filter });
  }
}

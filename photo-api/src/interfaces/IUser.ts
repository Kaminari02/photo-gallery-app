import { ObjectId } from 'mongoose';

export interface IUserWithoutPassword {
  password?: string;
  _id: ObjectId;
  username: string;
  token: string;
}

export interface IUser extends IUserWithoutPassword {
  password: string;
}


export interface IUserMethods {
  generateToken: () => void;
  checkPassword: (password: string) => Promise<boolean>;
}
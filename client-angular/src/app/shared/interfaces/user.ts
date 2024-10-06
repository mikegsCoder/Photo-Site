import { IBase } from './base';

export interface IUser extends IBase {
  posts: string[];
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  created_at: string;
}

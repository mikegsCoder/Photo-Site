import { IBase } from './base';
import { IUser } from './user';

export interface IPost extends IBase {
  title: string;
  imageUrl: string;
  keyword: string;
  location: string;
  date: string;
  description: string;
  rating: number;
  author: IUser;
  votes: IUser[];
}

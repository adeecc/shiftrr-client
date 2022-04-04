import IUser from './user';

export default interface IService {
  _id: string;
  seller: IUser;
  name: string;
  description: string;
  image?: string;
  startingPrice: number;
}

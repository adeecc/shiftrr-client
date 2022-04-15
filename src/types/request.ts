import IService from './service';
import IUser from './user';

export const enum requestStatus {
  requested = 'requested',
  accepted = 'accepted',
  completed = 'completed',
}

export default interface IRequest {
  _id: string;
  service: IService;
  buyer: IUser;
  seller: IUser;
  price: number;
  information: string;
  status: requestStatus;
  createdAt: string; // DateTime String
  updatedAt: string; // DateTime String
}

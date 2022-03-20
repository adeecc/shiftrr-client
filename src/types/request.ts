import mongoose, { Document } from 'mongoose';

import IService from './service';
import IUser from './user';

export const enum requestStatus {
  requested = 'requested',
  accepted = 'accepted',
}

export default interface IRequest {
  _id: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  price: number;
  information: string;
  status: requestStatus;
}

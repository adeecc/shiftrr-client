import mongoose, { Document } from 'mongoose';

import IBuyer from './buyer';
import ISeller from './seller';

export const enum userStatus {
  active = 'active',
  banned = 'banned',
}

export const enum userRole {
  admin = 'admin',
  user = 'user',
}

export default interface IUser {
  _id: mongoose.Types.ObjectId;
  profilePicture: string;
  name: string;
  username: string;
  googleId: string;
  email: string;
  contactNumber?: string;
  bio?: string;
  credits: number;
  status: userStatus;
  role: userRole;
  sellerProfile: ISeller;
  buyerProfile: IBuyer;
}

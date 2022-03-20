import mongoose, { Document } from 'mongoose';

export default interface IBuyer {
  _id: mongoose.Types.ObjectId;
  rating: number;
  requested?: mongoose.Types.ObjectId[];
}

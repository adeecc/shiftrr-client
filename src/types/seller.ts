import mongoose from 'mongoose';

export default interface ISeller {
  _id: mongoose.Types.ObjectId;
  services?: mongoose.Types.ObjectId[];
  domain?: string;
  skills?: string[];
  rating: number;
  requests?: mongoose.Types.ObjectId[];
}

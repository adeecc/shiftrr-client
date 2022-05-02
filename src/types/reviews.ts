import IRequest from './request';
import IService from './service';
import IUser from './user';

export interface IReview {
  _id: string;
  request: IRequest;
  service: IService;
  seller: IUser;
  buyer: IUser;
  comment: string;
  rating: number;
  createdAt: string; // DateTime String
  updatedAt: string; // DateTime String
}

export interface IRequestReview extends IReview {}

export interface ISellerReview extends IReview {}

export interface IBuyerReview extends IReview {}

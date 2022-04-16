import IRequest from './request';
import IService from './service';
import IUser from './user';

export interface IRequestReview {
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

export interface ISellerReview {
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

export interface IBuyerReview {
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

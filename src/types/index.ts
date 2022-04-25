import type IRequest from './request';
import type ISeller from './seller';
import type IService from './service';
import type IUser from './user';
import { IRequestReview, ISellerReview, IBuyerReview } from './reviews';
import IPageHit from './pageHits';
import { userStatus, userRole } from './user';

export type { IRequest, ISeller, IService, IUser, IPageHit };
export type { IRequestReview, ISellerReview, IBuyerReview };
export { userStatus, userRole };

export type NavItemType = {
  href: string;
  text: string;
};

export const enum ReviewFor {
  buyer = 'buyer',
  seller = 'seller',
  request = 'request',
}

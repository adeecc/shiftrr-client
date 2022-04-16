import type IRequest from './request';
import type ISeller from './seller';
import type IService from './service';
import type IUser from './user';
import { userStatus, userRole } from './user';

export type { IRequest, ISeller, IService, IUser };
export { userStatus, userRole };

export type NavItemType = {
  href: string;
  text: string;
};

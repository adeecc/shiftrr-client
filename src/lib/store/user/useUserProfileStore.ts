import { IUser } from 'types';
import create from 'zustand';

type State = {
  profile: IUser | null;
  isAdmin: boolean;

  setProfile: (profile: any) => void;
};

export const useUserProfileStore = create<State>((set) => ({
  profile: null,
  isAdmin: false,
  setProfile: (profile: IUser) =>
    set((state) => ({ ...state, profile, isAdmin: profile?.role === 'admin' })),
}));

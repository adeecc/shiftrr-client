import create from 'zustand';

type State = {
  profile: any;
  isAdmin: boolean | null;
  setProfile: (profile: any) => void;
};

export const useProfileStore = create<State>((set) => ({
  profile: null,
  isAdmin: false,
  setProfile: (profile) =>
    set((state) => ({ ...state, profile, isAdmin: profile?.role === 'admin' })),
}));

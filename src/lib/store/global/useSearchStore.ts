import create from 'zustand';
import { IService } from 'types';

type State = {
  services: IService[];
  setServices: (services: any) => void;
};

export const useSearchStore = create<State>((set) => ({
  services: [],
  setServices: (services) => set((state) => ({ ...state, services })),
}));

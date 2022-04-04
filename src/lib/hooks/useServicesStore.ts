import { IService } from '@shiftrr/types/models';
import create from 'zustand';

type State = {
  services: IService[];
  setServices: (services: any) => void;
};

export const useServicesStore = create<State>((set) => ({
  services: [],
  setServices: (services) => set((state) => ({ ...state, services })),
}));

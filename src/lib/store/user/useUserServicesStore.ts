import create from 'zustand';
import { IService } from 'types';
import { client } from 'lib/api/axiosClient';

type State = {
  services: IService[];
  setServices: (services: any) => void;
};

export const useUserServicesStore = create<State>((set) => ({
  services: [],
  setServices: (services) => set((state) => ({ ...state, services })),
}));

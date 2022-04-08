import create from 'zustand';
import { IService } from 'types';
import { client } from 'lib/api/axiosClient';

type State = {
  services: IService[];
  setServices: (services: any) => void;
  populateServices: (_id: string) => Promise<void>;
};

export const useUserServicesStore = create<State>((set, get) => ({
  services: [],
  setServices: (services) => set((state) => ({ ...state, services })),
  populateServices: async (_id: string) => {
    const res: IService[] = await client.get('api/requests');
    const services = res.filter((service) => service.seller._id === _id);

    get().setServices(services);
  },
}));

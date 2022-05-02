import create from 'zustand';
import { IRequest } from 'types';
import { requestStatus } from 'types/request';

type State = {
  requests: IRequest[];
  requested: IRequest[];

  acceptedRequests: IRequest[];
  completedRequests: IRequest[];
  pendingRequests: IRequest[];

  setRequests: (requests: any) => void;
  setRequested: (requested: any) => void;
};

export const useUserRequestsStore = create<State>((set) => ({
  requests: [],
  requested: [],
  acceptedRequests: [],
  completedRequests: [],
  pendingRequests: [],
  setRequests: (requests: IRequest[]) => {
    set((state) => {
      const grouped = requests?.reduce((prev, curr) => {
        const group = curr.status;
        if (!prev[group]) prev[group] = [];
        prev[group].push(curr);

        return prev;
      }, {} as Record<requestStatus, IRequest[]>);

      console.log(grouped, requests);

      return {
        ...state,
        acceptedRequests: grouped[requestStatus.accepted] || [],
        completedRequests: grouped[requestStatus.completed] || [],
        pendingRequests: grouped[requestStatus.requested] || [],
      };
    });
  },

  setRequested: (requested) => set((state) => ({ ...state, requested })),
}));

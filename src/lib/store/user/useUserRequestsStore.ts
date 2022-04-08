import create from 'zustand';
import { IRequest } from 'types';
import { requestStatus } from 'types/request';
import { client } from 'lib/api/axiosClient';

type State = {
  requests: IRequest[];
  requested: IRequest[];

  acceptedRequests: IRequest[];
  completedRequests: IRequest[];
  pendingRequests: IRequest[];

  setRequests: (requests: any) => void;
  setRequested: (requested: any) => void;

  populateRequests: (_id: string) => Promise<void>;
};

export const useUserRequestsStore = create<State>((set, get) => ({
  requests: [],
  requested: [],
  acceptedRequests: [],
  completedRequests: [],
  pendingRequests: [],
  setRequests: (requests: IRequest[]) =>
    set((state) => ({
      ...state,
      requests,
      acceptedRequests: requests.filter(
        (req) => req.status === requestStatus.accepted
      ),
      completedRequests: requests.filter(
        (req) => req.status === requestStatus.completed
      ),
      pendingRequests: requests.filter(
        (req) => req.status === requestStatus.requested
      ),
    })),
  setRequested: (requested) => set((state) => ({ ...state, requested })),
  populateRequests: async (_id: string) => {
    const res: IRequest[] = await client.get('api/requests');

    const requests = res.filter(
      (request) => request.service.seller._id === _id
    );
    const requested = res.filter((request) => request.buyer._id === _id);

    get().setRequests(requests);
    get().setRequested(requested);
  },
}));

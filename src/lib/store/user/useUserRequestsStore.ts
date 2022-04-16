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
      acceptedRequests: requests?.filter(
        (req) => req.status === requestStatus.accepted
      ),
      completedRequests: requests?.filter(
        (req) => req.status === requestStatus.completed
      ),
      pendingRequests: requests?.filter(
        (req) => req.status === requestStatus.requested
      ),
    })),
  setRequested: (requested) => set((state) => ({ ...state, requested })),
  populateRequests: async (_id: string) => {
    const requests: IRequest[] = await client.get(`api/user/${_id}/requests`);
    const requested: IRequest[] = await client.get(`api/user/${_id}/requested`);

    get().setRequests(
      requests?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    );
    get().setRequested(
      requested?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    );
  },
}));

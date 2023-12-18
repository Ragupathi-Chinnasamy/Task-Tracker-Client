import {
  BaseStoreState,
  IssueRes,
  IssueStatusRes,
  IssueTypeRes,
} from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { create } from "zustand";

interface IssueStoreInitialState {
  projectId: number;
  typeId: number;
  statusId: number;
  assigneeId: number;
}

interface IssueStoreState
  extends BaseStoreState<IssueRes>,
    IssueStoreInitialState {
  setProjectId: (projectId: number) => void;
  setTaskTypeId: (typeId: number) => void;
  setTaskStatusId: (statusId: number) => void;
  setAssigneeId: (assigneeId: number) => void;
  resetState: () => void;
}

interface IssueTypeStore extends BaseStoreState<IssueTypeRes> {}
interface IssueStatusStore extends BaseStoreState<IssueStatusRes> {}

const initialState: IssueStoreInitialState = {
  projectId: 0,
  typeId: 0,
  statusId: 0,
  assigneeId: 0,
};

export const useIssueStore = create<IssueStoreState>((set) => ({
  ...initialState,
  isLoading: false,
  data: { from: 0, to: 0, total: 0, totalPages: 0, data: [] },
  page: 1,
  search: "",
  setPage: (page) => set({ page }),
  setSearch(search) {
    set({ search });
  },
  setProjectId: (projectId: number) => set({ projectId }),
  setTaskTypeId: (typeId: number) => set({ typeId }),
  setTaskStatusId: (statusId: number) => set({ statusId }),
  setAssigneeId: (assigneeId: number) => set({ assigneeId }),
  async fetchData() {
    set({ isLoading: true });
    const { page, search, projectId, statusId, typeId, assigneeId } =
      useIssueStore.getState();
    const response = await apiProvider.fetchTaskData({
      page,
      search,
      projectId,
      statusId,
      typeId,
      assigneeId,
    });
    if (response?.isSuccess) {
      set({ data: response.data ?? [] });
    }
    set({ isLoading: false });
  },
  resetState: () => set({ ...initialState, page: 1, search: "" }),
}));

export const useIssueTypeStore = create<IssueTypeStore>((set) => ({
  isLoading: false,
  data: { from: 0, to: 0, total: 0, totalPages: 0, data: [] },
  page: 0,
  search: "",
  setPage: (page) => set({ page }),
  setSearch(search) {
    set({ search });
  },
  async fetchData() {
    set({ isLoading: true });
    const { page, search } = useIssueTypeStore.getState();
    const response = await apiProvider.fetchTaskTypeData({ page, search });
    if (response?.isSuccess) {
      set({ data: response.data ?? [] });
    }
    set({ isLoading: false });
  },
}));

export const useIssueStatusStore = create<IssueStatusStore>((set) => ({
  isLoading: false,
  data: { from: 0, to: 0, total: 0, totalPages: 0, data: [] },
  page: 0,
  search: "",
  setPage: (page) => set({ page }),
  setSearch(search) {
    set({ search });
  },
  async fetchData() {
    set({ isLoading: true });
    const { page, search } = useIssueTypeStore.getState();
    const response = await apiProvider.fetchTaskStatusData({ page, search });
    if (response?.isSuccess) {
      set({ data: response.data ?? [] });
    }
    set({ isLoading: false });
  },
}));

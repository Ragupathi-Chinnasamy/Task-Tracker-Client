import {
  BaseStoreState,
  TaskRes,
  TaskStatusRes,
  TaskTypeRes,
} from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { create } from "zustand";

interface TaskStoreInitialState {
  projectId: number;
  typeId: number;
  statusId: number;
  assigneeId: number;
}

interface TaskStoreState
  extends BaseStoreState<TaskRes>,
    TaskStoreInitialState {
  setProjectId: (projectId: number) => void;
  setTaskTypeId: (typeId: number) => void;
  setTaskStatusId: (statusId: number) => void;
  setAssigneeId: (assigneeId: number) => void;
  resetState: () => void;
}

interface TaskTypeStore extends BaseStoreState<TaskTypeRes> {}
interface TaskStatusStore extends BaseStoreState<TaskStatusRes> {}

const initialState: TaskStoreInitialState = {
  projectId: 0,
  typeId: 0,
  statusId: 0,
  assigneeId: 0,
};

export const useTaskStore = create<TaskStoreState>((set) => ({
  ...initialState,
  isLoading: false,
  data: { from: 0, to: 0, total: 0, totalPages: 0, data: [] },
  page: 0,
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
      useTaskStore.getState();
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

export const useTaskTypeStore = create<TaskTypeStore>((set) => ({
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
    const { page, search } = useTaskTypeStore.getState();
    const response = await apiProvider.fetchTaskTypeData({ page, search });
    if (response?.isSuccess) {
      set({ data: response.data ?? [] });
    }
    set({ isLoading: false });
  },
}));

export const useTaskStatusStore = create<TaskStatusStore>((set) => ({
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
    const { page, search } = useTaskTypeStore.getState();
    const response = await apiProvider.fetchTaskStatusData({ page, search });
    if (response?.isSuccess) {
      set({ data: response.data ?? [] });
    }
    set({ isLoading: false });
  },
}));

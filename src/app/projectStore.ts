import { BaseStoreState, ProjectRes } from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { create } from "zustand";

interface ProjectStoreState extends BaseStoreState<ProjectRes> {}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  isLoading: false,
  data: { from: 0, to: 0, total: 0, totalPages: 0, data: [] },
  page: 1,
  search: "",
  setPage: (page) => set({ page }),
  setSearch(search) {
    set({ search, page: 1 });
  },
  async fetchData() {
    set({ isLoading: true });
    const { page, search } = useProjectStore.getState();
    const response = await apiProvider.fetchProjectData({
      page,
      search,
    });
    if (response?.isSuccess) {
      set({ data: response.data ?? [] });
    }
    set({ isLoading: false });
  },
}));

import { BaseStoreState, RoleRes } from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { create } from "zustand";

interface RoleStoreState extends BaseStoreState<RoleRes> {}

export const useRoleStore = create<RoleStoreState>((set) => ({
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
    const { page, search } = useRoleStore.getState();
    const response = await apiProvider.fetchRoleData({ page, search });
    if (response?.isSuccess) {
      set({ data: response.data ?? [] });
    }
    set({ isLoading: false });
  },
}));

import { BaseStoreState, UserRes } from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { create } from "zustand";

interface UserStoreState extends BaseStoreState<UserRes> {}

export const useUserStore = create<UserStoreState>((set) => ({
  isLoading: false,
  data: { from: 0, to: 0, total: 0, totalPages: 0, data: [] },
  page: 1,
  search: "",
  setPage: (page) => set({ page }),
  setSearch(search) {
    set({ search });
  },
  async fetchData() {
    set({ isLoading: true });
    const { page, search } = useUserStore.getState();
    const response = await apiProvider.fetchUserData({ page, search });
    if (response?.isSuccess) {
      set({ data: response.data ?? [] });
    }
    set({ isLoading: false });
  },
}));

export interface Generic<T> {
  from: number;
  to: number;
  total: number;
  totalPages: number;
  data: T[];
}

export interface GetReq {
  page: number;
  search: string;
}

export type createdOrModifiedUser = {
  id: number;
  firstName: string;
  lastName: string;
};

export interface BaseStoreState<T> {
  isLoading: boolean;
  data: Generic<T>;
  fetchData: () => void;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
}

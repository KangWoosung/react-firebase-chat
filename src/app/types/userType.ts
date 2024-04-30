export type UserType = {
  id?: string;
  userName: string;
  email: string;
  avatar?: string;
  blocked: string[];
};

export type UseUserStoreType = {
  currentUser?: UserType;
  isLoading: boolean;
  fetchUserInfo: (uid: string) => void;
  zustandFetchUserInfo?: (uid: string | undefined | null) => void;
};


export interface AuthContextProps {
  login: () => void;
  changeUser: (user: string) => void;
  user?: string;
  provided: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

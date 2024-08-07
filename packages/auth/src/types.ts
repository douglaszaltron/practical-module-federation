
export interface AuthContextProps {
  login: () => void;
  user?: string;
  provided: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

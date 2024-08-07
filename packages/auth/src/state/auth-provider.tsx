import { useCallback, useMemo, useContext } from "react";
import type { AuthProviderProps } from "../types";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: AuthProviderProps) {
  const { provided } = useContext(AuthContext);

  if (provided) return children;

  const login = useCallback((): {} => {
    console.log('User');
    return {};
  }, []);

  const contextValue = useMemo(() => {
    return { login, provided: true, user: '' }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

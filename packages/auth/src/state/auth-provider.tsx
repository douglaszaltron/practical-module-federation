import { useCallback, useMemo, useContext, useReducer } from "react";
import type { AuthProviderProps } from "../types";
import { AuthContext } from "./auth-context";
import { initialState, reducer } from "./auth-reducer";

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provided } = useContext(AuthContext);

  if (provided) return children;

  const login = useCallback((): {} => {
    dispatch({ type: 'SET_USER', user: 'Owner' });
    return {};
  }, []);

  const changeUser = useCallback((user: string): {} => {
    dispatch({ type: 'SET_USER', user });
    return {};
  }, []);

  const contextValue = useMemo(() => {
    return { ...state, login, changeUser, provided: true }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

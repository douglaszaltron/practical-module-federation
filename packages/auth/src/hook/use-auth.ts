import { useContext } from "react";
import { AuthContext } from "../state/auth-context";
import type { AuthContextProps } from "../types";

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Failed to create client");
  }

  return context;
};

import { createContext } from "react";
import type { AuthContextProps } from "../types";

export const AuthContext = createContext<AuthContextProps>({
	login: () => {},
	changeUser: (user: string) => {},
	user: undefined,
	provided: false,
});

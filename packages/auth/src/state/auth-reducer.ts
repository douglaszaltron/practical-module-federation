export const initialState = {
  user: '',
}

export interface AuthState {
  user?: string;
}

export type AuthAction =
  | { type: "GET_USER"; user: string }
  | { type: "SET_USER"; user: string }
  | { type: "LOGOUT" };

export const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
      };
    case "SET_USER":
      return {
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

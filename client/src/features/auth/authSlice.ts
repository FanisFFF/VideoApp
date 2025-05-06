// features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: any | null;
  status: "idle"|"loading"|"succeeded"|"failed";
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload }: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

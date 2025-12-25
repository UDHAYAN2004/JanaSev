import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define types for your user and state
interface User {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  phone?: string;
  state?: string;
  role?: string;
}

interface AppUserState {
  token: string;
  user: User | null;
  message: string | null;
}

// Initial state
const initialState: AppUserState = {
  token: "",
  user: null,
  message: null,
};

export const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    setAppUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.message = action.payload.message;
    },
  },
});

export const { setAppUser, setMessage } = appUserSlice.actions;
export default appUserSlice.reducer;

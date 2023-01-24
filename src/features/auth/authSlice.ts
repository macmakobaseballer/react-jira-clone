import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {
  AUTH_STATE,
  CRED,
  LOGIN_USER,
  POST_PROFILE,
  PROFILE,
  JWT,
  USER,
} from "../types";

const initialState: AUTH_STATE = {
  isLoginView: true,
  loginUser: {
    id: 0,
    username: "",
  },
  profiles: [{ id: 0, user_profile: 0, img: null }],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const {} = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;

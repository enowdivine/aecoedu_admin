import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = `https://aecoedu-59e5eed6446e.herokuapp.com/api/v1`;

const initialState = {};

export const userSignup = createAsyncThunk(
  "auth/userSignup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogin = createAsyncThunk("auth/userLogin", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${base_url}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;

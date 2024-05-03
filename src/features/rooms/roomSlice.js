import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRoomContent = createAsyncThunk("leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewRoom: (state, action) => {
      let { newRoomObj } = action.payload;
      state.rooms = [...state.rooms, newRoomObj];
    },

    deleteRoom: (state, action) => {
      let { index } = action.payload;
      state.rooms.splice(index, 1);
    },
  },

  extraReducers: {
    [getRoomContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getRoomContent.fulfilled]: (state, action) => {
      state.rooms = action.payload.data;
      state.isLoading = false;
    },
    [getRoomContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewRoom, deleteRoom } = roomSlice.actions;

export default roomSlice.reducer;

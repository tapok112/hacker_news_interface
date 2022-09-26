import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "api/api";
import { StateData } from "types/interfaces";

export const getNewsIds = createAsyncThunk(
  'news/getNewsIds',
  async () => {
    const response = await api.news();
    return response.data
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsIds: [],
    status: null,
    error: null
  } as StateData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsIds.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getNewsIds.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.newsIds = action.payload;
      });
  },
})

export default newsSlice.reducer;

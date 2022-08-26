/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const fetchData = createAsyncThunk(
  'chat/fetchData',
  async (options = {}) => {
    const response = await axios.get(routes.dataPath(), options);
    console.log('RESPONSE DATA', response.data);
    // const { channels, currentChannelId, messages } = data;
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: (state, action) => {
      if (state.currentChannelId === action.payload) {
        // eslint-disable-next-line no-undef
        state.currentChannelId = state.defaultChannelId;
      }
      channelsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export default channelsSlice.reducer;

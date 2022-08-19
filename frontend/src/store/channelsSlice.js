/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

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
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: (state, action) => {
      if (state.currentChannelId === action.payload) {
        // eslint-disable-next-line no-undef
        state.currentChannelId = state.defaultChannel;
      }
      channelsAdapter.removeOne(state, action.payload);
    },
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export default channelsSlice.reducer;

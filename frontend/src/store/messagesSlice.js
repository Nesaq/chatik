import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as actionChannels, fetchData } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        console.log(payload);
        messagesAdapter.addMany(state, payload.messages);
      })
      .addCase(actionChannels.removeChannel, (state, action) => {
        console.log('action Remove Channel', action);
        // console.log('STATE REMOVE CHANNEL', state);
        // console.log(action.payload);
        const removeId = action.payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== removeId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
export default messagesSlice.reducer;

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as actionChannels } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionChannels.removeChannel, (state, action) => {
        // console.log('action Remove Channe', action);
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

import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalReducer from './modalsSlice.js';

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    modalReducer,
  },
});

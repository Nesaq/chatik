/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelProps: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      console.log('payload', payload);
      state.type = payload.type;
      state.channelProps = payload.channelProps;
    },
    closeModal: (state) => {
      state.type = null;
      state.channelProps = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

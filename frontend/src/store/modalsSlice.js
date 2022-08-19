/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  item: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      console.log('payload', payload);
      state.type = payload.type;
      state.item = payload.item;
    },
    closeModal: (state) => {
      state.type = null;
      state.item = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

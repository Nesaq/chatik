/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelProps: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelProps = payload.channelProps;
      state.show = payload.show;
    },
    closeModal: (state) => {
      state.type = null;
      state.channelProps = null;
      state.show = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const getModalInfo = (state) => state.modalsReducer.type;

export const getModalProps = (state) => state.modalsReducer.channelProps;

export const getModalStatus = (state) => state.modalsReducer.show;

export default modalSlice.reducer;

import { selectors as channelsSelectors } from './channelsSlice.js';
import { selectors as messagesSelectors } from './messagesSlice.js';

export const getChannels = (state) => channelsSelectors.selectAll(state);

export const getAllMessages = (state) => messagesSelectors.selectAll(state);

export const getCurrentChannelId = (state) => state.channelsReducer.currentChannelId;

export const getModalInfo = (state) => state.modalsReducer.type;

export const getModalProps = (state) => state.modalsReducer.channelProps; // REMOVE MODAL

export const getModalStatus = (state) => state.modalsReducer.show;

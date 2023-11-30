import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: null
  },
  reducers: {
    showModal(state, action) {
      state.modal = action.payload
    },
    hideModal(state) {
      state.modal = null
    },
  },
})

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
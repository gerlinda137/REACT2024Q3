import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckboxState {
  selectedItems: string[];
}

const initialState: CheckboxState = {
  selectedItems: []
};

const checkboxSlice = createSlice({
  name: 'checkboxes',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<string>) {
      const index = state.selectedItems.indexOf(action.payload);
      if (index === -1) {
        state.selectedItems.push(action.payload);
      } else {
        state.selectedItems.splice(index, 1);
      }
    },
    unselectAll(state) {
      state.selectedItems = [];
    }
  }
});

export const { toggleItem, unselectAll } = checkboxSlice.actions;

export default checkboxSlice.reducer;

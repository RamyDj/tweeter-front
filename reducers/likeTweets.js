import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addHeart: (state, action) => { 
      state.value.push(action.payload)
    },
    removeHeart: (state) => {
      state.value = state.value.filter((e) => e.id !== action.payload.id)
    },
  },
});

export const { addHeart, removeHeart } = userSlice.actions;
export default userSlice.reducer;
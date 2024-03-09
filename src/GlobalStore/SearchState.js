import { createSlice } from '@reduxjs/toolkit'

export const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    value: "",
  },
  reducers: {
    update: (state, newState) => {
        state.value = newState.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { update } = SearchSlice.actions

export default SearchSlice.reducer
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  search: null,

};

const storybankSlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      const { search } = action.payload;
      console.log('Dispatching setSearch with:', search);
      state.search = search;
      
    },

  
  },
});

export const { setSearch } = storybankSlice.actions;

export default storybankSlice.reducer;

export const useCurrentSearchText = (state) => state.story?.search;


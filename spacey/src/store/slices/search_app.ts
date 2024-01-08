import { createSlice } from '@reduxjs/toolkit';

const searchAppSlice = createSlice({
    name: 'search_app',
    initialState: {
      searchName: '',
      selectedStatus: '',
      startDateTime: '',
      endDateTime: '',
    },
    reducers: {
      setName: (state, action) => {
        state.searchName = action.payload;
      },
      setStatus: (state, action) =>{
        state.selectedStatus = action.payload;
      },
      setDate: (state, action) =>{
        state.startDateTime = action.payload;
      },
      setDateEnd: (state, action) =>{
        state.endDateTime = action.payload;
      },
    },
  });

  export const {setDate,setDateEnd,setName,setStatus} = searchAppSlice.actions
  export default searchAppSlice.reducer
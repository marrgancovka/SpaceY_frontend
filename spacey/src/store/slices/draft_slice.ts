import { createSlice } from '@reduxjs/toolkit';

const draftSlice = createSlice({
    name: 'draft',
    initialState:{
        app: false,
        appId: 0,
    },
    reducers: {
      appSet: (state, action) => {
        state.app = action.payload.app
        state.appId = action.payload.appId
        console.log("appset", action.payload.app, action.payload.appId)
      }
    },
  });

  export const {appSet} = draftSlice.actions
  export default draftSlice.reducer
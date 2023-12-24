import {configureStore} from '@reduxjs/toolkit'
import searchReducer from './slices/search_slice'
import authReducer from './slices/auth_slices'
import draftReducer from './slices/draft_slice'

export const store =  configureStore({
    reducer:{
        search: searchReducer,
        auth: authReducer,
        draft: draftReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
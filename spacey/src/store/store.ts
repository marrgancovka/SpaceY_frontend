import {configureStore} from '@reduxjs/toolkit'
import searchReducer from './slices/search_slice'
import authReducer from './slices/auth_slices'
import draftReducer from './slices/draft_slice'
import search_app from './slices/search_app'

export const store =  configureStore({
    reducer:{
        search: searchReducer,
        auth: authReducer,
        draft: draftReducer,
        sears_app: search_app
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
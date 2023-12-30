import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/index'
import postReducer from './post/index'

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
})
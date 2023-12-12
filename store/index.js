import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/index'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})
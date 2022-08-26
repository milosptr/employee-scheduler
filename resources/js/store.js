import { configureStore } from '@reduxjs/toolkit'
import general from './store/general'

export default configureStore({
  reducer: {
    general,
  },
})

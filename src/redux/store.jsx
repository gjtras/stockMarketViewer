import { configureStore } from '@reduxjs/toolkit'
import { rootreducer } from './reducer/index'; 



export const store = configureStore({ reducer: rootreducer });


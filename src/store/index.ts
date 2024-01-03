import { configureStore } from '@reduxjs/toolkit';
import * as rootReducer from './rootReducer';

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

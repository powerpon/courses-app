import { combineReducers } from '@reduxjs/toolkit';
import authorsReducer from './authors/slice';
import coursesReducer from './courses/slice';
import userReducer from './user/slice';

export default combineReducers({
	authorsReducer: authorsReducer,
	coursesReducer: coursesReducer,
	userReducer: userReducer,
});

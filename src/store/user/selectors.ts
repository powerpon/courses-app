import { RootState } from '..';

export const getUserSelector = (state: RootState) => state.default.userReducer;

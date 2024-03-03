import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TokenState {
    token: string;
}

const initialState: TokenState = {
    token: '',
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        saveToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { saveToken } = tokenSlice.actions;
export const tokenSelector = (state: RootState) => state.tokenReducer;

export default tokenSlice.reducer;

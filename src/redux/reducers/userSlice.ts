import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@redux/configure-store';
import { ValuesSignupForm } from '@tstypes/types';

type UserState = {
    user: {
        email: string;
        password: string;
    };
}

const initialState: UserState = {
    user: {
        email: '',
        password: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<ValuesSignupForm>) => {
            state.user = action.payload;
        },
    },
});

export const { increment } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer

export default userSlice.reducer;

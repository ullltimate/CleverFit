import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IValuesSignupForm } from "@tstypes/types";

interface UserState {
    user: IValuesSignupForm;
}

const initialState: UserState = {
    user: {
        email: "",
        password: "",
        repeatPassword: ""
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<IValuesSignupForm>) => {
            state.user = action.payload
        },
    },
})

export const { increment } = userSlice.actions

export default userSlice.reducer;
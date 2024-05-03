import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrainingPals } from '@services/catalogs';


type InitialState = {
    partners: TrainingPals[]
};

const initialState: InitialState = {
    partners: []
};

export const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        setPartners: (state, action: PayloadAction<TrainingPals[]>) => {
            state.partners = action.payload;
        },
        removePartner: (state, action: PayloadAction<string>) => {
            state.partners = state.partners.filter((e) => e.id !== action.payload);
        },
    },
});

export const {setPartners, removePartner} = partnersSlice.actions;
export const partnersSelector = (state: RootState) => state.partnersReducer;

export const partnersReducer = partnersSlice.reducer;

import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Exercise = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
    _id?: string;
}

const initialExercise: Exercise = {
    name: '',
    replays: 3,
    weight: 0,
    approaches: 1,
};

type InitialState = {
    date: string,
    name: string,
    exercises: Exercise[],
}

const initialState: InitialState = {
    date: '',
    name: '',
    exercises: [initialExercise]
}


export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        saveTrainingDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        saveTrainingName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        addExercises: (state) => {
            state.exercises.push(initialExercise)
        },
        setExercises: (state, action: PayloadAction<Exercise[]>) => {
            state.exercises = action.payload;
        },
        resetExercises: (state) => {
            state.exercises = [];
        },
    },
});

export const { addExercises, saveTrainingDate, saveTrainingName, setExercises, resetExercises } = trainingSlice.actions;
export const trainingSelector = (state: RootState) => state.trainingReducer;

export default trainingSlice.reducer;

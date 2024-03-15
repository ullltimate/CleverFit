import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Exercise = {
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
    id?: string,
}

const initialState: InitialState = {
    date: '',
    name: '',
    exercises: [initialExercise],
    id: '',
}


export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        saveTrainingId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
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
        editExercises: (state, { payload: exercise }: PayloadAction<Partial<Exercise> & { index: number }>) => {
            state.exercises[exercise.index] = {
                ...state.exercises[exercise.index],
                ...exercise,
            }
        },
        removeExercises: (state, action: PayloadAction<number[]>) => {
            state.exercises = state.exercises.filter((_, index) => !action.payload.includes(index))
        },
    },
});

export const { addExercises, saveTrainingDate, saveTrainingName, setExercises, resetExercises, editExercises, removeExercises, saveTrainingId } = trainingSlice.actions;
export const trainingSelector = (state: RootState) => state.trainingReducer;

export default trainingSlice.reducer;

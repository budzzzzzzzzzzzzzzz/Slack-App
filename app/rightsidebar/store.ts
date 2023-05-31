'use client';

import {configureStore, createSlice} from '@reduxjs/toolkit'

const initialState = {value: {nameTeam: "", profileName: "", emailAdd: ""}}
const teamNameSlice = createSlice({
    name: "team",
    initialState: initialState,
    reducers: {
        inputName: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const {inputName} = teamNameSlice.actions;

export const store = configureStore({
    reducer: {
        teamName: teamNameSlice.reducer,
    }
});

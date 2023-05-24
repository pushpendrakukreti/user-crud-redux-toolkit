import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        status: STATUSES.IDLE
    },
    reducers: {
        setUsers(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
})

export const { setUsers, setStatus } = userSlice.actions;
export const getUserArr = (state) =>{
    return state.user.data
}
export default userSlice.reducer;
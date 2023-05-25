import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../components/Enums";

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
export const getStatusArr = (state) =>{
    return state.user.status
}
export default userSlice.reducer;
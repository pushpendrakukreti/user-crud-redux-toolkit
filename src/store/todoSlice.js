import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../components/Enums";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        data: [],
        status: STATUSES.IDLE
    },
    reducers: {
        setTodo(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
})

export const { setTodo, setStatus } = todoSlice.actions;
export const getTodoArr = (state) =>{
    return state.todo.data
}
export const getStatusArr = (state) =>{
    return state.todo.status
}
export default todoSlice.reducer;
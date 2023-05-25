import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./userSlice";

const albumSlice = createSlice({
    name: 'albums',
    initialState: {
        data: [],
        status: STATUSES.IDLE
    },
    reducers: {
        setAlbums(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
})

export const { setAlbums, setStatus } = albumSlice.actions;
export const getAlbumArr = (state) =>{
    return state.albums.data
}
export default albumSlice.reducer;
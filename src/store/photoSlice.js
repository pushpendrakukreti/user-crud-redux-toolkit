import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../components/Enums";

const photoSlice = createSlice({
    name: 'photos',
    initialState: {
        data: [],
        status: STATUSES.IDLE
    },
    reducers: {
        setPhotos(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
})

export const { setPhotos, setStatus } = photoSlice.actions;
export const getPhotoArr = (state) =>{
    return state.photos.data
}
export const getStatusArr = (state) =>{
    return state.photos.status
}
export default photoSlice.reducer;
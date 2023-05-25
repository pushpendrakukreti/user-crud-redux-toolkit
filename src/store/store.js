import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import todoReducer from './todoSlice';
import photoReducer from './photoSlice';
import albumReducer from './albumSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        todo: todoReducer,
        photos: photoReducer,
        albums: albumReducer
    }
})

export default store
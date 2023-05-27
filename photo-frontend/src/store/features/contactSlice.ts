import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPhoto } from "@/interfaces/IPhoto";

interface State {
    contact: IPhoto
}


const initialState: State = {
    contact: {
        title: '',
        image: '',
        author: {
            username: '',
            _id: ''
        },
        _id: ''
    }
}

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotoData: (state, action) => {
            state.contact = action.payload
        },
        initPhotoState: (state) => {
            state.contact = initialState.contact
        }
    },
});
export const { setPhotoData, initPhotoState } = photoSlice.actions;
export default photoSlice.reducer;
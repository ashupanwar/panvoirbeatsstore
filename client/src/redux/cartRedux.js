import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        tracks: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addTrack: (state, action) => {
            state.quantity += 1;
            state.tracks.push(action.payload.track);
            //To round to 2 decimal places
            state.total = Math.round((state.total + action.payload.price) * 100) / 100
        },
        deleteTrack: (state, action) => {
            state.quantity -= 1;
            state.tracks = action.payload.tracks;
            state.total = Math.round((state.total - action.payload.price) * 100) / 100
        },
        restoreCart: (state, action) => {
            state.quantity = action.payload.quantity;
            state.tracks = action.payload.tracks;
            state.total = action.payload.total;
        },
        dropCart: (state) => {
            state.quantity = 0;
            state.tracks = [];
            state.total = 0;
        }
    }
});

export const { addTrack, deleteTrack, restoreCart, dropCart } = cartSlice.actions;
export default cartSlice.reducer;
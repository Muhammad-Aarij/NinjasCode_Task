import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state = initialState, action) => {
            console.log(action.payload);
            
            const itemIndex = state.findIndex(
                (item) => item.name === action.payload.name
            );
            if (itemIndex !== -1) {
                state[itemIndex].qty = action.payload.qty;
            } else {
                state.push(action.payload);
            }
        },
        removeFromCart: (state = initialState, action) => {
            return state.filter(item => {
                return item?.name !== action.payload?.name;
            })
        },
        emptyCart: (state = initialState, action) => {
            return []
        }
    }
})

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer
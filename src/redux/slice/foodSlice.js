import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import fruits from '../../json/FruitDb';
// export const fetchFoods = createAsyncThunk(
//     'foods',
//     async () => {
//         try {
//             const response = await axios.get('http://192.168.30.165:3001/foods');
//             return response.data;
//         } catch (error) {
//             console.error("Fetch error:", error);
//             throw error;
//         }
//     }
// );

export const fetchFoods = createAsyncThunk(
    'foods',
    async () => {
        try {
            return items.foods;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    }
);

const foodSlice = createSlice({
    name: 'foods',
    initialState: {
        fruits: [],
        vegetables: [],
        popular: [],
        recommendations: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFoods.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFoods.fulfilled, (state, action) => {
                const { fruits = [], vegetables = [], popularFoods = [], recommendations = [] } = action.payload;
                state.isLoading = false;
                state.fruits = fruits;
                state.vegetables = vegetables;
                state.popular = popularFoods;
                state.recommendations = recommendations;
            })
            .addCase(fetchFoods.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default foodSlice.reducer;

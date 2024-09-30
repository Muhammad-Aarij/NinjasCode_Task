import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/AuthSlice';
import foodReducer from '../slice/foodSlice';
import cartReducer from '../slice/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    foods: foodReducer,
    cart: cartReducer,
  },
});

export default store;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from "../slice/auth/onboard"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sliderReducer from "../slice/banner"
import productReducer from "../slice/product"
// import cartReducer from "../slice/cart/cartSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    slider: sliderReducer,
    product: productReducer,
    // cart: cartReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']

};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
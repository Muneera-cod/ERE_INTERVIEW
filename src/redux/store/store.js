import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../reducers/Api/userApi';

export const store = configureStore({
    reducer: {
        userApi : userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
});
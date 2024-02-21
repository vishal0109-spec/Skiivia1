import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { loginReducer } from './Reducer/loginReducer';
import appReducer from './Reducer';


const middlewares = [thunk];
export const store = configureStore({
    reducer: appReducer,
    middleware: thunk,
});
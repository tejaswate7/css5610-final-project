import {applyMiddleware, compose, configureStore, createStore} from "@reduxjs/toolkit";
import {rootReducer} from "./root-reducer";
import {logger} from "redux-logger/src";

// export const store = configureStore(
//     {reducer: rootReducer,
//                 middleware: getDefaultMiddleware =>
//             getDefaultMiddleware({
//                 serializableCheck: false,
//             })});

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
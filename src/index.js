import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import cocktailReducer from "./reducers/cocktail-reducer";
import userReducer from "./store/user/user.reducer";
// import { store } from './store/store';
import { firebaseApp } from "./utils/firebase/firebase.utils";
import restaurantReducer from "./store/restaurants/restaurant.reducer";


const store = configureStore(
    {reducer: {cocktail: cocktailReducer, user: userReducer, restaurant: restaurantReducer}, middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }), enhancers:[]});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import Home from './routes/Home/home.component'
import { Routes, Route } from 'react-router-dom'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import Navigation from "./routes/Navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Profile from "./routes/Profile/profile.component";
import Review from "./routes/reviews/review.component";
import Search from "./routes/search/search.component";
import cocktailReducer from "./reducers/cocktail-reducer";
import CocktailComponent from "./routes/cocktail/cocktail.component";

const store = configureStore({
    reducer: {
        cocktail: cocktailReducer
    }
})

const App = () => {
  return (
      <Provider store={store}>
      <Routes>
          <Route path='/' element = {<Navigation />}>
              <Route index element={<Home />}/>
              <Route path='shop' element={<Shop />}/>
              <Route path='profile' element={<Profile/>}/>
              <Route path='review' element={<Review/>}/>
              <Route path='search' element={<Search/>}/>
              <Route path={'/auth'} element={<Authentication />}/>
              <Route path="cocktail/:id" element={<CocktailComponent/>}/>
          </Route>
      </Routes>
      </Provider>
  );
}

export default App;

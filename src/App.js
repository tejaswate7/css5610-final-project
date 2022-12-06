import Home from './routes/Home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from "./routes/Navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Profile from "./routes/Profile/profile.component";
import Review from "./routes/reviews/review.component";
import Search from "./routes/search/search.component";
import CocktailComponent from "./routes/cocktail/cocktail.component";
import {useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, db, onAuthStateChangedListner, signOutUser} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";
import {Provider} from "react-redux";
import cocktailReducer from "./reducers/cocktail-reducer";
import { configureStore }
    from '@reduxjs/toolkit';
import userReducer, {setDisplayName, setUser} from "./store/user/user.reducer";
import Admin from "./routes/admin/admin.component";
import {doc, getDoc} from "firebase/firestore";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner(async (user) => {
            if (user) {
                createUserDocumentFromAuth(user);
                const userDocRef = doc(db, 'users', user.uid);
                const userSnapShot = await getDoc(userDocRef);
                console.log("User snapshot is", userSnapShot.data())
                dispatch(setDisplayName(userSnapShot.data().displayName))
            }

            dispatch(setUser(user));
        });
        return unsubscribe;
    }, [dispatch]);
  return (
      <Routes>
          <Route path='/' element = {<Navigation />}>
              <Route index element={<Home />}/>
              <Route path='shop' element={<Shop />}/>
              <Route path='profile' element={<Profile/>}/>
              <Route path='review' element={<Review/>}/>
              <Route path='restaurant/:rid/search' element={<Search/>}/>
              <Route path={'/auth'} element={<Authentication />}/>
              <Route path="restaurant/:rid/cocktail/:id" element={<CocktailComponent/>}/>
              <Route path='/admin' element={<Admin/>}/>
              <Route path="cocktail/:id" element={<CocktailComponent/>}/>
          </Route>
      </Routes>
  );
}

export default App;

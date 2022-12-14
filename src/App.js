import Home from './routes/Home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from "./routes/Navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Search from "./routes/search/search.component";
import CocktailComponent from "./routes/cocktail/cocktail.component";
import {useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, db, onAuthStateChangedListner, signOutUser} from "./utils/firebase/firebase.utils";

import {useDispatch} from "react-redux";
import {setDisplayName, setUser, setUserContact, setUserLocation, setUserType} from "./reducers/user/user.reducer";
import Admin from "./routes/admin/admin.component";
import {doc, getDoc} from "firebase/firestore";
import PrivateRoute from "./routes/PrivateRoute/privateroute";
import Profile from "./routes/Profile/profile";
import PublicProfile from "./routes/Profile/publicprofile";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner(async (user) => {
            console.log("inside app.js onauthchange")
            console.log("Auth State Changed: User value is", user)
            if (user) {
                const userDocRef = await createUserDocumentFromAuth(user);
                console.log("current user id is ", user.uid)
                // const userDocRef = doc(db, 'users', user.uid);
                const userSnapShot = await getDoc(userDocRef);
                console.log("User snapshot is", userSnapShot.data())
                dispatch(setDisplayName(userSnapShot.data().displayName))
                dispatch(setUserType(userSnapShot.data().userType))
                dispatch(setUserContact(userSnapShot.data().contact))
                dispatch(setUserLocation(userSnapShot.data().location))
            }
            else{
                dispatch(setDisplayName(null))
                dispatch(setUserType(null))
                dispatch(setUserContact(null))
                dispatch(setUserLocation(null))
            }
            dispatch(setUser(user));
        });
        return unsubscribe;
    }, [dispatch]);
  return (
      <Routes>
          <Route path='/' element = {<Navigation />}>
              <Route index element={<Home />}/>
              <Route path='profile' element={
                  <PrivateRoute>
                      <Profile/>
                  </PrivateRoute>
              }/>
              <Route path="profile/:uid" element={<PublicProfile/>}/>
              <Route path='restaurant/:rid/search' element={<Search/>}/>
              <Route path={'/auth'} element={<Authentication />}/>
              <Route path="restaurant/:rid/cocktail/:id" element={<CocktailComponent/>}/>
              <Route path='/admin' element={
                  <PrivateRoute>
                      <Admin/>
                  </PrivateRoute>
              }/>
          </Route>
      </Routes>
  );
}

export default App;

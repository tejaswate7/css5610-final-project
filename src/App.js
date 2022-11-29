import Home from './routes/Home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from "./routes/Navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Profile from "./routes/Profile/profile.component";
import Review from "./routes/reviews/review.component";
import {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListner, signOutUser} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            console.log(user)
            if (user) {
                 createUserDocumentFromAuth(user);
            }

            dispatch(setCurrentUser(user));
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
              <Route path={'/auth'} element={<Authentication />}/>
          </Route>
      </Routes>
  );
}

export default App;

import Home from './routes/Home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from "./routes/Navigation/navigation.component";
import SignIn from "./routes/Sign-In/signin.component";

const Shop = () => {
    return <h1>This is Shop Page</h1>
}
const App = () => {
  return (
      <Routes>
          <Route path='/' element = {<Navigation />}>
              <Route index element={<Home />}/>
              <Route path='shop' element={<Shop />}/>
              <Route path={'/sign-in'} element={<SignIn />}/>
          </Route>
      </Routes>
  );
}

export default App;

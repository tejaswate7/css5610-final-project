import Home from './routes/Home/home.component'
import { Routes, Route } from 'react-router-dom'
const App = () => {
    const categories = [
        {
            id: 1,
            title:'Meals',
            imageUrl: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg'

        },
        {
            id: 2,
            title:'Drinks',
            imageUrl: 'https://www.thecocktaildb.com/images/ingredients/gin.png'

        }
    ]
  return (
      <Routes>
          <Route path='/' element = {<Home/>}/>
      </Routes>
  );
}

export default App;

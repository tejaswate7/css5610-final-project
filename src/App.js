import './App.css';
import './categories.styles.scss'
import CategoryItem from "./components/category-item/category-item.component";
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
    <div className="categories-container">
        {categories.map((category) => (
            <CategoryItem key={category.id} category={category}/>
        ))}
    </div>
  );
}

export default App;

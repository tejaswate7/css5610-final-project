import './App.css';
import './categories.styles.scss'
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
        {categories.map(({title, id, imageUrl}) => (
                <div key={id} className="category-container">
                    <div className="background-image" style={{
                        backgroundImage: `url(${imageUrl})`
                    }}/>
                    <div className="category-body-container">
                        <h2>{title}</h2>
                        <p>Buy Now</p>
                    </div>
                </div>
        ))}
    </div>
  );
}

export default App;

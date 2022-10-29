
import Directory from "../../components/directory/directory.component";
const Home = () => {
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
        <Directory categories={categories}/>
    );
}

export default Home;

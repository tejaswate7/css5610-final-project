import './App.css';

const App = () => {
    const categories = [
        {
            id: 1,
            title:'Meals'

        },
        {
            id: 2,
            title:'Drinks'

        }
    ]
  return (
    <div className="categories-container">
        {categories.map(({title}) => (
                <div className="category-container">
                    {/*<img />*/}
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

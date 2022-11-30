import {useParams} from "react-router-dom";
import {findCocktailByIdThunk, findCocktailBySearchTermThunk} from "../../thunks/cocktail-thunk";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const CocktailComponent = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findCocktailByIdThunk(id));
    }, [id])
    const {currentCocktail, loading} = useSelector((state) => state.cocktail)
    const cocktail = currentCocktail[0]
    return (
        <div>
            { loading ? (<h1>Loading...</h1>)
            : (<div>
                    <img src={cocktail.strDrinkThumb} width="300" height="300"></img>
                    <h1>{cocktail.strDrink}</h1>
                    <h3>Tags: {cocktail.strTags}</h3>
                    <p>Instructions: {cocktail.strInstructions}</p>
                </div>)}
        </div>
    )
}

export default CocktailComponent;
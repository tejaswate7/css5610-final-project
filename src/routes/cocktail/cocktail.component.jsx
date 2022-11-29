import {useParams} from "react-router-dom";

const CocktailComponent = () => {
    const {id} = useParams();
    return (
        <div>
            <h1>This is the cocktail component {id}</h1>
        </div>
    )
}

export default CocktailComponent;
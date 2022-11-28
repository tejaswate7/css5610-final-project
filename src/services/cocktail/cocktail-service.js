import axios from "axios";

const SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='


export const findCocktailBySearchTerm = async (term) => {
    const response = await axios.get(`${SEARCH_URL}${term}`)
    return response.data.drinks
}
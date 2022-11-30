import axios from "axios";

const SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const COCKTAIL_DETAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='


export const findCocktailBySearchTerm = async (term) => {
    const response = await axios.get(`${SEARCH_URL}${term}`)
    return response.data.drinks
}

export const findCocktailById = async (id) => {
    const response = await axios.get(`${COCKTAIL_DETAILS_URL}${id}`)
    return response.data.drinks
}
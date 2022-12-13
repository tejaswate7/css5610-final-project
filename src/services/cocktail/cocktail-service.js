import axios from "axios";

const SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const COCKTAIL_DETAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='


export const findCocktailBySearchTerm = async (term) => {
    const response = await axios.get(`${SEARCH_URL}${term}`)
    return response.data.drinks
}

export const findCocktailById = async (id) => {
    const response = await axios.get(`${COCKTAIL_DETAILS_URL}${id}`)
    // console.log("response", response, id)
    return response.data.drinks
}

export const findCocktailsByIds = async (ids) => {
    let result = new Map()
    // console.log(ids)
    // ids.map(async id => {
    //     const response = await axios.get(`${COCKTAIL_DETAILS_URL}${id}`)
    //     console.log(response.data.drinks)
    // })
    for (let i = 0; i < ids.length; i++) {
        const response = await axios.get(`${COCKTAIL_DETAILS_URL}${ids[i]}`)
        // console.log(response.data.drinks)
        result.set(response.data.drinks[0].idDrink, response.data.drinks[0])
    }
    return result
}
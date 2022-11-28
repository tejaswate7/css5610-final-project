import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findCocktailBySearchTermThunk} from "../../thunks/cocktail-thunk";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";

import "../search/search.styles.scss";


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const params = {
        name: searchTerm
    };
    const goToSearch = () =>
        navigate({
            pathname: '/search',
            search: `?${createSearchParams(params)}`,
        });
    const {cocktails, loading} = useSelector((state) => state.cocktail)
    const dispatch = useDispatch();
    useEffect(() => {
        setSearchTerm((searchParams.get("name")));
        console.log(searchParams.get("name"));
        dispatch(findCocktailBySearchTermThunk(searchParams.get("name")))
    }, [searchParams])

    return(
        <>
            <div>
                <div className="row">
                    <div className="wd-search-panel col-11">
                        <div className="wd-input-icons">
                            <i className="wd-icon">&#x1F50D;</i>
                            <input className="wd-search-box" id="text-fields-username" placeholder="Search Food/Drink" onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }} value={searchTerm}/>
                        </div>
                    </div>
                    <div className="col-1">
                        <button
                            className="btn btn-primary float-end"
                            onClick={() => {
                                goToSearch()
                                dispatch(findCocktailBySearchTermThunk(searchTerm))
                            }}>Search
                        </button>
                    </div>
                </div>
            </div>

                <table className="table table-striped">
                    <tbody>
                    {
                        cocktails && cocktails.map((cocktail) =>
                        <tr>
                            <td><img src={cocktail.strDrinkThumb} width="100" height="100"/></td>
                        <td>{cocktail.strDrink}</td>
                        <td><i className="float-end bi bi-hand-thumbs-up"></i></td>
                        <td><i className="float-end bi bi-hand-thumbs-down me-2"></i></td>
                        </tr>
                )}
                    </tbody>
                </table>

        </>
    )
}

export default Search;
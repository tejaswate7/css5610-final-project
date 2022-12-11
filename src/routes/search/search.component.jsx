import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findCocktailBySearchTermThunk} from "../../thunks/cocktail-thunk";
import {useNavigate, createSearchParams, useSearchParams, Link, useParams} from "react-router-dom";

import "../search/search.styles.scss";
import {db, downVoteCocktail, likeCocktail, superLikeCocktail} from "../../utils/firebase/firebase.utils";
import {collection, onSnapshot, query, where} from "firebase/firestore";


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [likeInfo, setLikeInfo] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const params = {
        name: searchTerm
    };
    let { rid } = useParams();
    const goToSearch = () =>
        navigate({
            pathname: `/restaurant/${rid}/search`,
            search: `?${createSearchParams(params)}`,
        });
    const {cocktails, loading} = useSelector((state) => state.cocktail)
    const {currentUser, userType} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        setSearchTerm((searchParams.get("name")));
        dispatch(findCocktailBySearchTermThunk(searchParams.get("name")))
    }, [searchParams])

    let upVote = new Map() ;
    let downVote = new Map() ;
    let superLike = new Map();
    useEffect(() => {
            if (currentUser != null && cocktails != null) {
                let cids = cocktails.map(a => a.idDrink);
                const q = query(collection(db, "cocktails"), where("uid", "==", currentUser.uid), where("cid", "in", cids));
                onSnapshot(q, (snapshot) =>
                    setLikeInfo(snapshot.docs.map((doc) => ({...doc.data()}))))
            }
                        }
        , [cocktails, currentUser])

    function handleUpVote(cid) {
        likeCocktail(currentUser.uid, rid, cid)
    }

    function handleDownVote(cid) {
        downVoteCocktail(currentUser.uid, rid, cid)
    }

    function handleSuperLike(cid) {
        superLikeCocktail(currentUser.uid, rid, cid)
    }

    let i = 0;
    upVote = new Map();
    downVote = new Map();
    superLike = new Map();
    while (i < likeInfo.length) {
        upVote.set(likeInfo[i].cid, likeInfo[i].upVoted)
        downVote.set(likeInfo[i].cid, likeInfo[i].downVoted)
        superLike.set(likeInfo[i].cid, likeInfo[i].superLiked)
        i++;
    }

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
                            <Link to={`/restaurant/${rid}/cocktail/${cocktail.idDrink}`}><td>{cocktail.strDrink}</td></Link>
                            {currentUser && userType !== "critic" ? <td>{ upVote.get(cocktail.idDrink) ?
                            <i title="Up-vote" className="float-end bi bi-hand-thumbs-up-fill" style={{color: "#87CEEB"}}  onClick={ () => handleUpVote(cocktail.idDrink)}></i>
                            : <i title="Up-vote" className="float-end bi bi-hand-thumbs-up"  onClick={ () => handleUpVote(cocktail.idDrink)}></i>}</td> : <span/>}
                            {currentUser && userType !== "critic" ? <td>{ downVote.get(cocktail.idDrink) ?
                            <i title="Down-vote" className="float-end bi bi-hand-thumbs-down-fill me-2" style={{color: "red"}} onClick={() => handleDownVote(cocktail.idDrink)}></i>
                            : <i title="Down-vote" className="float-end bi bi-hand-thumbs-down me-2" onClick={() => handleDownVote(cocktail.idDrink)}></i>}</td> : <span/>}
                            {currentUser && userType === "critic" ? <td>{ superLike.get(cocktail.idDrink) ?
                            <i title="Super like" className="float-end bi bi-heart-fill me-2" style={{color: "red"}} onClick={() => handleSuperLike(cocktail.idDrink)}></i>
                            : <i title="Super like" className="float-end bi bi-heart me-2" onClick={() => handleSuperLike(cocktail.idDrink)}></i>}</td> : <span/> }
                        </tr>
                )}
                    </tbody>
                </table>

        </>
    )
}

export default Search;
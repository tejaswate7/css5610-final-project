import {useParams} from "react-router-dom";
import {findCocktailByIdThunk} from "../../thunks/cocktail-thunk";import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {collection, onSnapshot, query, where} from "firebase/firestore"
import {createReviewsDoc} from "../../utils/firebase/firebase.utils";
import { db } from "../../utils/firebase/firebase.utils";
import CommentItem from "../comments/comment.component";

const CocktailComponent = () => {
    let [review, setReview] = useState('');
    let [allReview, setAllReviews] = useState([])
    const {id, rid} = useParams();
    const dispatch = useDispatch();
    const {currentUser, displayName} = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(findCocktailByIdThunk(id));
    }, [id])
    const q = query(collection(db, "comments"), where("rid", "==", rid), where("dishId", "==", id));
    useEffect(() => {
            onSnapshot(q, (snapshot) =>
                setAllReviews(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        }
        , [])

    const {currentCocktail, loading} = useSelector((state) => state.cocktail)
    const cocktail = currentCocktail[0]
    const reviewClickHandler = () => {
        createReviewsDoc(review, currentUser.uid, displayName, id, rid, cocktail.strDrink);
    }
    return (
        <div className="container">
            { loading ? (<h1>Loading...</h1>)
            : (<div className="row p-2">
                    <div className="col-4 col-xl-4 col-lg-4 col-md-6">
                    <img className="rounded-circle d-none d-md-block d-sm-none fa-2x" src={cocktail.strDrinkThumb} width="300" height="300"></img>
                    <img className="rounded-circle d-sm-block d-md-none pe-3" src={cocktail.strDrinkThumb} width="150" height="150"></img>
                    </div>
                    <div className="col-8 col-xl-8 col-lg-8 col-md-6">
                    <h1 className="p-2">{cocktail.strDrink}</h1>
                        {cocktail.strTags && <h3 className="p-2">Tags: {cocktail.strTags}</h3>}
                        {cocktail.strInstructions && <p className="p-2">Instructions: {cocktail.strInstructions}</p>}
                    </div>
                </div>)}

            <div className="row justify-content-center ">
                { currentUser &&
                    <div className="row justify-content-center ">
                    <div className="col-5">
                       <textarea value={review} placeholder="Your thoughts?"
                                 className="form-control border border-dark border-1 rounded-pill ps-3 pt-2"
                                 onChange={(event) => setReview(event.target.value)}>
                       </textarea>
                </div>
                <div className="col-1">
                            <button className="rounded-pill btn btn-primary mt-2 ps-3 pe-3 fw-bold"
                                    onClick={reviewClickHandler}>
                                Review
                            </button>
                </div>
                    </div>}
                    <div className="col-12"><hr/></div>
                </div>

            <ul className="list-group">
                {
                    allReview ?
                        allReview.map(comment =>
                            <CommentItem key={comment.id} comment={comment}></CommentItem>
                        )
                    : <li className="list-group-item">
                            No Reviews
                    </li>
                }
            </ul>
        </div>
    )
}

export default CocktailComponent;
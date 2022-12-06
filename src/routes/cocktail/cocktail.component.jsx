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
    useEffect(() => {
        dispatch(findCocktailByIdThunk(id));
    }, [id])
    const q = query(collection(db, "comments"), where("rid", "==", rid));
    useEffect(() =>
            onSnapshot(q, (snapshot) =>
                setAllReviews(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        , [])

    const {currentCocktail, loading} = useSelector((state) => state.cocktail)
    const cocktail = currentCocktail[0]
    const {currentUser} = useSelector((state) => state.user)
    const reviewClickHandler = () => {
        createReviewsDoc(review, currentUser.uid, currentUser.displayName, id, rid);
    }
    return (
        <div>
            { loading ? (<h1>Loading...</h1>)
            : (<div>
                    <img src={cocktail.strDrinkThumb} width="300" height="300"></img>
                    <h1>{cocktail.strDrink}</h1>
                    <h3>Tags: {cocktail.strTags}</h3>
                    <p>Instructions: {cocktail.strInstructions}</p>
                </div>)}

            <div className="row">
                <div className="col-5">
           <textarea value={review} placeholder="Your thoughts?"
                     className="form-control border-0"
                     onChange={(event) => setReview(event.target.value)}>
           </textarea>
                        <div>
                            <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                                    onClick={reviewClickHandler}>
                                Review
                            </button>
                        </div>
                    </div>
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
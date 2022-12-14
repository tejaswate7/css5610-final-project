import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Restaurant from "./profile-comment-restaurant";
import {useEffect} from "react";
import {findAllRestaurantsThunk, findRestaurantByIdThunk} from "../../thunks/restaurant-thunk";
import {findCocktailByIdThunk} from "../../thunks/cocktail-thunk";

const ProfileCommentItem = ({comment}) => {
    const {currentUser} = useSelector((state) => state.user)
    const {restaurants} = useSelector((state)=> state.restaurant)
    //console.log(comment)
    const deleteCommentHandler = async () => {
        const docRef = doc(db, "comments", comment.id)
        await deleteDoc(docRef)
    }
    const date = new Date(comment.createdAt.seconds * 1000)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllRestaurantsThunk())
    }, [])

    return(
        <li className="list-group-item">
            <div>
                <Restaurant key={comment.rid} rid={comment.rid} restaurants={restaurants}/>
            </div>
            <div className="fw-light">For:
                <span className="ps-2 fw-semibold">
                <Link to={`/restaurant/${comment.rid}/cocktail/${comment.dishId}`}>
                    {comment.dishName}
                </Link>
                </span>
            </div>

            <div className="fw-light">You said:
                <span className="fw-semibold fst-italic ms-2">{comment.comment}</span>
            </div>
            <span className="fw-light fst-italic" style={{"fontSize": "12px"}}>{time}</span>
        </li>
    );
}

export default ProfileCommentItem;

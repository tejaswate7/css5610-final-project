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
        // <div>
        //     {
        //         comment.userName ?
        //         (<div className="row wd-border-color-grey pt-2">
        //             <div className="col-12">
        //                 { currentUser && currentUser.uid === comment.userId &&
        //                   <i className="bi bi-x-lg float-end"
        //                      onClick={() => deleteCommentHandler()}></i>}
        //                 <p style={{"fontSize": "15px"}} dangerouslySetInnerHTML={{__html: comment.comment}}></p>
        //                 <p style={{"fontSize": "12px"}}><i>by <Link to={`/profile/${comment.userId}`}><strong>{comment.userName}</strong></Link><strong> at {time}</strong></i></p>
        //             </div>
        //         </div>) : (<h2>None</h2>)}
        // </div>
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

// <li className="list-group-item">
//     <div className="row">
//         <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1">
//             <img className="rounded-circle" src={`/tuiter/images/${tuit.profilepic}`}
//                  alt="Profile of account holder" height="50px" width="50px"/>
//         </div>
//         <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 col-xxl-11">
//             <div className="fw-bolder ps-2">
//                 {tuit.userName}
//                 <i className="fas fa-check-circle"></i>
//                 <span
//                     className="text-secondary fw-lighter"> {tuit.handle} - {tuit.time}
//                         </span>
//                 <i className="bi bi-x-lg float-end"
//                    onClick={() => deleteTuitHandler(tuit._id)}></i>
//             </div>
//             <div className="fw-light ps-2">
//                 {tuit.text}
//             </div>
//             <TuitStats tuitdata={tuit}/>
//         </div>
//     </div>
// </li>
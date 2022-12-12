import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {findUserByIdThunk} from "../../thunks/userthunk";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";
import ProfileCommentItem from "./profile-commentitem";

const PublicProfile = () => {
    const {uid} = useParams()
    const {currentUser} = useSelector((state) => state.user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findUserByIdThunk(uid));
        getComments()
    }, [uid])

    const {publicProfile} = useSelector((state) => state.user)
    // console.log('ppuser', publicProfile)

    const [photoURL, setPhotoURL] = useState("https://iscast.org/wp-content/uploads/2016/12/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpeg")

    let [allReview, setAllReviews] = useState([])
    const q = query(collection(db, "comments"), where("userId", "==", uid));
    const getComments = () => {
                  onSnapshot(q, (snapshot) =>
                      setAllReviews(snapshot.docs.map((doc) =>
                                                          ({...doc.data(), id: doc.id})))
                  )
              }
    return (
        <div className="profile-container">
            {publicProfile &&
             <div className="row">
                <div className="col-2">
                    <img src={photoURL}
                         width="300px" height="300px" border={1} alt="avatar"/>
                </div>
                <div className="col-10">
                    <div className="row">
                        {publicProfile && <div
                            className="h2 p-1 pb-2">{publicProfile.displayName}</div>}
                        {publicProfile.userType &&
                         <div className="h4 p-1">
                             <label className="col-1">User Type: </label>
                             <span className="col-11 fst-italic fw-semibold">{publicProfile.userType}</span>
                         </div>
                        }
                        {publicProfile.email &&
                         <div className="h4 p-1">
                             <label className="col-1">Email: </label>
                             <span className="col-11 fst-italic fw-semibold">{publicProfile.email}</span>
                         </div>
                        }
                        {publicProfile.location &&
                         <div className="h4 p-1">
                             <label className="col-1">Location: </label>
                             <span className="col-11 fst-italic fw-semibold">{publicProfile.location}</span>
                         </div>
                        }
                    </div>
                </div>
            </div>}
            <hr className="border border-light border-2 opacity-75"/>
            <div className="row">
                <div>My Reviews</div>
            </div>
            <ul className="list-group">
                {
                    !(allReview.length>0) &&
                    <li className="list-group-item align-items-center d-flex">
                        No Reviews given yet
                    </li>
                }
                {
                    (allReview.length>0) &&
                    allReview.map(comment => <ProfileCommentItem key={comment.id} comment={comment}></ProfileCommentItem>)
                }
            </ul>
        </div>
    )
}
export default PublicProfile;
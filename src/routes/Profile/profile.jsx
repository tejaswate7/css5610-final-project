import { Row, Col, Form, Button } from 'react-bootstrap'
import {useEffect, useState} from "react";
import {collection, getDocs, doc, deleteDoc, onSnapshot, getDoc, query, where} from "firebase/firestore"
import {db, upload} from "../../utils/firebase/firebase.utils";
import {useDispatch, useSelector} from "react-redux";
import { Icon } from 'react-icons-kit'
import {edit2} from 'react-icons-kit/feather/edit2'
import "./profile.styles.scss"
import {findCocktailByIdThunk, findCocktailBySearchTermThunk} from "../../thunks/cocktail-thunk";
import {setDisplayName, setUser} from "../../reducers/user/user.reducer";
import {useParams} from "react-router-dom";
import ProfileCommentItem from "./profile-commentitem";

const Profile = ({ editabilityStatus }) => {

    const { currentUser, displayName, userType } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false)
    const [ name, setName ] = useState(displayName)
    const [ email, setEmail ] = useState('')
    const [ usrType, setUsrType] = useState(userType)
    const [location, setLocation] = useState('')
    const [contact, setContact] = useState('')
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [photoURL, setPhotoURL] = useState("https://iscast.org/wp-content/uploads/2016/12/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpeg")

    let [allReview, setAllReviews] = useState([])
    //const q = query(collection(db, "comments"));
    const q = query(collection(db, "comments"), where("userId", "==", currentUser.uid));
    useEffect(() => {
                  onSnapshot(q, (snapshot) =>
                      setAllReviews(snapshot.docs.map((doc) =>
                                                          ({...doc.data(), id: doc.id})))
                  )
              }
        , [])

    useEffect(() => {
        setName(displayName)
        setUsrType(userType)
        if(currentUser){
            setEmail(currentUser.email)
            if(currentUser.photoURL){
                setPhotoURL(currentUser.photoURL)
            }
        }
    }, [])
    const handleChange = (e) => {
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }
    const handleClick = () => {
        upload(photo, currentUser, setLoading)
    }
    const handleEdit = () => {
        setEdit(true)
    }

    const handleUpdate = () => {
        setEdit(false)
    }

    return (
        <div className="profile-container">
            <div className="float-end">
                {!edit && <button className="btn-outline-info" onClick={handleEdit}>Edit Details</button>}
                {edit && <button className="btn-outline-info" onClick={handleUpdate}>Update Details</button>}
            </div>
            <div className="row">
                <div className="col-2">
                    <img src={photoURL}
                         width="300px" height="300px" border={1} alt="avatar"/>
                    {/*<input type="file" onChange={handleChange}/>*/}
                    {/*<button disabled={loading || !photo} onClick={handleClick}>Upload</button>*/}
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="h2 p-1 pb-2">{name}</div>
                        <div className="h4 p-1">
                            <label className="col-1">User Type: </label>
                            <span className="col-11 fst-italic fw-semibold">{usrType}</span>
                        </div>
                        <div className="h4 p-1">
                            <label className="col-1">Email: </label>
                            {edit && <input type="text" className="col-11" placeholder="email" value={email}></input>}
                            {!edit && <span className="col-11 fst-italic fw-semibold">{email}</span>}
                        </div>
                        <div className="h4 p-1">
                            <label className="col-1">Location: </label>
                            {edit && <input type="text" className="col-11" placeholder="city/country" value={location}></input>}
                            {!edit && <span className="col-11 fst-italic fw-semibold">{location}</span>}
                        </div>
                        <div className="h4 p-1">
                            <label className="col-1">Phone: </label>
                            {edit && <input type="text" className="col-11" placeholder="+1 xxx xxx xxxx" value={contact}></input>}
                            {!edit && <span className="col-11 fst-italic fw-semibold">{contact}</span>}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border border-light border-2 opacity-75"/>
            <div className="row">
                <div className="text-black fw-bolder ms-2 mb-1" style={{"fontSize": "25px"}}>My Reviews</div>
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



    // return(
    // <div className="profile-container">
    //     <FormProfile userToBeEdited={currentUser.uid}/>
    //     {
    //         editabilityStatus &&
    //         <div>
    //             <div className="border border-1 border-solid p-2 m-2">
    //                 <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
    //                 <div className="col-sm-10">
    //                     <input type="text" className="form-control" id="name" placeholder="Name" value={name}
    //                            onChange={(event) => setName(event.target.value)}/>
    //                 </div>
    //             </div>
    //             <div className="border border-1 border-solid p-2 m-2">
    //                 <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
    //                 <div className="col-sm-10">
    //                     <input type="text" className="form-control" id="email" placeholder="email" value={email}
    //                            onChange={(event) => setEmail(event.target.value)}/>
    //                 </div>
    //                 <div>
    //                     <button className="btn btn-primary float-end">
    //                         Update
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //
    //     }
    //     {
    //         !editabilityStatus &&
    //         <div className="profile-actions row">
    //             <div className=''>
    //                 <span>{ name }</span>
    //                 <span>{ email }</span>
    //             </div>
    //             <div>
    //                 <span className='profile-edit'>
    //                     <Icon icon={edit2} size={24}/>
    //                 </span>
    //             </div>
    //         </div>
    //     }
    // </div>
    // )
}

export default Profile;
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore"
import {db, updateUserProfile, upload} from "../../utils/firebase/firebase.utils";
import {useDispatch, useSelector} from "react-redux";
import "./profile.styles.scss"
import ProfileCommentItem from "./profile-commentitem";

const Profile = () => {

    const { currentUser, displayName, userType, location, contact } = useSelector((state) => state.user)
    const [edit, setEdit] = useState(false)
    const [ name, setName ] = useState(displayName)
    const [ email, setEmail ] = useState('')
    const [ usrType, setUsrType] = useState(userType)
    const [loc, setLocation] = useState(location)
    const [phone, setContact] = useState(contact)
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
        setLocation(loc)
        setContact(phone)
        updateUserProfile(currentUser.uid,{updatedAt:new Date(), location: loc, contact: phone})
        setEdit(false)
    }

    return (
        <div className="profile-container">
            <div className="float-end">
                {!edit &&
                 <button className="btn btn-primary d-none d-lg-block" onClick={handleEdit}>
                     <i className=" bi bi-pencil-fill me-2"></i>
                     Edit Details
                </button>
                }
                {edit && <button className="btn btn-primary d-none d-lg-block" onClick={handleUpdate}>
                    <i className="bi bi-save me-2"></i>
                    Update Details
                </button>}
            </div>
            <div className="d-flex flex-row">
                <div className="position-relative">
                    <img src={photoURL}
                         width="300px" height="300px" border={1} alt="avatar"/>
                    {/*<input type="file" className="position-absolute start-0" onChange={handleChange}/>*/}
                    {/*<button className="btn btn-secondary position-absolute bottom-0 end-0" disabled={loading || !photo} onClick={handleClick}>*/}
                    {/*    Upload*/}
                    {/*</button>*/}
                </div>
                <div className="ms-5">
                    <div className="row">
                        <div className="h2 p-1 pb-2">
                            {name}
                        </div>
                        <div className="h4 p-1">
                            <label className="col-2 d-inline-block">User Type: </label>
                            <span className="col-10 d-inline-block fst-italic fw-semibold">
                                {usrType}
                                <i className="bi bi-globe2 ms-2 fs-6" rel="tooltip" title="Public"></i>
                            </span>
                        </div>
                        <div className="h4 p-1">
                            <label className="col-2">Email: </label>
                            <span className="col-10 d-inline-block fst-italic fw-semibold">
                                {email}
                                <i className="bi bi-globe2 ms-2 fs-6" rel="tooltip" title="Public"></i>
                            </span>
                        </div>
                        <div className="h4 p-1">
                            <label className="col-2">Location: </label>
                            {edit &&
                             <input type="text" className="col-10" placeholder="city/country" value={loc}
                                            onChange={(event) => setLocation(event.target.value)}>
                            </input>}
                            {!edit && <span className="col-10 fst-italic fw-semibold">
                                {loc}
                                <i className="bi bi-globe2 ms-2 fs-6" rel="tooltip" title="Public"></i>
                            </span>}
                        </div>
                        <div className="h4 p-1">
                            <label className="col-2">Phone: </label>
                            {edit && <input type="text" className="col-10" placeholder="+1 xxx xxx xxxx" value={phone}
                                            onChange={(event) => setContact(event.target.value)}></input>}
                            {!edit && <span className="col-10 fst-italic fw-semibold">
                                {phone}
                                <i className="bi bi-file-lock ms-2 fs-6" rel="tooltip" title="Private"></i>
                            </span>}
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
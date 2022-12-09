import { Row, Col, Form, Button } from 'react-bootstrap'
import {useEffect, useState} from "react";
import {collection, getDocs, doc, deleteDoc, onSnapshot, getDoc} from "firebase/firestore"
import {db} from "../../utils/firebase/firebase.utils";
import {useDispatch, useSelector} from "react-redux";
import { Icon } from 'react-icons-kit'
import {edit2} from 'react-icons-kit/feather/edit2'
import "./profile.styles.scss"
import {findCocktailBySearchTermThunk} from "../../thunks/cocktail-thunk";
import {setDisplayName, setUser} from "../../store/user/user.reducer";
import {FormProfile} from "../../components/form-profile/form-profile";
const Profile = ({ editabilityStatus }) => {

    const { currentUser, displayName } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [ name, setName ] = useState(displayName)
    const [ email, setEmail ] = useState('')
    // const [ email, setEmail ] = useState(currentUser.email)
    useEffect(() => {
        // const test = async () => {
            // console.log("Current user Value is", currentUser)


            setName(displayName)
            if(currentUser){
                setEmail(currentUser.email)
            }


            // const userDocRef = doc(db, 'users', currentUser.uid);
            // const userSnapShot = await getDoc(userDocRef);
            // console.log("User snapshot is",userSnapShot.data())


            // collection(db, "users").doc(currentUser.id).get().then(doc => {
            //     const newData = doc.data();
            //     console.log("User ki ID", newData)
            // });


            // dispatch(setDisplayName(userSnapShot.data().displayName))
            // dispatch(setUser(userSnapShot.data().email))


            // setName(userSnapShot.data().displayName)
            // setEmail(currentUser.email)
        // }
        // test()
    }, [])
    return(
    <div className="profile-container">
        <FormProfile userToBeEdited={currentUser.uid}/>
        {
            editabilityStatus &&
            <div>
                <div className="border border-1 border-solid p-2 m-2">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" placeholder="Name" value={name}
                               onChange={(event) => setName(event.target.value)}/>
                    </div>
                </div>
                <div className="border border-1 border-solid p-2 m-2">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="email" placeholder="email" value={email}
                               onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div>
                        <button className="btn btn-primary float-end">
                            Update
                        </button>
                    </div>
                </div>
            </div>

        }
        {
            !editabilityStatus &&
            <div className="profile-actions row">
                <div className=''>
                    <span>{ name }</span>
                    <span>{ email }</span>
                </div>
                <div>
                    <span className='profile-edit'>
                        <Icon icon={edit2} size={24}/>
                    </span>
                </div>
            </div>
        }
    </div>
    )
}

export default Profile;
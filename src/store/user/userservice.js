import { getDatabase, ref, child, get } from "firebase/database";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";

export const findUserById = async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    const userSnapShot = await getDoc(userDocRef);
    const userdata = userSnapShot.data()
    console.log('userspan', userdata)
    return userdata
}






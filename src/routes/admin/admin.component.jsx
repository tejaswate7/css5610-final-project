import {useEffect, useState} from "react";
import { collection, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore"
import { deleteUser } from 'firebase/auth'
import { db } from "../../utils/firebase/firebase.utils"
import { auth } from "../../utils/firebase/firebase.utils"
const Admin = () => {
    const [users, setUsers] = useState();
    // const usersCollectionRef = collection(db, "users")

    const deleteUserFromFirestore = async (id) => {
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)
        const status = await deleteUser(id)
        console.log("user deleted from firebase auth?", status)
        console.log("Done")
    }
    useEffect(() =>
            // const usersCollectionRef = collection(db, "users")
            // const data = await getDocs(usersCollectionRef)
            // setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log("useEffect Called")
            onSnapshot(collection(db, "users"), (snapshot) =>
            setUsers(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))))
    , [])
    return(
        <div>
            <h2>The firebase modular sdk used for the project doesn't allow to delete admin data from firebase auth. The bellow actions delete user from firestore database. Please manually delete user from firebase authentication as well.</h2>
            <table className="table table-hover table-bordered">
                {
                    users
                    &&
                    users.filter((user) => user.email !== auth.currentUser.email).map((user) => {
                        return(
                            <tr>
                                <td ><h1 >Name: {user.displayName}</h1></td>
                                <td><h1>Email: {user.email}</h1></td>
                                <td  className="btn btn-danger mt-2"><button type="button" className="btn btn-danger" onClick={()=> deleteUserFromFirestore(user.id)}>Delete User</button></td>
                            </tr>
                        )
                    })}
            </table>
        </div>

    )
}

export default Admin;
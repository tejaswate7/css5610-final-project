import {useEffect, useState} from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { deleteUser } from 'firebase/auth'
import { db } from "../../utils/firebase/firebase.utils"
const Admin = () => {
    const [users, setUsers] = useState();
    const usersCollectionRef = collection(db, "users")

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)
        console.log("Done")
        await deleteUser(id)
    }
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getUsers()
    }, [deleteUser])
    return(
        <div>
            This is admin component
            {
                users
                &&
                users.filter((user) => user.email !== "admin@gmail.com").map((user) => {
                return(
                    <div className="row">
                        <div className="col-md-4"><h1>Name: {user.displayName}</h1></div>
                        <div className="col-md-4"><h1>Email: {user.email}</h1></div>
                        <div className="col-md-4 text-center"><button type="button" className="btn btn-danger" onClick={()=> deleteUser(user.id)}>Delete User</button></div>
                    </div>
                )
            })}
        </div>
    )
}

export default Admin;
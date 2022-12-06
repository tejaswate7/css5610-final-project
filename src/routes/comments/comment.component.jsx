import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";
import {useSelector} from "react-redux";


const CommentItem = (
    {
        comment
    }) => {
    const {currentUser} = useSelector((state) => state.user)
    const deleteCommentHandler = async () => {
        console.log("j");
        console.log()
        const docRef = doc(db, "comments", comment.id)
        await deleteDoc(docRef)
    }

    const userName = "a"
    return(
        <div>
            {
    userName ?
        (<div className="row wd-border-color-grey pt-2">
        <div className="col-12">
            { currentUser.uid === comment.userId &&
            <i className="bi bi-x-lg float-end"
               onClick={() => deleteCommentHandler()}></i>}
            <p style={{"fontSize": "15px"}} dangerouslySetInnerHTML={{__html: comment.comment}}></p>
            <p>by {userName}</p>
        </div>
    </div>) : (<h2>None</h2>)}
        </div>
    );
}

export default CommentItem;
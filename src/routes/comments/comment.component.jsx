import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const CommentItem = (
    {
        comment
    }) => {
    const {currentUser} = useSelector((state) => state.user)
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
    console.log(time)

    return(
        <div>
            {
    comment.userName ?
        (<div className="row wd-border-color-grey pt-2">
        <div className="col-12">
            { currentUser.uid === comment.userId &&
            <i className="bi bi-x-lg float-end"
               onClick={() => deleteCommentHandler()}></i>}
            <p style={{"fontSize": "15px"}} dangerouslySetInnerHTML={{__html: comment.comment}}></p>
            <p style={{"fontSize": "12px"}}><i>by <Link to={`/profile/${comment.userId}`}><strong>{comment.userName}</strong></Link><strong> at {time}</strong></i></p>
        </div>
    </div>) : (<h2>None</h2>)}
        </div>
    );
}

export default CommentItem;
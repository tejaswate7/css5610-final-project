import Button from "../../components/button/button.component";
import {createReviewsDoc} from "../../utils/firebase/firebase.utils";

const Review = () => {

    const handleOnClick = async () => {
        console.log("Hello")
        const t = await createReviewsDoc();
        console.log(t)
    }
    return(
        <>
            <h1>This is review Page</h1>
            <Button onClick={handleOnClick}>Click to create Reviews DB</Button>
        </>
    )
}

export default Review;
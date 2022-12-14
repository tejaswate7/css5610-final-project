
import Directory from "../../components/directory/directory.component";
import {useEffect, useState} from "react";
import {addCollectionAndDocuments, db, getCollectionsAndDocuments} from "../../utils/firebase/firebase.utils";
import RESTAURANT_DATA from "../../restaurant-data";
import {useDispatch, useSelector} from "react-redux";
import {collection, onSnapshot, query, where, orderBy, limit, getDocs} from "firebase/firestore";
import CommentItem from "../comments/comment.component";
import {
    findCocktailById2Thunk,
    findCocktailById3Thunk,
    findCocktailByIds2Thunk,
    findCocktailByIdsThunk
} from "../../thunks/cocktail-thunk";
import {findRenderedDOMComponentWithClass} from "react-dom/test-utils";
import {Link} from "react-router-dom";
import {setCocktailsFeedMap, setLatestCocktailsMap} from '../../reducers/cocktail-reducer'
import {getRestaurants} from "../../reducers/restaurants/restaurant.reducer";


const Home = () => {
    const dispatch = useDispatch()
    const { restaurants } = useSelector((state) => state.restaurant)
    const {cocktailsInFeed, cocktailsInLatestFeed, cocktailsInLatestFeed2, cocktailsInFeed2} = useSelector((state) => state.cocktail)
    const [rest, setRest] = useState([]);
    const {currentUser} = useSelector((state) => state.user)
    let [reviewFeed, setReviewFeed] = useState([])
    let [latestFeed, setLatestFeed] = useState([])
    useEffect(()=>{
        // addCollectionAndDocuments('restaurants', RESTAURANT_DATA)
        const getRes = async () => {
            const res = await getCollectionsAndDocuments();
            console.log(res)
            setRest(res)
            dispatch(getRestaurants(res))
        }
        getRes();
    },[])
    useEffect( () => {
        if (currentUser) {
        const q = query(collection(db, "comments"), where("userId", "==", currentUser.uid));
        let res = []
        // onSnapshot(q, (snapshot) => {
        //     const test1 = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        //     setReviewFeed(test1)
        // })
        async function fetchData() {
            // You can await here
            const docs = await getDocs(q)
            if(docs.docs.length > 0){
                for (let snap of docs.docs){
                    const data = snap.data()
                    data['id'] = snap.id
                    res.push(data)
                }
            }
            setReviewFeed(res)
        }
        fetchData();
        }
        dispatch(setCocktailsFeedMap())
    }, [currentUser])
    useEffect(() => {
        const q = query(collection(db, "comments"), orderBy("createdAt", "desc"), limit(5));
        let res = []
        // onSnapshot(q, (snapshot) => {
        //     const test1 = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        //     setLatestFeed(test1)
        // })
        async function fetchData() {
            // You can await here
            const docs = await getDocs(q)
            if(docs.docs.length > 0){
                for (let snap of docs.docs){
                    const data = snap.data()
                    data['id'] = snap.id
                    res.push(data)
                }
            }
            setLatestFeed(res)
        }
        fetchData();
        dispatch(setLatestCocktailsMap())
    }, [])


    // useEffect(() => {
    //     console.log("review feed in use effect", reviewFeed)
    //     if (reviewFeed.length !== 0) {
    //         // let ids = reviewFeed.map(a => a.idDrink)
    //         // console.log("ids", reviewFeed)
    //         reviewFeed.map(drink => dispatch(findCocktailById2Thunk(drink.dishId)))
    //     }
    // }, [reviewFeed])
    // useEffect(() => {
    //     console.log("latest feed in use effect", latestFeed)
    //     if (latestFeed.length !== 0) {
    //         // let ids = reviewFeed.map(a => a.idDrink)
    //         // console.log("ids", reviewFeed)
    //         latestFeed.map(drink => dispatch(findCocktailById3Thunk(drink.dishId)))
    //     }
    // }, [latestFeed])
    useEffect(() => {
        console.log("review feed in use effect", reviewFeed)
        if (reviewFeed.length !== 0) {
            let ids = reviewFeed.map(a => a.dishId)
            console.log("payload 5", ids)
            reviewFeed.map(drink => dispatch(findCocktailByIds2Thunk(ids)))
        }
    }, [reviewFeed])
    useEffect(() => {
        if (latestFeed.length !== 0) {
            let ids = latestFeed.map(a => a.dishId)
            console.log("payload 4", ids, latestFeed)
            dispatch(findCocktailByIdsThunk(ids))
        }
    }, [latestFeed])

    console.log("reviews feed", reviewFeed, currentUser, cocktailsInFeed, latestFeed)
    console.log("lengths of latest ds", latestFeed.length, cocktailsInLatestFeed.size)
    console.log("payload 4", cocktailsInLatestFeed2)
    console.log("lengths of feed ds", reviewFeed.length, cocktailsInFeed2.size)
    console.log("payload 5", reviewFeed, cocktailsInFeed2)
    return (
        <div>
            <h2>
                <div className="text-center mb-4">
                    Welcome to Spirited Tavern
                </div>
                <div className="text-center fs-4 mb-4">
                    Raising the bar on drink reviews and good times
                </div>
            </h2>
            <p className="text-center">Spirited Tavern is a website that helps you rate drinks at your favourite taverns in Boston. It helps patrons choose the best drinks next time when you order at your favourite tavern.</p>
            {/*{*/}
            {/*    restaurants.length > 0 ? (<Directory categories={categories}/>) : (<div>nothing to display</div>)*/}
            {/*}*/}
            <h2 className="text-center">Taverns</h2>
            <Directory categories={rest}/>
            {
                currentUser && reviewFeed.length !==0 &&
                <div>
                    <h3 className="pt-2 text-center">Your reviews feed</h3>
                    {
                        reviewFeed && cocktailsInFeed2.size !== 0?
                            reviewFeed.map(comment =>
                                <div className="row pt-4">
                                    <div className="col-3 col-xl-1 pe-xl-0 pe-lg-5 col-md-2 col-sm-2">
                                        <img className="rounded-circle" src={cocktailsInFeed2.get(comment.dishId).strDrinkThumb} width="80" height="80"></img><br></br>
                                        <Link to={`/restaurant/${comment.rid}/cocktail/${comment.dishId}`}><h7 className="justify-content-center">{cocktailsInFeed2.get(comment.dishId).strDrink}</h7></Link>
                                    </div>
                                    <div className="col-7 col-xl-11 ps-xl-0 col-lg-9 col-md-7 col-sm-7">
                                        <CommentItem key={comment.id} comment={comment} canDelete={false}></CommentItem>
                                    </div>
                                </div>
                            )
                            : <li className="list-group-item">
                                No Reviews yet! Get started!
                            </li>
                    }
                </div>

            }
            {
                latestFeed.length !==0 &&
                <div>
                    <h3 className="pt-2 text-center">Recent activity on Spirited Tavern</h3>
                    {
                        latestFeed && cocktailsInLatestFeed2.size !== 0?
                            latestFeed.map(comment =>

                                <div className="row pt-4">
                                    <div className="col-3 col-xl-1 pe-xl-0 pe-lg-5 col-md-2 col-sm-2">
                                        <img className="rounded-circle" src={cocktailsInLatestFeed2.get(comment.dishId).strDrinkThumb} width="80" height="80"></img><br></br>
                                        <Link to={`/restaurant/${comment.rid}/cocktail/${comment.dishId}`}><h7 className="justify-content-center">{cocktailsInLatestFeed2.get(comment.dishId).strDrink}</h7></Link>
                                    </div>
                                    <div className="col-7 col-xl-11 ps-xl-0 col-lg-9 col-md-7 col-sm-7">
                                        <CommentItem key={comment.id} comment={comment} canDelete={false}></CommentItem>
                                    </div>
                                </div>
                            )
                            : <li className="list-group-item">
                                No Reviews yet! Get started!
                            </li>
                    }
                </div>

            }
        </div>
    );
}

export default Home;

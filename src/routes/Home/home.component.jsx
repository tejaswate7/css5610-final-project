
import Directory from "../../components/directory/directory.component";
import {useEffect, useState} from "react";
import {addCollectionAndDocuments, getCollectionsAndDocuments} from "../../utils/firebase/firebase.utils";
import RESTAURANT_DATA from "../../restaurant-data";
import {useDispatch, useSelector} from "react-redux";
import {getRestaurants} from "../../store/restaurants/restaurant.reducer";


const Home = () => {
    const dispatch = useDispatch()
    const { restaurants } = useSelector((state) => state.restaurant)
    const [rest, setRest] = useState([]);
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
            <Directory categories={rest}/>
        </div>
    );
}

export default Home;

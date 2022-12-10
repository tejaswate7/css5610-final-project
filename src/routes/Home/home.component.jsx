
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
                    Welcome to TTR - Your favourite place to check out and rate dishes from restaurants
                </div>
            </h2>
            <p className="text-center">TTL is a website that helps you rate dishes that you have eaten at your favourite restaurants in Boston. It helps patrons choose the best dishes next time when you order at your favourite restaurants. Explore different restaurants and the wide variety of dishes they have to offer the next time you go there right here on TTR.</p>
            {/*{*/}
            {/*    restaurants.length > 0 ? (<Directory categories={categories}/>) : (<div>nothing to display</div>)*/}
            {/*}*/}
            <Directory categories={rest}/>
        </div>
    );
}

export default Home;

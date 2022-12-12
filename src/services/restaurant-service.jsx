import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";
import {db} from "../utils/firebase/firebase.utils";

export const findRestaurantById = async (rid) => {
    const resDocRef = doc(db, 'restaurants', rid);
    const resSnapShot = await getDoc(resDocRef);
    const resData = resSnapShot.data()
    //console.log('resData', resData)
    return resData
}

export const findAllRestaurants = async () => {
    const collectionRef = collection(db, 'restaurants')
    const q = query(collectionRef)
    const restaurants = await getDocs(q)
    const restaurantsArray = []
    if(restaurants.docs.length > 0){
        for (let snap of restaurants.docs){
            const data = snap.data()
            data['id'] = snap.id
            restaurantsArray.push(data)
        }
        return restaurantsArray
    }
}






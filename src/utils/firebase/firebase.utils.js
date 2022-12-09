// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth"
import { getFirestore, doc, getDoc, addDoc, query, getDocs, setDoc, collection, writeBatch, updateDoc } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Original Project
const firebaseConfig = {
    apiKey: "AIzaSyCyGzTfqgWH6i6qyRs96Sk_UmpLlE3nh1Q",
    authDomain: "cs5610-final-project-f6bc2.firebaseapp.com",
    projectId: "cs5610-final-project-f6bc2",
    storageBucket: "cs5610-final-project-f6bc2.appspot.com",
    messagingSenderId: "215826457058",
    appId: "1:215826457058:web:adf80d2cd4e0da7cb619bb"
};

//backup - 1
// const firebaseConfig = {
//     apiKey: "AIzaSyDsGQqb-jOJwOZbd4l7F3wFrekOU_QT6Pg",
//     authDomain: "cs5610-final-project-bk1.firebaseapp.com",
//     projectId: "cs5610-final-project-bk1",
//     storageBucket: "cs5610-final-project-bk1.appspot.com",
//     messagingSenderId: "772130401230",
//     appId: "1:772130401230:web:ee2d0fedeffeba7b11999f"
// };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth){
        return
    }
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    // if user data does not exist
    if (!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        }
        catch(error){
            console.log("Error creating a user", error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password){
        return
    }
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password){
        return
    }
    return await signInWithEmailAndPassword(auth, email, password);
}

export const createReviewsDoc = async () => {
    const userCollectionRef = collection(db, "users")
    const data = await getDocs(userCollectionRef)
    console.log(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    })))
    const reviewsDocumentRef = collection(db, 'reviews')
    const res = await addDoc(reviewsDocumentRef, {
        title: "Hello",
        Name: "lol"
    })
    console.log(res)
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef/*, object.title.toLowerCase()*/)
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log("Batch commit done")
}

export const getCollectionsAndDocuments = async () => {
    const collectionRef = collection(db, 'restaurants')
    const q = query(collectionRef)
    const restaurants = await getDocs(q)
    const restaurantsArray = []
    if(restaurants.docs.length > 0){
        for (let snap of restaurants.docs){
            console.log("this is snap", snap.id)
            const data = snap.data()
            data['id'] = snap.id
            restaurantsArray.push(data)
        }
    }

    return restaurantsArray;
    // const restroMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, imageUrl } = docSnapshot.data();
    //     acc[title.toLowerCase()] = [{title, imageUrl}]
    //     return acc
    // }, {});


    // return restroMap;
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner =  (callback) =>  onAuthStateChanged(auth, callback);

export const updateUserProfile = async (userToBeEdited, updates) => {
    const docRef = doc(db, "users", userToBeEdited);
    await updateDoc(docRef, updates);
}
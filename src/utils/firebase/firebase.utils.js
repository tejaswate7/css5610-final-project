// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, addDoc, query, getDocs, setDoc, collection, writeBatch, where, updateDoc } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyGzTfqgWH6i6qyRs96Sk_UmpLlE3nh1Q",
    authDomain: "cs5610-final-project-f6bc2.firebaseapp.com",
    projectId: "cs5610-final-project-f6bc2",
    storageBucket: "cs5610-final-project-f6bc2.appspot.com",
    messagingSenderId: "215826457058",
    appId: "1:215826457058:web:adf80d2cd4e0da7cb619bb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
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

export const createReviewsDoc = async (review, userId, userName, dishId, rid) => {
    const commentsDocumentRef = collection(db, 'comments')
    const res = await addDoc(commentsDocumentRef, {
        comment: review,
        userId: userId,
        userName: userName,
        dishId: dishId,
        rid: rid
    })
    console.log(res)
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log("Batch commit done")
}

export const getCollectionsAndDocuments = async () => {
    const collectionRef = collection(db, 'restaurants')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const restroMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items
        return acc
    }, {});

    return restroMap;
}

export const likeCocktail = async (uid, rid, cid) => {
    const q = query(collection(db, "cocktails"), where("uid", "==", uid), where("rid", "==", rid), where("cid", "==", cid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
        const cocktailsDocumentRef = collection(db, 'cocktails')
        await addDoc(cocktailsDocumentRef, {
            uid: uid,
            rid: rid,
            cid: cid,
            upVoted: true,
            downVoted: false
        })
    } else {
        const row = querySnapshot.docs[0]
        const data = row._document.data.value.mapValue.fields
        const rowRef = doc(db, "cocktails", row.id);
        await setDoc(rowRef, {
            uid: data.uid.stringValue,
            rid: data.rid.stringValue,
            cid: data.cid.stringValue,
            upVoted: !data.upVoted.booleanValue, downVoted: false
        })
    }
}

export const downVoteCocktail = async (uid, rid, cid) => {
    console.log(uid, rid, cid)
    const q = query(collection(db, "cocktails"), where("uid", "==", uid), where("rid", "==", rid), where("cid", "==", cid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
        const cocktailsDocumentRef = collection(db, 'cocktails')
        await addDoc(cocktailsDocumentRef, {
            uid: uid,
            rid: rid,
            cid: cid,
            upVoted: false,
            downVoted: true
        })
    } else {
        const row = querySnapshot.docs[0]
        const data = row._document.data.value.mapValue.fields
        const rowRef = doc(db, "cocktails", row.id);
        await setDoc(rowRef, {
            uid: data.uid.stringValue,
            rid: data.rid.stringValue,
            cid: data.cid.stringValue,
            downVoted: !data.downVoted.booleanValue, upVoted: false
        })
    }
}


export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner =  (callback) =>  onAuthStateChanged(auth, callback);
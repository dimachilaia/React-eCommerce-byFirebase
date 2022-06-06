import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'

//ეს data სთვის, რომელიც არის google firebase firestore database ში.
import {getFirestore, collection, writeBatch, doc, getDoc, setDoc, query, getDocs} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyATc6vBbR-hJFyEJIjAM5Xlo8g__Z-JZ1A",
    authDomain: "clothing-2c12a.firebaseapp.com",
    projectId: "clothing-2c12a",
    storageBucket: "clothing-2c12a.appspot.com",
    messagingSenderId: "871275372335",
    appId: "1:871275372335:web:ffc5c443769cba33774bda"
  };
  
  // Initialize Firebase
 const firebaseApp = initializeApp(firebaseConfig);
 
 const googleProvider = new GoogleAuthProvider()

 googleProvider.setCustomParameters({
  prompt: 'select_account'
 })

 export const auth = getAuth()

 export const signInWithGooglePopup = ()=>signInWithPopup (auth, googleProvider)
 export const signInWithGoogleRedirect = ()=>signInWithRedirect(auth, googleProvider)

 ////ეს data სთვის, რომელიც არის firestore database ში.
 export const db = getFirestore()

 //
 export const addCollectionAndDocuments = async(collectionKey, objectsToAdd,)=>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db)

  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  })
  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async()=>{
  const collectionRef = collection(db,'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{})

  return categoryMap
}



 export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{

   if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()){
    const {displayName, email}= userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }catch(error){
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
 }

 //email && password 
 export const createAuthUserWithEmailAndPassword = async (email, password)=>{
   if(!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password)
 }


 export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async()=> signOut(auth)

export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth, callback)
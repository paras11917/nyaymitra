import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
   apiKey: "AIzaSyC76Om2gSTAL4vInLxKAbss7_QrnNcZ1uU",
   authDomain: "userprofile-e8f12.firebaseapp.com",
   projectId: "userprofile-e8f12",
   storageBucket: "userprofile-e8f12.appspot.com",
   messagingSenderId: "910683641114",
   appId: "1:910683641114:web:afb47ad4eb9e08711208a3"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const storage = getStorage(app)

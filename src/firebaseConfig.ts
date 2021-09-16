import firebase from "firebase";
require("dotenv").config();

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
};

const firebaseApp = firebase.initializeApp(config);
const auth = firebase.auth(firebaseApp);
const provider = new firebase.auth.GoogleAuthProvider();

// for collections{json data}
const db = firebaseApp.firestore();

// files
const storage = firebaseApp.storage();

export { auth, provider, db, storage };
export default firebaseApp;

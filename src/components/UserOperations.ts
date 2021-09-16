import firebase from "firebase";
import { useDispatch } from "react-redux";
import { setUserLoginDetails } from "../features/user/userSlice";
import { auth, provider } from "../firebaseConfig";

const handleGoogleLogin = () => {
  auth
    .signInWithPopup(provider)
    .then((result: any) => {
      SetUser(result);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

type userType = {
  displayName: string | null;
  email: string | null;
  photoUrl: string | null;
};

const SetUser = (user: userType | any) => {
  const dispatch = useDispatch();
  dispatch(
    setUserLoginDetails({
      name: user.displayName,
      email: user.email,
      photo: user.photoUrl,
    })
  );
};

// signup
const createUser = (email: any, password: any) => {
  console.log("We are create!");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(user?.displayName, user?.email, user?.photoURL);
      SetUser(user);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

// signin
const signInUser = (email: any, password: any) => {
  console.log("We are signin!");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(user?.displayName, user?.email, user?.photoURL);
      SetUser(user);
      // ...
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

const signOut = () =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });

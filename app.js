

import { createUserWithEmailAndPassword ,signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db,provider , GoogleAuthProvider} from "./firebaseSetup.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

document.querySelector("#already_btn").addEventListener("click",() => {
    window.location.assign("./pages/login/login.html");
})

let pushUserData = async (user) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {

            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            uid: user.uid,
        });
        console.log('document Id', docRef.id);
    } catch (e) {
        console.error("data pushing error", e)
    }
}

let userSignUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("userData", user);
            pushUserData(user).then(() => {
                window.location.assign("./pages/login/login.html");
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            console.error(errorCode);
        });
}


document.querySelector("#signUp-btn").addEventListener("click", () => {
    let emailValue = document.querySelector("#email").value;
    let passwordValue = document.querySelector("#password").value;
    let phoneNo = document.querySelector("#phoneNo").value;

    userSignUp(emailValue, passwordValue,phoneNo);
});

/// signup with google
document.querySelector("#google-signUp").addEventListener('click',()=>{
    signInWithPopup(auth, provider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        pushUserData(user).then(() => {
                window.location.replace("./pages/login/login.html");
            });
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(errorMessage,errorCode,email,credential);
      });
  })
  

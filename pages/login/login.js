import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth,db, provider, GoogleAuthProvider } from "/firebaseSetup.js";
// import {
//   addDoc,
//   collection,
//   getDocs,
//   query,
//   where,
// } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

document.querySelector("#google-signUp").addEventListener('click', () => {

  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // console.log("result", result);
      const user = result.user;
      // console.log("user", user);
      window.location.replace("../dashboard/dashboard.html");
      localStorage.setItem("loggedInUser", user.uid);

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.error(errorMessage, errorCode, email, credential);
    });
  // getloggedInUser();
})
let emailValue = document.querySelector("#email").value;
let passwordValue = document.querySelector("#password").value;
let signIn = async (email, pass) => {
  //   if((emailValue && passwordValue) === "" ){
  //     alert("plz fill all the feilds");
  // }
  await signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      const user = userCredential.user;
      console.log("login success: ", user);
      // ...
      localStorage.setItem('loggedInUser', user.uid);
      window.location.replace('../dashboard/dashboard.html');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};
// signIn()

document.querySelector('#login-btn').addEventListener('click', () => {
  var emailValue = document.querySelector('#email').value;
  var passwordValue = document.querySelector('#password').value;
  // console.log(emailValue,passwordValue);
  signIn(emailValue, passwordValue);
});
document.querySelector("#creatAccount_btn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser")
  window.location.replace("../../index.html");

})
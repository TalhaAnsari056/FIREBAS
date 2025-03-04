import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth} from "/firebaseSetup.js";
// import { addDoc, collection } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
let emailValue = document.querySelector("#email").value;
let passwordValue = document.querySelector("#password").value;
let signIn = async (email,pass) => {
//   if((emailValue && passwordValue) === "" ){
//     alert("plz fill all the feilds");
// }
    await signInWithEmailAndPassword(auth, email,pass)
      .then((userCredential) => {
        // Signed in
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
  
  document.querySelector('#login-btn').addEventListener('click',()=>{
    var emailValue = document.querySelector('#email').value;
    var passwordValue = document.querySelector('#password').value;
    // console.log(emailValue,passwordValue);
  signIn(emailValue,passwordValue);
  
  
  
  })
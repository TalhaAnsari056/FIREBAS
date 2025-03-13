

import { createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db, provider, GoogleAuthProvider } from "./firebaseSetup.js";
import { addDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

document.querySelector("#already_btn").addEventListener("click", () => {
    window.location.replace("./pages/login/login.html");
});
if (localStorage.getItem('loggedInUser')) {
    window.location.replace("./pages/login/login.html");
}
let pushUserData = async (user, d_name, F_no ,user_img) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {

            email: user.email,
            photoURL: user_img,
            displayName: d_name,
            phoneNumber: F_no,
            uid: user.uid,
           
        });
        console.log('document Id', docRef.id);
    } catch (e) {
        console.error("data pushing error", e)
    }
}
let pushUserData_byGoogle = async (user) => {
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
    console.log(email);
    console.log( password);
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            console.log("userCredential", userCredential);
            const user = userCredential.user;
            console.log("userData", user);

            let displayName = document.querySelector("#name").value;
            let phoneNo = document.querySelector("#phoneNo").value;
            console.log(displayName);
            function getProfilePicture(username) {
                const baseUrl = 'https://api.dicebear.com/7.x/identicon/svg?seed=';
                return `${baseUrl}${encodeURIComponent(username)}`;
            }
            
            // Example usage
            const username = displayName;
            const profilePicUrl = getProfilePicture(username);
            // if (displayName || phoneNo === "") {
            //     alert("plz fill all the feilds");
            //     return;
            // }
            pushUserData(user, displayName, phoneNo ,profilePicUrl).then(() => {
                window.location.replace("./pages/dashboard/dashboard.html");
                localStorage.setItem("loggedInUser", user.uid);
                // console.log("pushed");
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            console.error(errorCode);
        });
}



const signUp_btn = document.getElementById("signUp-btn");
signUp_btn.addEventListener("click", (event) => {
    event.target.setAttribute("style", "opacity:0.5");
    setTimeout(() => {
        event.target.removeAttribute("style");
    }, 200);
    
    var emailValue = document.querySelector("#email").value;
    var passwordValue = document.querySelector("#password").value;

    // if (emailValue || passwordValue === "") {
    //     alert("plz fill all the feilds");
    //     return;
    // }
    userSignUp(emailValue, passwordValue);
});
// checking
let checking = async (existing_email) => {

    const q = query(collection(db, "users"), where("email", "==", existing_email));
    console.log(q)
    const querySnapshot = await getDocs(q);
    console.log("Query Snapshot Size:", querySnapshot.size);
    if (querySnapshot.size >= 1) {
        alert("your have already created account with this google email.If you want to sign in with this email then click at Already have an account and then click on signIn with google ");
        return true;
    }
    return false;
    // if (querySnapshot.empty) {
    //     console.log("No matching documents found!");

    // }
// querySnapshot.forEach((users) => {
    //     console.log("User Found:", users.id, users.data());
    // });
}
/// signup with google
document.querySelector("#google-signUp").addEventListener('click', async () => {

    await signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.
            // console.log("result", result);
            const user = result.user;
            console.log("user", user);

            
            let is_contain_existing_email = await checking(user.email);
            console.log(is_contain_existing_email);

            if (!is_contain_existing_email) {
                console.log(is_contain_existing_email);

                await pushUserData_byGoogle(user)
                    .then(() => {
                        localStorage.setItem("loggedInUser", user.uid);
                        window.location.replace("./pages/dashboard/dashboard.html");
                    });

            }

        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
             console.error(error);
            // console.error(errorMessage, errorCode, email, credential);
        });

});

// document.querySelector("#google-signUp").addEventListener('click', async () => {
//     try {
//         const result = await signInWithPopup(auth, provider);
        
//         // Check if user exists
//         if (!result.user) {
//             console.error("Google sign-in failed, no user returned.");
//             return;
//         }

//         const user = result.user;
//         console.log("user", user);

//         let is_contain_existing_email = await checking(user.email);
//         console.log("is_contain_existing_email:", is_contain_existing_email);

//         if (!is_contain_existing_email) {
//             await pushUserData_byGoogle(user);
//             console.log("is_contain_existing_email:", is_contain_existing_email);
//             localStorage.setItem("loggedInUser", user.uid);
//         }

//     } catch (error) {
//         console.error("Error signing in with Google:", error);
//     }
// });

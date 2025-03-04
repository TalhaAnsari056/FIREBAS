
if (!localStorage.getItem('loggedInUser')) {
  window.location.replace("../../index.html");
  console.log("redirected successfully");
}
import { auth , db } from "../../firebaseSetup.js";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// import { addDoc, collection } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
let signOutFun = async () => {
  await signOut(auth).then(() => {
    console.log('logged out');

  })
    .catch((error) => {
      console.error(error.message);

    })
}
document.querySelector('#signout-btn').addEventListener('click', () => {
  signOutFun().then(() => {
    localStorage.removeItem("loggedInUser")
    window.location.replace("../login/login.html");
  })
});
// let updatePost = async (post_id) => {
//   console.log(post_id);

//   try {
//     // Add a new document in collection "cities"
//     await updateDoc(doc(db, "posts", post_id), {
//       postText: "updated post 2nd time",
//     }).then(() => {
//       console.log("update done");
//       getMyPosts();
//     })
//   } catch (error) {
//     console.error(error)
//   }
// };

let createPost = async (loggedIn_user, text) => {
  try {
    const docRef = await addDoc(collection( db,"posts"), {
      postText: text,
      uid: loggedIn_user,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};
var loggedInUser = localStorage.getItem("loggedInUser");
console.log(loggedInUser);
let getloggedInUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", loggedInUser));
      const querySnapshot = await getDocs(q);
      // console.log(q);
      // console.log(querySnapshot);
      // myPostDiv.innerHTML = ''
      querySnapshot.forEach((users) => {
        // post.data() is never undefined for query post snapshots
        console.log(users.id, users.data(),users.data().displayName);
        var loggedInUser_Name = users.data().displayName ;
        console.log(loggedInUser_Name);
        var loggedInUser_name = document.querySelector("#loggedInUser_name");
        loggedInUser_name.innerHTML = `Hello   ${loggedInUser_Name}`
        // myPostDiv.innerHTML += `${post.data().postText}
        //   <button id='${post.id}' class='update-btn'>edit</button>
        //   <br>`;
  
        // // Add event listener for the edit button
        // document.getElementById(post.id).addEventListener("click", () => {
        //   updatePost(post.id);
        // });
      });
    } catch (error) {
      console.error(error);
    }
  };
  getloggedInUser();

// let getAllPosts = async () => {
//   try {
//     const posts = await getDocs(collection(db, "posts"));
//     posts.forEach((post) => {
//       console.log(post.data());
//       allPostDiv.innerHTML += `<div>${post.data().postText}</div>
//         <br>`;
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
var myPostDiv = document.querySelector("#myPostDiv");
// let getMyPosts = async () => {
//   try {
//     const q = query(collection(db, "posts"), where("uid", "==", loggedInUser));
//     const querySnapshot = await getDocs(q);
//     // myPostDiv.innerText   = ''
//     querySnapshot.forEach((posts) => {
//       // post.data() is never undefined for query post snapshots
//       console.log(posts.id, posts.data());
//       myPostDiv.innerHTML += `${posts.data().postText}
//         <button id='${posts.id}' class='update-btn'>edit</button>
//         <br>`;

//       // Add event listener for the edit button
//       // document.getElementById(post.id).addEventListener("click", () => {
//       //   updatePost(post.id);
//       // });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
// getMyPosts();
document.querySelector("#add").addEventListener("click", () => {
  let postTxt = document.querySelector("#post-inp").value;
  console.log(postTxt);
  createPost(loggedInUser, postTxt );
});
let navigate_to_profile = () => {
  window.location.assign("./profile.html");
}
let navigate_to_users = () => {
  window.location.assign("./users.html");
}

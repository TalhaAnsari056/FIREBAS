
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
// const q = query(collection(db, "users"), where("uid", "==", loggedInUser));
// console.log(q)
// const querySnapshot = await getDocs(q);
// console.log("Query Snapshot Size:", querySnapshot.size);

// if (querySnapshot.empty) {
//     console.log("No matching documents found!");
   
// }

// querySnapshot.forEach((users) => {
//     console.log("User Found:", users.id, users.data());
// });
let getloggedInUser = async () => {
    try {
      // console.log(loggedInUser);
      const q = query(collection(db, "users"), where("uid", "==", loggedInUser));
      const querySnapshot = await getDocs(q);
      // myPostDiv.innerHTML = ''
      // console.log(loggedInUser);
      querySnapshot.forEach((users) => {
        console.log(querySnapshot);
        // console.log(loggedInUser);
        // post.data() is never undefined for query post snapshots
        console.log(users.id, users.data(),users.data().displayName);
        // console.log(q);
        var loggedInUser_Name = users.data().displayName ;
        console.log(loggedInUser_Name);
        var loggedInUser_name = document.querySelector("#loggedInUser_name");
        loggedInUser_name.innerHTML = `Hello   ${loggedInUser_Name}`
        // myPostDiv.innerHTML += `${post.data().postText}
        //   <button id='${post.id}' class='update-btn'>edit</button>
        //   <br>`;
        
      //   if (!querySnapshot.empty) {
      //     console.log("No matching documents found!");
      // }
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

let getAllPosts = async () => {
  try {
    const posts = await getDocs(collection(db, "posts"));
    posts.forEach((post) => {
      console.log(post.data());
    var  allPostDiv = document.querySelector("#allPosts")
      allPostDiv.innerHTML += `<div>${post.data().postText}</div>
        <br>`;
    });
  } catch (error) {
    console.error(error);
  }
};
getAllPosts();
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
  postTxt = "";
});
document.querySelector("#profile_page").addEventListener("click",() => {
  window.location.assign("./profile/profile.html");
});
document.querySelector("#uers_page").addEventListener("click",() => {
  window.location.assign("./users/users.html");
});
document.querySelector("#profile_img").addEventListener("click",() => {
  window.location.assign("./profile/profile.html");
});
document.querySelector("#profile_img").addEventListener("mouseover",() => {
  var profile_img = document.querySelector("#profile_img");
  profile_img.setAttribute("class" , "fa-solid fa-circle-plus fa-beat");
  
});
document.querySelector("#profile_img").addEventListener("mouseout",() => {
  var profile_img = document.querySelector("#profile_img");
  profile_img.removeAttribute("class" );
  
});



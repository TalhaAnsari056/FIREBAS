
if (!JSON.parse(localStorage.getItem('loggedInUser'))) {
    window.location.replace("../../index.html");
    console.log("redirected successfully");
}
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    getDoc,
  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { db, auth } from "/firebaseSetup.js";
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
        // console.log('successfully loggedout.');
        window.location.replace("../login/login.html");
    })
})
let updatePost = async (post_id) => {
    console.log(post_id);
  
    try {
      // Add a new document in collection "cities"
      await updateDoc(doc(db, "posts", post_id), {
        postText: "updated post 2nd time",
      }).then(()=>{
        console.log("update done");
        getMyPosts();
      })
    } catch (error) {
      console.error(error)
    }
  };
  let createPost = async (text) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        postText: text,
        uid: loggedInUser,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error(error);
    }
  };
  let getAllPosts = async () => {
    try {
      const posts = await getDocs(collection(db, "posts"));
      posts.forEach((post) => {
        console.log(post.data());
        allPostDiv.innerHTML += `<div>${post.data().postText}</div>
        <br>`;
      });
    } catch (error) {
      console.error(error);
    }
  };
  let getMyPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("uid", "==", loggedInUser));
      const querySnapshot = await getDocs(q);
      myPostDiv.innerHTML = ''
      querySnapshot.forEach((post) => {
        // post.data() is never undefined for query post snapshots
        console.log(post.id, post.data());
        myPostDiv.innerHTML += `${post.data().postText}
        <button id='${post.id}' class='update-btn'>edit</button>
        <br>`;
  
        // Add event listener for the edit button
        document.getElementById(post.id).addEventListener("click", () => {
          updatePost(post.id);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  document.querySelector("#add").addEventListener("click", () => {
    let postTxt = document.querySelector("#post-inp").value;
    console.log(postTxt);
    createPost(postTxt);
  });

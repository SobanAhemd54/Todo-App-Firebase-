// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHZHI821LAYe-PWTPXtsPl_KiBuKniDo8",
  authDomain: "todoapp-firebase-databas-6dd7b.firebaseapp.com",
  databaseURL: "https://todoapp-firebase-databas-6dd7b-default-rtdb.firebaseio.com",
  projectId: "todoapp-firebase-databas-6dd7b",
  storageBucket: "todoapp-firebase-databas-6dd7b.appspot.com",
  messagingSenderId: "371215656614",
  appId: "1:371215656614:web:b3b28f4fbf2d63420b7667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let todomain = document.getElementById('todomain');
    let loginmain = document.getElementById('loginmain');
    // Sign in the user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log('User logged in successfully:', user);
            alert('User logged in successfully!');
            todomain.style.display = 'block';
            loginmain.style.display = 'none';
            // Redirect to home page or wherever needed
            // window.location.href = 'index.html';
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.error('Login failed:', errorMessage);
            alert(errorMessage);
        });
});

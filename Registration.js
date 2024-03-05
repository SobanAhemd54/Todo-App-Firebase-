// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Register the user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log('User registered successfully:', user);
            alert('User registered successfully!');
            // Redirect to login page
            window.location.href = 'index.html';
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.error('Registration failed:', errorMessage);
            alert(errorMessage);
        });
});

// Firebase configuration - replace with your own Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBnaVRbWLscPskN1f6oyP-XUHglB4W4S2s",
  authDomain: "deliveryapp-3c68c.firebaseapp.com",
  projectId: "deliveryapp-3c68c",
  storageBucket: "deliveryapp-3c68c.firebasestorage.app",
  messagingSenderId: "631207344354",
  appId: "1:631207344354:web:7dfaf46b94235dd0fb46bb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login form handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'index.html';
            })
            .catch(error => {
                document.getElementById('login-error').textContent = error.message;
            });
    });
}

// Register form handling
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm['confirm-password'].value;
        if (password !== confirmPassword) {
            document.getElementById('register-error').textContent = "Passwords do not match.";
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'index.html';
            })
            .catch(error => {
                document.getElementById('register-error').textContent = error.message;
            });
    });
}

// Optional: Monitor auth state and redirect if needed
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        // You can update UI or redirect as needed
    } else {
        // User is signed out
    }
});

const firebaseConfig = {
    apiKey: "AIzaSyC8sEj0FRsm8itcK56L68I4iUt1cVo3Rgk",
    authDomain: "tea-house-pwa.firebaseapp.com",
    projectId: "tea-house-pwa",
    storageBucket: "tea-house-pwa.appspot.com",
    messagingSenderId: "413072516127",
    appId: "1:413072516127:web:2b77e781be3e419030212a",
    measurementId: "G-5G43JCS4MY"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = app.firestore();

// Inside the Firebase auth state change listener
firebase.auth().onAuthStateChanged(user => {
    const navbarItems = document.getElementById('navbarItems');
    const loginRegisterLink = document.getElementById('loginRegisterLink');
    const userDropdown = document.getElementById('userDropdown');
    const userDisplayNameElement = document.getElementById('userDisplayName');
    const logoutLink = document.getElementById('logoutLink');
  
    if (user) {
      // User is signed in
      const displayName = user.displayName;
  
      // Hide login/register link and show user's name and dropdown
      loginRegisterLink.style.display = 'none';
      userDisplayNameElement.textContent = displayName;
      userDropdown.style.display = 'block';
    } else {
      // User is signed out
      loginRegisterLink.style.display = 'block';
      userDropdown.style.display = 'none';
    }
  });
  


// Assuming you have a form with ID "signup"
document.querySelector('#signup form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const username = document.querySelector('#signup-username').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
  
    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const userId = user.uid;
  
        // Store additional user data in Firestore (optional)
        db.collection('users').doc(userId).set({
          username: username,
          email: email
        })
        .then(() => {
          console.log('User data saved to Firestore:', user);
  
          // Redirect to index.html or any other desired page
          window.location.href = 'index.html';
        })
        .catch(error => {
          console.error('Error saving user data to Firestore:', error);
        });
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  });
  
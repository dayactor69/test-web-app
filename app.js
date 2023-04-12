// Initialize Firebase
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
firebase.initializeApp(firebaseConfig);

// References to DOM elements
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const userList = document.querySelector('#user-list');
const infoCard = document.querySelector('#info-card');

// Listen for login form submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get username and password input values
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Authenticate user with Firebase Auth
  firebase.auth().signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      // Clear input fields
      usernameInput.value = '';
      passwordInput.value = '';

      // Show user list and info card
      userList.style.display = 'block';
      infoCard.style.display = 'block';

      // Display user's email in info card
      const userEmail = userCredential.user.email;
      const infoCardText = document.querySelector('#info-card-text');
      infoCardText.innerText = `Logged in as: ${userEmail}`;
    })
    .catch((error) => {
      // Handle login error
      const errorMessage = error.message;
      console.error(errorMessage);
      alert(errorMessage);
    });
});

// Listen for logout button click
const logoutButton = document.querySelector('#logout-button');
logoutButton.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Sign out user
  firebase.auth().signOut()
    .then(() => {
      // Hide user list and info card
      userList.style.display = 'none';
      infoCard.style.display = 'none';
    })
    .catch((error) => {
      // Handle logout error
      const errorMessage = error.message;
      console.error(errorMessage);
      alert(errorMessage);
    });
});

// Listen for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User is signed in');

    // Show user list and info card
    userList.style.display = 'block';
    infoCard.style.display = 'block';

    // Display user's email in info card
    const userEmail = user.email;
    const infoCardText = document.querySelector('#info-card-text');
    infoCardText.innerText = `Logged in as: ${userEmail}`;
  } else {
    // User is signed out
    console.log('User is signed out');

    // Hide user list and info card
    userList.style.display = 'none';
    infoCard.style.display = 'none';
  }
});

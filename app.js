// Initialize Firebase SDK with your credentials
var firebaseConfig = {
    apiKey: "AIzaSyC-9tGU77KevhUd4vBui2BMda6KlxDCono",
    authDomain: "web-app-test-c38e7.firebaseapp.com",
    databaseURL: "https://web-app-test-c38e7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-app-test-c38e7",
    storageBucket: "web-app-test-c38e7.appspot.com",
    messagingSenderId: "836886747933",
    appId: "1:836886747933:web:b35236779e1607189adff4",
    measurementId: "G-PNRD3GH0L4"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Get the registration form element
  var registrationForm = document.querySelector('form');
  
  // Add a submit event listener to the form
  registrationForm.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();
  
    // Get the user input from the form
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
  
    // Write the user data to the Firebase database
    firebase.database().ref('users').push({
      name: name,
      email: email,
      password: password
    });
  
    // Display a confirmation message to the user
    alert('User registered successfully!');
  });
  // Get the user list element
var userList = document.querySelector('#user-list');

// Load the user data from the Firebase database
firebase.database().ref('users').on('value', function(snapshot) {
  var users = snapshot.val();
  var userHtml = '';
  for (var key in users) {
    userHtml += '<div class="user-card">' +
                '<h2>' + users[key].name + '</h2>' +
                '<p><strong>Email:</strong> ' + users[key].email + '</p>' +
                '</div>';
  }
  userList.innerHTML = userHtml;
});
// Firebase Authentication
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // L'utente è autenticato, visualizza la pagina di registrazione
      document.getElementById("registration-form").style.display = "block";
    } else {
      // L'utente non è autenticato, mostra il form di login
      document.getElementById("login-form").style.display = "block";
    }
  });
  
  // Login form submission
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the page from refreshing
  
    // Get user input
    var email = document.getElementById("email-login").value;
    var password = document.getElementById("password-login").value;
  
    // Sign in the user
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Hide the login form and show the registration form
        document.getElementById("login-form").style.display = "none";
        document.getElementById("registration-form").style.display = "block";
      })
      .catch(function(error) {
        // Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Errore durante il login: " + errorMessage);
      });
  });
  
  // Registration form submission
  document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the page from refreshing
  
    // Get user input
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Create a new user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Save the user data to the database
        var userId = userCredential.user.uid;
        var userRef = database.ref("users/" + userId);
        userRef.set({
          username: username,
          email: email
        });
  
        // Clear the registration form
        document.getElementById("registration-form").reset();
      })
      .catch(function(error) {
        // Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Errore durante la registrazione: " + errorMessage);
      });
  });
  
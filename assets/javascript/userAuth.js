  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBMWTK4u_9IMZLWtQMVO3YYWoxGCdXZdsc",
    authDomain: "prown-e0b61.firebaseapp.com",
    databaseURL: "https://prown-e0b61.firebaseio.com",
    storageBucket: "prown-e0b61.appspot.com",
    messagingSenderId: "709868742724"
  };
  firebase.initializeApp(config);
var database = firebase.database()
var auth = firebase.auth()

$(document).ready(function() {
    
    var provider;
    document.getElementById('facebook').onclick = function() {
        provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider);
    }
    document.getElementById('googleP').onclick = function() {
        provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    document.getElementById('submit').addEventListener('click', function() {
        var email = document.getElementById('email').value
        var pw = document.getElementById('password').value        
        auth.signInWithEmailAndPassword(email, pw).catch(e => console.log(e.message))
    })
})
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
    
    document.getElementById('facebook').onclick = function() {
        var provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
        });
    }
    document.getElementById('googleP').onclick = function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
        });
    }
    document.getElementById('submit').addEventListener('click', function() {
        var email = document.getElementById('email').value
        var pw = document.getElementById('password').value        
        auth.signInWithEmailAndPassword(email, pw).catch(e => console.log(e.message))
    })
	var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    ref.onAuth(function(authData) {
		if (authData && isNewUser) {
        // save the user's profile into Firebase so we can list users,
        // use them in Security and Firebase Rules, and show profiles
        ref.child("users").child(authData.uid).set({
			provider: authData.provider,
			name: getName(authData)
			//some more user data
		});
	  }
	});
})
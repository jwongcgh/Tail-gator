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
var signup = function() {
	name = document.getElementById('sub_name').value;
	email = document.getElementById('sub_email').value;
	zip = document.getElementById('sub_zip').value;
	pw = document.getElementById('sub_password').value;
	city = document.getElementById('sub_city').value;
	address = document.getElementById('sub_address').value;
    if (zip.length > 5) {console.log ('nah'); return}
    console.log(zip.length)
    console.log(name,email,zip,pw,address,city)
    database.ref('users/' + email.replace(/\.\w+/,'')).set({
        name: name,
        address: address,
        city: city,
        zip: zip
    })
    auth.createUserWithEmailAndPassword(email, pw).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    })
    $('#sub_signup').prop('disabled',true)
}
var signOut = function() {
    auth.signOut()
    location.reload()
}
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
        var email = document.getElementById('loginEmail').value
        var pw = document.getElementById('loginPW').value        
        auth.signInWithEmailAndPassword(email, pw).catch(e => console.log(e.message))
    })
    auth.onAuthStateChanged(function(user) {
        if(user) {
            $('.signinTab').hide()
            $('.signoutTab').show()
        } else {
            if(window.location.pathname.match('/profile.html')) {
                window.location.assign('index.html')
            }
        }
    })
//	var ref = new firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
//    ref.onAuth(function(authData) {
//		if (authData && isNewUser) {
//        // save the user's profile into Firebase so we can list users,
//        // use them in Security and Firebase Rules, and show profiles
//        ref.child("users").child(authData.uid).set({
//			provider: authData.provider,
//			name: getName(authData)
//			//some more user data
//		});
//		}
//	});
})
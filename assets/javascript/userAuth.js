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
	var fname = document.getElementById('sub_fname').value.toUpperCase();
	var lname = document.getElementById('sub_lname').value.toUpperCase();
	var email = document.getElementById('sub_email').value.toUpperCase();
	var phone = document.getElementById('sub_phone').value;
	var zip = document.getElementById('sub_zip').value;
	var pw = document.getElementById('sub_password').value;
	var city = document.getElementById('sub_city').value.toUpperCase();
	var state = document.getElementById('sub_state').value.toUpperCase();
	var address = document.getElementById('sub_address').value.toUpperCase().match(/\d+\s[A-Za-z]+/);
    var errors = false;
    $('.signup input').each(function() {
        if (!this.value) {
            $(this).addClass('error');
            errors = true;
        }
        if (this.value && $(this).hasClass('error')) {
            $(this).removeClass('error');
        }
    })
    if (!address) {
        $('#sub_address').addClass('error');
        errors = true;
    }
    if (!email.match('@MAIL.COM')) {
        $('#sub_email').addClass('error');
        errors = true;
    }
    if (pw.length < 6) {
        $('#sub_password').addClass('error');
        errors = true;
    }
    if (state.length < 2) {
        $('#sub_state').addClass('error');
        errors = true;
    }
    if (city.length < 4) {
        $('#sub_city').addClass('error');
        errors = true;
    }
    if (errors) {return}
	
    database.ref('users/' + email.replace(/\.\w+/,'')).set({
        fname: fname,
		lname: lname,
		phone: phone,
        email: email,
        address_info: {
			address: address,
			city: city,
			state: state,
			zip: zip
		}
    })
    auth.createUserWithEmailAndPassword(email, pw).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    })
    var reload = setTimeout(function() {window.location.assign('index.html')}, 1000)
	
}
var signOut = function() {
    auth.signOut();
    location.reload();
}

$(document).ready(function() {
	
	//Start sign up mod
    if (window.location.pathname.match('/signup.html')) {
	   $('#sub_phone').mask('(999) 999-9999');
	   $('#sub_zip').mask('99999');
    }
	//End sign up mod

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
        var email = document.getElementById('loginEmail').value;
        var pw = document.getElementById('loginPW').value; 
        auth.signInWithEmailAndPassword(email, pw).catch(e => console.log(e.message))
    })
    auth.onAuthStateChanged(function(user) {
        if(user) {
            $('.signinTab').hide();
            $('#signoutTab').show();
        } else {
            if(window.location.pathname.match('/profile.html')) {
                window.location.assign('index.html');
            }
        }
    })
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

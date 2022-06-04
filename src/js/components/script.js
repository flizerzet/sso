import { throttle, debounce } from "./functions.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";


const firebaseConfig = {
	apiKey: "AIzaSyDpBNIOo6XaeoDbf8SjoOVdG3C42HErWGY",
	authDomain: "single-sign-on-1b34b.firebaseapp.com",
	projectId: "single-sign-on-1b34b",
	storageBucket: "single-sign-on-1b34b.appspot.com",
	messagingSenderId: "599971869618",
	appId: "1:599971869618:web:221e22783154f6b94deaab",
	measurementId: "G-76XKWMTX6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let uid;

const auth = getAuth(app);
function createUser(mail, pass) {
	createUserWithEmailAndPassword(auth, mail, pass)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;

			uid = user.uid;

			writeUserData(user.uid, user.email)
			alert('Вы успешно зарегестрировались')
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			alert('Ошибка ', errorMessage)
		});
}

function loginUser(mail, pass) {
	signInWithEmailAndPassword(auth, mail, pass)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log("🚀 ~ user", user)
			alert('Вы успешно залогинились')

			location.href = "./database.html"
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			alert('Пользователь или пароль неверен. Ошибка ', errorMessage)
		});
}

function writeUserData(userId, email) {
	set(ref(database, 'users/' + userId), {
		email: email,
	});
}

function getUsersDB(userId) {
	const dbRef = ref(getDatabase());

	const database = document.querySelector('.database')

	if (database) {
		get(child(dbRef, `users`)).then((snapshot) => {
			if (snapshot.exists()) {
				// console.log(snapshot.val());

				let items = snapshot.val();
                // console.log("🚀 ~ item", item)

				for (let key in items) {
					let item = document.createElement('div');
					item.textContent = JSON.stringify(items[key]);

					database.appendChild(item)
				}

				// item.forEach(elem => {
				// 	database.appendChild(elem)
				// })
			} else {
				console.log("No data available");
			}
		}).catch((error) => {
			console.error(error);
		});
	}
	
}



/*--------------------Register--------------------*/

const regForm = document.getElementById('register');

if (regForm) {
	regForm.addEventListener('submit', e => {
		const regMail = regForm.querySelector('._register-mail').value;
		const regPass = regForm.querySelector('._register-pass').value;
		const regRepeatPass = regForm.querySelector('._register-repeat-pass').value;
		e.preventDefault()

		if (regPass === regRepeatPass) {
			createUser(regMail, regPass)
		} else {
			alert('Пароли не совпадают!')
		}

	})
}

/*--------------------/Register--------------------*/

/*--------------------Login--------------------*/

const logForm = document.getElementById('login');

if (logForm) {
	logForm.addEventListener('submit', e => {
		const logMail = logForm.querySelector('._login-mail').value;
		const logPass = logForm.querySelector('._login-pass').value;
		e.preventDefault()

		loginUser(logMail, logPass)
	})
}


/*--------------------/Login--------------------*/

/*--------------------RenderDB--------------------*/

const db = document.querySelector('.database');

if (db) {
	getUsersDB()
}

/*--------------------/RenderDB--------------------*/
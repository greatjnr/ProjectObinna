// const keyDede = '41e71c223ac7444e506eb273c6ed4787'
// const keyMy = 'de79e464b2347fc58fe0b20fb76e767d'
// const mailDede = 'ukaegbugreatjunior@gmail.com'

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
  
const firebaseConfig = {
  apiKey: "AIzaSyAg1fTif0myGlTlUKYEDr4hf41Lzz1acOQ",
  authDomain: "contact-form-8071a.firebaseapp.com",
  databaseURL: "https://contact-form-8071a-default-rtdb.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase()
let write = 'true'
const form = document.querySelector('#form')
const dept = form.querySelector('#depts')
const send = form.querySelector('#submit')
const abort = form.querySelector('#cancel')

const loc = window.location.href.replace('join', 'thankyou')

function writeData(dept, name, tel, lga, ward, mail) {
	set(ref(db, `verifiedtel/${tel.value}`), {
		dept
	})
	set(ref(db, `depts/${dept}/${tel.value}`), {
		name: name, lga: lga, ward: ward, mail: mail
	})
	document.location.href = loc
}
function avoidTelDupl(newDept, name, newtel, lga, ward, mail) {
	const dbRef = ref(getDatabase())
	get(child(dbRef, `verifiedtel/`)).then((snapshot) => {
		if (snapshot.exists()) {
			const returnedObj = snapshot.val()
			const telsArray = Object.keys(returnedObj)
			const idx = telsArray.indexOf(newtel)
			if (idx !== -1) {
				var caseVal = returnedObj[telsArray[idx]].dept
				if (caseVal == newDept) {
					writeData(newDept, name, tel, lga, ward, mail)
				} else {
					console.log('You have join before using this number')
					form.reset()
				}
			} else {
				writeData(newDept, name, tel, lga, ward, mail)
			}
		} else {
			writeData(newDept, name, tel, lga, ward, mail)
		}
	}).catch((err)=>{
		console.log(err)
	})
}
const selectedDept = ()=>{
	const options = dept.querySelectorAll('option')
	for (let i=0; i<options.length; i+=1) {
		return options[dept.selectedIndex].text.toUpperCase()
	}
}

form.addEventListener('submit', (e)=>{
	e.preventDefault()

	const name = form.querySelector('#name').value
	const tel = form.querySelector('#tel').value
	const lga = form.querySelector('#lga').value
	const mail = form.querySelector('#mail').value
	const ward = form.querySelector('#ward').value

	avoidTelDupl(selectedDept(), name, tel, lga, ward, mail)

	// var xhr = new XMLHttpRequest()
	// xhr.open('POST', 'https://formsubmit.co/ajax/41e71c223ac7444e506eb273c6ed47')
	// xhr.setRequestHeader('content-type', 'application/json')
	// xhr.onload = function () {
	// 	var resp = JSON.parse(xhr.responseText)
	// 	if (resp.success == 'true') {
	// 		if (document.location.href) {
	// 			document.location.href = loc
	// 		} 
	// 	}
	// }
	// xhr.send(JSON.stringify({
	// 	message: `NAME: ${name.value.toUpperCase()} \nPHONE NUMBER: ${tel.value.toUpperCase()} \nLGA: ${lga.value.toUpperCase()} \nWARD: ${ward.value.toUpperCase()} \nDEPARTMENT: ${selectedDept()}`
	// }))

})


// const inputTel = document.querySelector('#tel');
// function getIp(callback) {
//  fetch('https://ipinfo.io/json?token=<397fa4664086d1>', { headers: { 'Accept': 'application/json' }})
//    .then((resp) => resp.json())
//    .catch(() => {
//      return {
//        country: 'us',
//      };
//    })
//    .then((resp) => callback(resp.country));
// }
// const phoneInput = window.intlTelInput(inputTel, {
//  initialCountry: "auto",
//  preferredCountries: ["us", "co", "in", "de"],
//  geoIpLookup: getIp,
//  utilsScript:
//    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
// });

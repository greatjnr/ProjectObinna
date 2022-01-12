
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
  
const firebaseConfig = {
  apiKey: "AIzaSyAg1fTif0myGlTlUKYEDr4hf41Lzz1acOQ",
  authDomain: "contact-form-8071a.firebaseapp.com",
  databaseURL: "https://contact-form-8071a-default-rtdb.firebaseio.com",
  projectId: "contact-form-8071a",
  storageBucket: "contact-form-8071a.appspot.com",
  messagingSenderId: "975587172934",
  appId: "1:975587172934:web:40ce5b92b2169f4820e047"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase()

import { clearUsedClass } from './generic.js'

const form = document.querySelector('#form')
const dept = form.querySelector('#depts')
const send = form.querySelector('#submit')
const abort = form.querySelector('#cancel')
const errModal = document.querySelector('#err_modal')
const main = document.querySelectorAll('.main')[0];

let name = form.querySelector('#name')
let tel = form.querySelector('#tel')
let lga = form.querySelector('#lga')
let mail = form.querySelector('#mail')
let ward = form.querySelector('#ward')

let pos = form.getBoundingClientRect().top;
const loc = window.location.href.replace('join', 'thankyou')

function sendToMail(dept, name, phone, lga, ward, mail) {
	var xhr = new XMLHttpRequest()
	xhr.open('POST', 'https://formsubmit.co/ajax/41e71c223ac7444e506eb273c6ed47')
	xhr.setRequestHeader('content-type', 'application/json')
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText)
		if (resp.success == 'true') {
			console.log(resp)
			// if (document.location.href) {
			// 	document.location.href = loc
			// } 
		}
	}
	xhr.send(JSON.stringify({
		message: `NAME: ${name.toUpperCase()} \nPHONE NUMBER: ${tel.toUpperCase()} \nLGA: ${lga.toUpperCase()} \nMAIL: ${mail.toUpperCase()} \nWARD: ${ward.toUpperCase()} \nDEPARTMENT: ${selectedDept()}`
	}))
}
function writeData(dept, name, tel, lga, ward, mail) {
	set(ref(db, `verifiedtel/${tel}`), {
		dept
	})
	set(ref(db, `depts/${dept}/${tel}`), {
		name: name, lga: lga, ward: ward, mail: mail
	})
	// sendToMail(dept, name, tel, lga, ward, mail)
	// document.location.href = loc
	form.reset()
}
function showErrorModal(state) {	
	if (state == 'true') {
		var telPos = errModal.parentElement.getBoundingClientRect().top
		// if (String(telPos).includes('-')) {
		main.scrollTop = 350
		// }
		errModal.textContent = 'This number is already assigned to a department'
		errModal.classList.add('animate__animated')
		errModal.classList.add('animate__shakeX')
		errModal.style.display = 'block'

		setTimeout(()=>{
			errModal.classList.add('animated__fadeOut')
			setTimeout(()=>{
				errModal.style.display = 'none'
				errModal.textContent = ''
				clearUsedClass([errModal])
				// form.reset()
			}, 3000)
		}, 2000)
	} else {
		errModal.textContent = ''
		errModal.style.display = 'none'
	}
}
function avoidTelDupl(newDept, name, newtel, lga, ward, mail) {
	const dbRef = ref(db)
	get(child(dbRef, `verifiedtel/`)).then((snapshot) => {
		if (snapshot.exists()) {
			const returnedObj = snapshot.val()
			const telsArray = Object.keys(returnedObj)
			const idx = telsArray.indexOf(newtel)
			if (idx !== -1) {
				var caseVal = returnedObj[telsArray[idx]].dept
				if (caseVal == newDept) {
					writeData(newDept, name, newtel, lga, ward, mail)
				} else {
					showErrorModal('true')
					// console.log('You have join before using this number')
				}
			} else {
				writeData(newDept, name, newtel, lga, ward, mail)
			}
		} else {
			writeData(newDept, name, newtel, lga, ward, mail)
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

	name = form.querySelector('#name').value
	tel = form.querySelector('#tel').value
	lga = form.querySelector('#lga').value
	mail = form.querySelector('#mail').value
	ward = form.querySelector('#ward').value

	avoidTelDupl(selectedDept(), name, tel, lga, ward, mail)

})

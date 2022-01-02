const form = document.querySelector('#form')
const name = form.querySelector('#name')
const tel = form.querySelector('#tel')
const lga = form.querySelector('#lga')
const ward = form.querySelector('#ward')
const dept = form.querySelector('#depts')
const send = form.querySelector('#submit')
const abort = form.querySelector('#cancel')
const loc = window.location.href.replace('join', 'thankyou')

const selectedDept = ()=>{
	const options = dept.querySelectorAll('option')
	for (let i=0; i<options.length; i+=1) {
		return options[dept.selectedIndex].text.toUpperCase()
	}
}

form.addEventListener('submit', (e)=>{
	e.preventDefault()
	var xhr = new XMLHttpRequest()
	xhr.open('POST', 'https://formsubmit.co/ajax/de79e464b2347fc58fe0b20fb76e767d')
	xhr.setRequestHeader('content-type', 'application/json')
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText)
		if (resp.success == 'true') {
			window.location.href = loc
		}
	}
	xhr.send(JSON.stringify({
		message: `NAME: ${name.value.toUpperCase()} \nPHONE NUMBER: ${tel.value.toUpperCase()} \nLGA: ${lga.value.toUpperCase()} \nWARD: ${ward.value.toUpperCase()} \nDEPARTMENT: ${selectedDept()}`
	}))

	//written for nodejs
	// let formData = {
	// 	name: name.value,
	// 	tel: tel.value,
	// 	lga: lga.value,
	// 	ward: ward.value
	// }
	// let xhr = new XMLHttpRequest()
	// xhr.open('POST', '/')
	// xhr.setRequestHeader('content-type', 'application/json')
	// xhr.onloadstart = function () {
	// 	send.setAttribute('disabled', true)
	// 	send.classList.add('disabled')
	// }
	// xhr.onload = function () {
	// 	send.removeAttribute('disabled')
	// 	send.classList.remove('disabled')
	// 	if (xhr.responseText === 'success') {
	// 		alert('Email sent')
	// 		name.value = ''
	// 		tel.value = ''
	// 		lga.value = ''
	// 		ward.value = ''
	// 	} else {
	// 		console.log('Email not sent')
	// 	}
	// }
	// xhr.send(JSON.stringify(formData))
})

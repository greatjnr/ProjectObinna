const form = document.querySelector('#form')
const name = form.querySelector('#name')
const tel = form.querySelector('#tel')
const lga = form.querySelector('#lga')
const ward = form.querySelector('#ward')
const send = form.querySelector('#submit')
const abort = form.querySelector('#cancel')

form.addEventListener('submit', (e)=>{

	e.preventDefault()

	let formData = {
		name: name.value,
		tel: tel.value,
		lga: lga.value,
		ward: ward.value
	}
	let xhr = new XMLHttpRequest()
	xhr.open('POST', '/')
	xhr.setRequestHeader('content-type', 'application/json')
	xhr.onloadstart = function () {
		send.setAttribute('disabled', true)
		send.classList.add('disabled')
	}
	xhr.onload = function () {
		send.removeAttribute('disabled')
		send.classList.remove('disabled')
		if (xhr.responseText === 'success') {
			alert('Email sent')
			name.value = ''
			tel.value = ''
			lga.value = ''
			ward.value = ''
		} else {
			console.log('Email not sent')
		}
	}
	xhr.send(JSON.stringify(formData))
})

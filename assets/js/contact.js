const form = document.querySelector('#form')
const name = document.querySelector('#name')
const tel = document.querySelector('#tel')
const lga = document.querySelector('#lga')
const ward = document.querySelector('#ward')

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
	xhr.onload = function () {
		if (xhr.responseText === 'success') {
			alert('Email sent')
			name.value = ''
			tel.value = ''
			lga.value = ''
			ward.value = ''
		}
	}
	xhr.send(JSON.stringify(formData))
})
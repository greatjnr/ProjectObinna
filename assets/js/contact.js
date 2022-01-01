const form = document.querySelector('#form')
const name = form.querySelector('#name').value.toUpperCase()
const tel = form.querySelector('#tel').value.toUpperCase()
const lga = form.querySelector('#lga').value.toUpperCase()
const ward = form.querySelector('#ward').value.toUpperCase()
const send = form.querySelector('#submit')
const abort = form.querySelector('#cancel')

function stats() {
	window.addEventListener('offline', ()=>{
	    alert('Email not sent as there are problems with your network connectivity')
	})
}

form.addEventListener('submit', (e)=>{
alert("clicked!!!!")
	e.preventDefault()
	fetch("https://formsubmit.co/ajax/de79e464b2347fc58fe0b20fb76e767d", {
	    method: "POST",
	    headers: { 
	        'Content-Type': 'application/json',
	        'Accept': 'application/json'
	    },
	    body: JSON.stringify({
	        message: `NAME: ${name} \nPHONE NUMBER: ${tel} \nLGA: ${lga} \nWARD: ${ward}`
	    })
	})
	    .then(response => response.json())
	    .then(data => {
	    	if (data.success == 'true') {
	    		alert("second!!!!!!")
window.location.href = 'thankyou.html'
	    	} 
	    })
	    .catch(error => {console.log(error)});

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

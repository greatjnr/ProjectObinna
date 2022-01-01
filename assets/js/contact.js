
form.addEventListener('submit', (e)=>{

	e.()
	console.log(name, tel, lga, ward)
	 xhr = new XMLHttpRequest()
	xhr.open('POST', 'https://formsubmit.co/ajax/de79e464b2347fc58fe0b20fb76e767d')
	xhr.setRequestHeader('content-type', 'application/json')
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText)
		if (resp.success == 'true') {
			window.location.href = 'thankyou.html'
		}
	}
	xhr.send(JSON.stringify({
		message: `NAME: ${name
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

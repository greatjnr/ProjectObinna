const form = document.querySelector('#form')
// const name = form.querySelector('#name')
// const tel = form.querySelector('#tel')
// const lga = form.querySelector('#lga')
// const ward = form.querySelector('#ward')
const send = form.querySelector('#submit')
const abort = form.querySelector('#cancel')
const dept = form.querySelector('#depts')

const loc = window.location.href
var newLoc = loc.replace('join', 'thankyou')

const selectedDept = ()=>{
	const options = dept.querySelectorAll('option')
	for (let i=0; i<options.length; i+=1) {
		return options[dept.selectedIndex].text.toUpperCase()
	}
}

form.addEventListener('submit', (e)=>{
	e.preventDefault()
	$.ajax({
	    method: 'POST',
	    url: 'https://formsubmit.co/ajax/your@email.com',
	    dataType: 'json',
	    accepts: 'application/json',
	    data: {
	        name: "FormSubmit",
	        message: `NAME: ${$('#name').val().toUpperCase()} \nPHONE NUMBER: ${$('#tel').val().toUpperCase()} \nLGA: ${$('#lga').val().toUpperCase()} \nWARD: ${$('#ward').val().toUpperCase()} \nDEPARTMENT: ${selectedDept()}`
	    },
	    success: (data) => {
	    	$(location).attr('href', newLoc)
	    },
	    error: (err) => console.log(err)
	});
	

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

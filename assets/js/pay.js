// import {PaystackPop} from "https://js.paystack.co/v1/inline.js"
import {clearUsedClass} from './generic.js'
const btn = document.querySelector('#pay')
const close = document.querySelector('#closeTransfer')
const payPopup = document.querySelector('#payPopup')
const payForm = document.querySelector('#paystackForm')

btn.addEventListener('click', showFormPopup)
payForm.addEventListener('submit', payWithPaystack)
close.addEventListener('click', closeTransfer)

function closeTransfer() {
	payForm.reset()
	payPopup.classList.add('animate__fadeOut')
	payPopup.style.display = 'none'

	clearUsedClass([payPopup])
}

function showFormPopup() {
	// if (payForm.getAttribute('active') == 'true') {
	// 	btn.style.cursor = 'no-drop'
		
	// } else {
	// 	payForm.setAttribute('active', 'true')
	// }
	payPopup.style.display = 'flex'
	payPopup.classList.add('animate__animated')
	payPopup.classList.add('animate__fadeIn')
	// payPopup.setAttribute('active', 'false')
}

function payWithPaystack(e){
	e.preventDefault()
    var handler = PaystackPop.setup({
    key: 'pk_live_62d5df27bdda5f288af973bdf3262e4b24c37e51',
    email: document.querySelector('#payMail').value || 'obe.nwosu@gmail.com',
    amount: document.querySelector('#payAmt').value * 100,
    ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    metadata: {
        custom_fields: [{
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348069144441"
        }]
    },
    callback: function(response) {
        alert('success. transaction ref is ' + response.reference);
    },
    onClose: function() {
        alert('window closed');
    }
});
handler.openIframe();
}
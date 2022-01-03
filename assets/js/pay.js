// import {PaystackPop} from "https://js.paystack.co/v1/inline.js"
const btn = document.querySelector('#pay')

btn.addEventListener('click', payWithPaystack)

function payWithPaystack(){
    var handler = PaystackPop.setup({
    key: 'pk_test_349377ac518d59132eac661f3a3250f29a8026e5',
    email: 'elijaheze777@gmail.com',
    amount: 10000,
    ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    metadata: {
        custom_fields: [{
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678"
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
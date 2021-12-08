
(function() {
	const bankDets = document.querySelector('.mx-1 > .lx:last-of-type')
	const ovlay = document.querySelector('#nav_overlay')
	const box = document.querySelector('#box')
	const navbar = document.querySelector('#navbar')
	const close = document.querySelectorAll('#nav_close > .fa')[0]

	const ul = document.createElement('ul')
	ovlay.querySelector('nav').appendChild(ul)

	//Re-position the box based on the parent position
	box.style.left = (bankDets.offsetLeft + 50) + 'px'
	box.style.top = '-25px'

	function cloneElements() {
		const shadw = document.querySelectorAll('.nav_links > li')
		for (let i = 0; i<shadw.length; i+=1) {
			const shdw_link = shadw[i].querySelector('a');
			const li = document.createElement('li')
			const a = document.createElement('a')
			a.setAttribute('href', shdw_link.getAttribute('href'))
			a.textContent = shdw_link.textContent.toUpperCase()

			li.appendChild(a)
			ul.appendChild(li)
		}
	}// Clones the original nav elements 
	cloneElements()
	
	//handles the nav properties
	navbar.addEventListener('click', function () {
		window.onscroll = function() {
			updatePos(window.scrollY)
		}
		ovlay.style.visibility = 'visible'
	})
	close.addEventListener('click', function () {
		ovlay.style.visibility = 'hidden'
	})
	
	function updatePos(val) {
		ovlay.style.top = val + 'px'
	}//update the overlay position while scrolling
	

	//Handles copy-to-clipboard feature on the bank details
	function details(nodes) {
		var txt = '';
		for (let i = 0; i < nodes.length; i += 1) {
			txt += nodes[i].outerText + '\n'
		}
		navigator.clipboard.writeText(txt)
	}
	bankDets.addEventListener('click', function (e) {
		const nodes = bankDets.querySelectorAll('h4,p')

		box.classList.add('animate__animated')
		box.classList.add('animate__bounceInUp')
		box.style.visibility = 'visible'

		setTimeout(()=>{
			box.classList.add('animate__bounceOutDown')
			box.classList = ['alertBox']
			box.style.visibility = 'hidden'
		}, 2000)
		details(nodes)
	})

})()

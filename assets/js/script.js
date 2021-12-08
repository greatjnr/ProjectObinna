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
		const nav = ovlay.querySelector('nav')
		const a = ovlay.querySelectorAll('a')

		navbar.classList.add('animate__animated')
		navbar.classList.add('animate__fadeOut')

		ovlay.classList.add('animate__animated')
		// close.classList.add('animate__animated')
		nav.classList.add('animate__animated')

		ovlay.classList.add('animate__fadeIn')
		ovlay.style.visibility = 'visible'

		nav.classList.add('animate__fadeInDown')

		for (let i = 0; i<a.length;i+=1) {
			a[i].addEventListener('click', function () {
				hideNav()
			})
		}//hide the overlay when a link is clicked

		setTimeout(()=>{
			ovlay.classList.remove('animate__fadeIn')
			nav.classList.remove('animate__animated')
			nav.classList.remove('animate__fadeInDown')

		}, 1000)//remove the classes in case of next animation
	})
	function hideNav() {
		ovlay.classList.add('animate__fadeOut')

		setTimeout(()=>{
			ovlay.classList.remove('animate__fadeOut')
			ovlay.style.visibility = 'hidden'
		}, 1000)
	}
	close.addEventListener('click', function () {
		hideNav()
		navbar.classList.remove('animate__fadeOut')

	})//hide the overlay when the close elemt is clicked
	
	

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
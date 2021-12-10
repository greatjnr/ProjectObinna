(function() {
	const bankDets = document.querySelector('.mx-1 > .lx:last-of-type')
	const ovlay = document.querySelector('#nav_overlay')
	const box = document.querySelector('#box')
	const navbar = document.querySelector('#navbar')
	const close = document.querySelectorAll('#nav_close > .fa')[0]

	const ul = document.createElement('ul')
	ovlay.querySelector('nav').appendChild(ul)

	//Re-position the box based on the parent position
	

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
	const nav = ovlay.querySelector('nav')
	navbar.addEventListener('click', function () {
		const a = ovlay.querySelectorAll('a')

		navbar.classList.add('animate__animated')
		ovlay.classList.add('animate__animated')
		nav.classList.add('animate__animated')


		if (navbar.getAttribute('active')) {//checks if the nav icon has been clicked to open nav
			navbar.removeAttribute('active')//if user wants to close the nav

			hideNav()//calls hidenav
		} else {
			navbar.setAttribute('active', 'true')//else if user opens the nav

			ovlay.classList.add('animate__slideInRight')	
			ovlay.classList.remove('animate__fadeOut')
			
			ovlay.style.visibility = 'visible'
		}

		for (let i = 0; i<a.length;i+=1) {
			a[i].addEventListener('click', function () {
				hideNav()
			})
		}//hide the overlay when a link is clicked

		setTimeout(()=>{
			ovlay.classList.remove('animate__fadeIn')
			nav.classList.remove('animate__fadeInDown')

		}, 1000)//remove the classes in case of next animation
	})
	function hideNav() {

		nav.classList.add('animate__backOutDown')

		ovlay.classList.remove('animate__slideInRight')
		ovlay.classList.add('animate__fadeOut')

		setTimeout(()=>{
			ovlay.classList.add('animate__fadeOut')
			navbar.classList.remove('animate__fadeOut')
		}, 200)

		setTimeout(()=>{
			ovlay.classList.remove('animate__fadeOut')
			ovlay.style.visibility = 'hidden'
			nav.classList.remove('animate__backOutDown')
		}, 1000)
	}
	close.addEventListener('click', function () {
		hideNav()

	})//hide the overlay when the close elemt/a link is clicked
	
	
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
		
		box.style.left = (bankDets.offsetLeft + 50) + 'px'
		box.style.top = '-25px'
		
		bankDets.classList.add('animate__animated')
		bankDets.classList.add('animate__bounceIn')
		setTimeout(()=>{
			bankDets.classList.remove('animate__bounceIn')
		}, 400)
		

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

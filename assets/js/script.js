(function() {
	const bankDets = document.querySelector('.mx-1 > .lx:last-of-type')
	const ovlay = document.querySelector('#nav_overlay')
	const box = document.querySelector('#box')
	const navbar = document.querySelector('#navbar')
	const close = document.querySelectorAll('#nav_close > .fa')[0]

	box.style.left = (bankDets.offsetLeft + 60) + 'px'
	box.style.top = (bankDets.offsetTop) + 'px'

	navbar.classList.add('animate__animated')
	ovlay.classList.add('animate__animated')
	bankDets.classList.add('animate__animated')
	box.classList.add('animate__animated')

	const ul = document.createElement('ul')
	ovlay.querySelector('nav').appendChild(ul)

	//Re-position the box based on the parent position
	

	function cloneElements() {
		const shadw = document.querySelectorAll('.nav_links > li')
		for (let i = 0; i<shadw.length + 1; i+=1) {
			const li = document.createElement('li')
			const a = document.createElement('a')
			
			if (i >= shadw.length) {
				a.setAttribute('href', '#')
				a.textContent = 'Donate'
			} else {
				const shdw_link = shadw[i].querySelector('a');
				a.setAttribute('href', shdw_link.getAttribute('href'))
				a.textContent = shdw_link.textContent

			}
			li.appendChild(a)
			ul.appendChild(li)
		}

	}// Clones the original nav elements 
	cloneElements()
	
	//handles the nav properties
	const nav = ovlay.querySelector('nav')
	navbar.addEventListener('click', function () {
	nav.classList.add('animate__animated')
		const a = ovlay.querySelectorAll('a')

		if (!navbar.getAttribute('active')) {//if the user opens the nav
			navbar.setAttribute('active', 'true')

			ovlay.classList.add('animate__fadeIn')
			nav.classList.add('animate__fadeIn)	
			ovlay.style.visibility = 'visible'

		} else {
			hideNav()//calls hidenav
		}

		for (let i = 0; i<a.length;i+=1) {
			a[i].addEventListener('click', function () {
				hideNav()
			})
		}//hide the overlay when a link is clicked

	})
	function hideNav() {
		navbar.removeAttribute('active')//if user to closes the nav
		nav.classList.remove('animate__fadeIn')
                nav.classList.add('animate__slideOutDown')

		ovlay.classList.remove('animate__fadeIn')
		ovlay.classList.add('animate__fadeOut')

		setTimeout(()=>{
			ovlay.classList.remove('animate__fadeOut')
			ovlay.style.visibility = 'hidden'
			nav.classList.remove('animate__slideOutDown')
		}, 500)
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
		
		bankDets.classList.add('animate__pulse')
		box.classList.add('animate__rubberBand')
		setTimeout(()=>{
			bankDets.classList.remove('animate__pulse')
			box.style.visibility = 'visible'
		}, 400)
		

		setTimeout(()=>{
			box.classList = ['alertBox']
			box.style.visibility = 'hidden'
		}, 2000)
		details(nodes)
	})

})()

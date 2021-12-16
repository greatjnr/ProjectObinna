(function() {
	const bankDets = document.querySelector('.mx-1 > .lx:last-of-type')
	const ovlay = document.querySelector('#nav_overlay')
	const box = document.querySelector('#box')
	const navbar = document.querySelector('#navbar')
	const close = document.querySelectorAll('#nav_close > .fa')[0]
	const body = document.querySelectorAll('.main')[0]
	const navFill = document.querySelector('#btop')
	const pageFill = document.querySelector('#fill')
	const hero = document.querySelectorAll('.hero')[0]
	const heroH1 = document.querySelectorAll('.hero h1')[0]
	const heroP = document.querySelectorAll('.hero p')[0]
	const header = document.querySelectorAll('.main_header')[0]
	const snaps = document.querySelectorAll('#generic_sec > section.snap')

	box.style.left = (bankDets.offsetLeft + 60) + 'px'
	box.style.top = (bankDets.offsetTop) + 'px'

	const willAnimate = [navbar, ovlay, bankDets, box, heroH1, heroP, hero]
	for (let i=0; i<willAnimate.length; i+=1) {
		willAnimate[i].classList.add('animate__animated')
	}

	window.addEventListener('DOMContentLoaded', ()=>{
		initAnimations()
		handleIntersecting()
	})
	function initAnimations() {
		function animateLev1() {
			pageFill.style.visibility = 'hidden'
			// header.classList.add('animate__slideInDown')
			hero.classList.add('animate__fadeIn')

			heroH1.classList.add('animate__fadeInDown')
			heroP.classList.add('animate__fadeInDown')
		}
		setTimeout(()=>{
			animateLev1()
		}, 500)

		setTimeout(()=>{
			clearUsedClass([header, hero, heroH1, heroP])
		}, 2000)
	}

	/*Refactor*/
	function handleScrolling(argument) {
		const ft = snaps[snaps.length-1]
		if (body.scrollTop >= ft.offsetTop && !ft.classList.contains('animate__zoomIn')) {
			ft.classList.add('animate__animated')
			ft.classList.add('animate__zoomIn')
			ft.style.opacity = 1
		}
	}
	body.addEventListener('scroll', ()=>{
		handleScrolling()
	})
	/**/

	function handleIntersecting() {
		var options = {
			root: body,
			rootMargin: '0px',
			threshold: .2
		}
		
		function callback(e) {
			snaps.forEach(i=>{
				var snap = e[0]
				if (snap.isIntersecting) {
					snap.target.classList.add('animate__animated')
					snap.target.classList.add('animate__zoomIn')
					snap.target.style.opacity = 1
					// snap.target.classList.add('fade-in')
				}
			})
		}
		var observer = new IntersectionObserver(callback, options);
		snaps.forEach(i=>{
			observer.observe(i)
		})
	}


	const ul = document.createElement('ul')
	ovlay.querySelector('nav').appendChild(ul)

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
			body.style.overflowY = 'hidden'
			navFill.classList.add('animate__fadeIn')
			navFill.style.visibility = 'visible'

			navFill.addEventListener('click', ()=>{
				hideNav()
			})

			ovlay.classList.add('animate__fadeIn')
			nav.classList.add('animate__slideInUp')	
			ovlay.style.visibility = 'visible'

			setTimeout(()=>{
				clearUsedClass([nav, ovlay])
			}, 1000)

		} else {
			hideNav()//calls hidenav
		}

		for (let i = 0; i<a.length;i+=1) {
			a[i].addEventListener('click', function () {
				hideNav()
			})
		}//hide the overlay when a link is clicked

	})
	function clearUsedClass(nodes) {
		if (!Array.isArray(nodes)) {
			nodes = [nodes]
		}
		for (let i=0; i<nodes.length; i+=1) {//loop tru the node list
			const cl = Array.from(nodes[i].classList)//convert to iterable
			for (let a=0; a<cl.length; a+=1) {//loop tru the current node classlist
				if (/a*__[^a]/.test(cl[a])) {//check if the current class matches...
					cl.splice(a,1)
				}
			}
			nodes[i].classList = cl.join(' ')//reassign the current node classlist
		}
	}
	function hideNav() {
		clearUsedClass([ovlay, nav, navFill])
		navFill.style.visibility = 'hidden'
		navbar.removeAttribute('active')//if user to closes the nav
		body.style.overflowY = 'scroll'

        // nav.classList.add('animate__slideOutDown')
		ovlay.classList.add('animate__fadeOut')

		setTimeout(()=>{
			clearUsedClass([ovlay, nav])
			ovlay.style.visibility = 'hidden'
		}, 800)
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
		details(nodes)
		
		bankDets.classList.add('animate__pulse')
		box.classList.add('animate__rubberBand')
		box.style.visibility = 'visible'
		setTimeout(()=>{
			clearUsedClass([bankDets, box])
			box.style.visibility = 'hidden'
		}, 1000)
	})

})()

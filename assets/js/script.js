import { respNav, navbar, close, body, navFill, pageFill, clearUsedClass, animateCopyPaste} from "./generic.js"

(function() {
	const box = document.querySelector('#box')
	const hero = document.querySelectorAll('.hero')[0]
	const heroH1 = document.querySelectorAll('.hero h1')[0]
	const heroP = document.querySelectorAll('.hero p')[0]
	const header = document.querySelectorAll('.main_header')[0]
	const snaps = document.querySelectorAll('.generic_sec > .snap')
	const bankDets = document.querySelectorAll('.bank_dets')[0]
    const nodes = bankDets.querySelectorAll('h4,p')

	animateCopyPaste(bankDets, nodes, box)

	const willAnimate = [body, navbar, respNav, bankDets, heroH1, heroP, hero]
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
			hero.classList.add('animate__fadeIn')

			heroH1.classList.add('animate__fadeInDown')
			heroP.classList.add('animate__fadeInDown')
			body.classList.add('animate__fadeIn')
		}
		setTimeout(()=>{
			animateLev1()
		}, 500)

		setTimeout(()=>{
			clearUsedClass([header, hero, heroH1, heroP, body])
		}, 2000)
	}

	/*Refactor*/
	function handleScrolling(argument) {
		const ft = snaps[snaps.length-1]
		if (body.scrollTop >= (ft.offsetTop + 100) && !ft.classList.contains('animate__zoomIn')) {
			ft.classList.add('animate__animated')
			ft.classList.add('animate__fadeIn')
			ft.style.opacity = 1
		}
	}/**/
	
	body.addEventListener('scroll', ()=>{
		handleScrolling()
	})

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
					snap.target.classList.add('animate__fadeIn')
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

})()

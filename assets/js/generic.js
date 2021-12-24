const respNav = document.querySelector('#nav_overlay')
const navbar = document.querySelector('#navbar')
const close = document.querySelectorAll('#nav_close > .fa')[0]
const body = document.querySelectorAll('.main')[0]
const navFill = document.querySelector('#btop')
const pageFill = document.querySelector('#fill')

//Handles copy-to-clipboard feature on the bank details
export function animateCopyPaste(parent, obj, subj) {
    function performCopy() {
        var txt = '';
        for (let i = 0; i < obj.length; i += 1) {
            txt += obj[i].outerText + '\n'
        }
        navigator.clipboard.writeText(txt)
    }
    parent.addEventListener('mouseenter', ()=>{
    	subj.style.visibility = 'visible'
    })
    parent.addEventListener('mouseleave',()=>{
    	subj.style.visibility = 'hidden'
    	subj.textContent = 'Copy'
    	clearUsedClass([subj])
    })
    subj.addEventListener('click', ()=>{
    	performCopy()
    	subj.textContent = 'Copied'
    	subj.classList.add('animate__animated')
    	subj.classList.add('animate__rubberBand')
    })
}
function animateBannerText(argument) {
	
}
function navProp() {
	const winH = window.innerHeight
	if (winH <= 600) {
		// console.log('less then' + winH)
	}
}
navProp()
window.onResize = function(argument) {
	navProp()
}
const ul = document.createElement('ul')
respNav.querySelector('nav').appendChild(ul)

setTimeout(()=>{
	pageFill.style.visibility = 'hidden'
	body.classList.add('animate__animated')
	body.classList.add('animate__fadeIn')
}, 500)
function cloneElements() {
	const shadw = document.querySelectorAll('.nav_links > li')
	for (let i = 0; i<shadw.length + 1; i+=1) {
		const li = document.createElement('li')
		const a = document.createElement('a')
		
		if (i >= shadw.length) {
			a.setAttribute('href', 'donate.html')
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
function hideNav() {
	navbar.removeAttribute('active')//if user to closes the nav
	body.style.overflowY = 'scroll'

	nav.classList.add('animate__fadeOutRight')
	setTimeout(()=>{
		respNav.classList.add('animate__fadeOut')
	}, 90)	
	setTimeout(()=>{
		clearUsedClass([respNav, nav])
		respNav.style.visibility = 'hidden'
	}, 800)
	navFill.style.visibility = 'hidden'
}

const nav = respNav.querySelector('nav')

navbar.addEventListener('click', function () {

	nav.classList.add('animate__animated')
	respNav.classList.add('animate__animated')
	const navLinks = respNav.querySelectorAll('li')

	if (!navbar.getAttribute('active')) {//if the user opens the nav
		navbar.setAttribute('active', 'true')
		body.style.overflowY = 'hidden'
		navFill.style.visibility = 'visible'

		navFill.addEventListener('click', ()=>{
			hideNav()
		})

		respNav.classList.add('animate__fadeIn')
		nav.classList.add('animate__fadeInRight')	
		respNav.style.visibility = 'visible'

		setTimeout(()=>{
			clearUsedClass([nav, respNav])
		}, 1000)

	} else {
		hideNav()
	}

	for (let i = 0; i<navLinks.length;i+=1) {
		navLinks[i].addEventListener('click', function () {
			for (let u=0; u<navLinks.length;u+=1) {
				var link = index=>{
					return navLinks[index].querySelectorAll('a')[0]
				}
				if (u === i && u !== navLinks.length-1) {
					link(u).style.color = '#fff'
				} else if (u === navLinks.length-1) {
					continue
				} else {
					link(u).style.color = '#cdcbcb'
				}
				
			}
			setTimeout(()=>{
				for (let i=0; i<navLinks.length; i+=1) {
					if (i !== navLinks.length-1) {
						navLinks[i].querySelectorAll('a')[0].style.color = '#fff'
					}
				}
				hideNav()
			}, 500)
		})
	}//hide the overlay when a link is clicked

})

// Handle the gallery js
function handleGallery() {
	
}
handleGallery()

export function clearUsedClass(nodes) {
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

close.addEventListener('click', function () {
	hideNav()
})//hide the overlay when the close elemt/a link is clicked

export { respNav, navbar, close, body, navFill, pageFill }
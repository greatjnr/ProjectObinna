import { clearUsedClass } from './generic.js'

const imgBox = document.querySelectorAll('.img_fill')
const imgPop = document.querySelector('#popup_imgMain')
const popup_overlayInner = document.querySelector('.popup_main')
const imgElt = imgPop.querySelectorAll('img')[0]
const popupOverlay = document.querySelectorAll('.popup_overlay')[0]
const btns = document.querySelector('#willShow')
const closeBtn = document.querySelector('#willShow #close')

const willAnimate = [btns, popupOverlay]

function assignClassName(elts, name) {
	for (let i=0; i<elts.length; i+=1) {
		const e = elts[i]
		e.classList.add(name)
	}
}
assignClassName([btns, popupOverlay], 'animate__animated')

btns.style.animationDuration = '.5s'
popupOverlay.style.animationDuration = '.5s'

function showPopupOverlay(e) {
	var i;
	if (e.path[0].localName === 'span') {
		i = 3
	} else {
		i = 2
	}
	const clickedImg = e.path[i].querySelectorAll('img')[0];
	imgElt.src = clickedImg.src
	popupOverlay.classList.add('animate__fadeIn')
	popupOverlay.style.display = 'flex'

	popup_overlayInner.addEventListener('mouseenter', ()=>{
		btns.classList.add('animate__fadeIn')
		setTimeout(()=>{
			clearUsedClass([btns])
		}, 400)
		btns.style.opacity = 1
	})
	popup_overlayInner.addEventListener('mouseleave', ()=>{
		btns.classList.add('animate__fadeOut')
		setTimeout(()=>{
			clearUsedClass([btns])
			btns.style.opacity = 0
		}, 400)
	})
}

function hidePopupOverlay() {
	imgElt.src = ''
	popupOverlay.classList.add('animate__fadeOut')
	setTimeout(()=>{
		popupOverlay.classList.remove('animate__fadeOut')
		popupOverlay.style.display = 'none'
		clearUsedClass(popupOverlay)
	}, 1000)

	imgBox.forEach((elt, idx)=>{
		elt.removeEventListener('click', (e)=>{
			showPopupOverlay(e)
		})
	})
}
closeBtn.addEventListener('click',()=>{
	hidePopupOverlay()
})

imgBox.forEach((elt, idx)=>{
	elt.addEventListener('click', (e)=>{
		showPopupOverlay(e)
	})
})
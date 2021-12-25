import { clearUsedClass } from './generic.js'

const imgBox = document.querySelectorAll('.img_fill')
const imgPop = document.querySelector('#popup_imgMain')
const popupOverlayInner = document.querySelector('.popup_main')
const popupImg = imgPop.querySelectorAll('img')[0]
const popupOverlay = document.querySelector('#popup_wrap')
const btns = document.querySelector('#willShow')
const closeBtn = document.querySelector('#willShow #close')
const nextIcon = document.querySelector('#next')
const prevIcon = document.querySelector('#prev')
var gCount = 0;
var imgUrl = []
imgBox.forEach(i => {
	imgUrl.push(i.nextElementSibling.querySelector('img').src)
})
var urls = [...imgUrl]

function assignClassName(elts, name) {
	for (let i=0; i<elts.length; i+=1) {
		const e = elts[i]
		e.classList.add(name)
	}
}
assignClassName([btns, popupOverlay, imgPop, popupOverlayInner], 'animate__animated')

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
	popupImg.src = clickedImg.src
	popupOverlay.style.display = 'flex'
	popupOverlayInner.classList.add('animate__zoomIn')

	popupOverlayInner.addEventListener('mouseenter', ()=>{
		btns.classList.add('animate__fadeIn')
		setTimeout(()=>{
			clearUsedClass([btns])
		}, 400)
		btns.style.opacity = 1
	})
	popupOverlayInner.addEventListener('mouseleave', ()=>{
		btns.classList.add('animate__fadeOut')
		setTimeout(()=>{
			clearUsedClass([btns])
			btns.style.opacity = 0
		}, 400)
	})
}

function hidePopupOverlay() {
	gCount = 0
	popupImg.src = ''
	imgUrl = urls
	popupOverlay.classList.add('animate__fadeOut')

	setTimeout(()=>{
		popupOverlay.style.display = 'none'
		clearUsedClass([popupOverlay, popupOverlayInner])
	}, 1000)

	imgBox.forEach((elt, idx)=>{
		elt.removeEventListener('click', (e)=>{
			showPopupOverlay(e)
		})
	})
}
popupOverlay.querySelector('#popBg').addEventListener('click',()=>{
	hidePopupOverlay()
})
closeBtn.addEventListener('click',()=>{
	hidePopupOverlay()
})
function shuffleImgUrls(idx) {
	if (idx === imgUrl.length) {idx = 0}
	var newUrls = []
	var numberOfRuns = 0
	for (let i=idx; i<imgUrl.length + idx; i+=1) {
		numberOfRuns += 1
		if (i === imgUrl.length) {i = 0}
		if (numberOfRuns === imgUrl.length + 1) {break}
		newUrls.push(imgUrl[i])
	}
	imgUrl = newUrls
}
document.querySelectorAll('.action').forEach(i => {
	i.addEventListener('click', ()=>{
		imgPop.classList.add('animate__fadeIn')
		setTimeout(()=>{
			clearUsedClass([imgPop])
		}, 500)
	})
})
prevIcon.addEventListener('click', ()=>{
	if (gCount === 0) {gCount = imgUrl.length}
	gCount = gCount - 1
	popupImg.src = imgUrl[gCount]
})
nextIcon.addEventListener('click', ()=>{
	gCount += 1
	if (gCount === imgUrl.length) {gCount = 0}
	popupImg.src = imgUrl[gCount]
})
imgBox.forEach((elt, idx)=>{
	elt.addEventListener('click', (e)=>{
		shuffleImgUrls(idx)
		showPopupOverlay(e)
	})
})
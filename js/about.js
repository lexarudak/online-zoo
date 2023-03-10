import petCards from '/lexarudak-JSFE2022Q3/online-zoo/js/petCards.js'

const burgerButton = document.querySelector('.burgerIcon')
const menu = document.querySelector('.nav')
const headerDarkBg = document.querySelector('.headerDarkBg')
const navUl = document.querySelector('.navUl')
const navXbutton = document.querySelector('.navXbutton')
const petsArrowButtonLeft = document.querySelector('.petsArrowButtonLeft')
const petsArrowButtonRight = document.querySelector('.petsArrowButtonRight')
const animalsRowBottom = document.querySelector('.animalsRowBottom')
const animalsRowTop = document.querySelector('.animalsRowTop')
const rangeInput = document.querySelector('.testimonialsBar')
const testimonialsCards = document.querySelector('.testimonialsCards')
const commentWidth = document.querySelector('.testimonialsCard').clientWidth
const commentPopup = document.querySelector('.commentPopup')
const commentX = document.querySelector('.commentX')

let isAvailable = true
let n




if (window.matchMedia('(min-width: 980px)').matches) {
  n = 3
} else 
  if (window.matchMedia('(min-width: 621px)').matches){
    n = 2
  } else {
    n = 4
}
  


if (window.matchMedia('(min-width: 1400px)').matches) {
  rangeInput.setAttribute('max', '7')
}


// functions

const shuffle = (arr) => {
const arr2 = arr.map((value) => {
    return [Math.random(), value]
  }).sort().map((newValue) => {
      return newValue[1]
    })
  return arr2
}



function makeCard (cardObj) {
  const li = document.createElement('li')
  li.classList.add('petsAnimalCard')
  const petsPhoto = document.createElement('div')
  petsPhoto.classList.add('petsPhoto')
  petsPhoto.style.backgroundImage = cardObj.photo
  const petsDarkBg = document.createElement('div')
  petsDarkBg.classList.add('petsDarkBg')
  const petsPhotoText = document.createElement('div')
  petsPhotoText.classList.add('petsPhotoText')
  const photoName = document.createElement('p')
  photoName.classList.add('btn')
  photoName.innerText = cardObj.name
  const photoNative = document.createElement('p')
  photoNative.classList.add('smallParagraph')
  photoNative.innerText = cardObj.native

  petsPhotoText.append(photoName, photoNative)
  petsDarkBg.append(petsPhotoText)
  petsPhoto.append(petsDarkBg)
  ////

  const petsInfo = document.createElement('div')
  petsInfo.classList.add('petsInfo')
  const infoName = document.createElement('p')
  infoName.classList.add('btn')
  infoName.innerText = cardObj.name
  const infoNative = document.createElement('p')
  infoNative.classList.add('smallParagraph')
  infoNative.innerText = cardObj.native
  const foodIcon = document.createElement('div')
  foodIcon.classList.add('foodIcon', `${cardObj.icon}`)

  petsInfo.append(infoName, infoNative, foodIcon)
  ////

  li.append(petsPhoto, petsInfo)
  return li
}

function addPetCards (cardsCount, className) {
  const newArr = shuffle(petCards)
  
  let i = 0
  while (i < cardsCount) {
    let topCard = makeCard(newArr[i])
    let bottomCard = makeCard(newArr[n + i])
    if (className) {
      topCard.classList.add(className)
      bottomCard.classList.add(className)
    }
      animalsRowTop.append(topCard)
      animalsRowBottom.append(bottomCard)
    i++
  }
}
addPetCards(n, 'active')


const showMenu = () => menu.classList.add('active')
const hideMenu = () => menu.classList.remove('active')
const showHeaderDarkBg = () => headerDarkBg.classList.add('active')
const hideHeaderDarkBg = () => headerDarkBg.classList.remove('active')
const toggleBlockBody = () => document.body.classList.toggle('active')



function hideCard (direction, arr) {
  isAvailable = false

  let i = 0

  while (i < n) {
    arr[i].classList.add(direction)
    arr[i].addEventListener('animationend', function(){
      console.log(this);
      this.remove()
      isAvailable = true
    })
    i++
  }
}

function showCard (direction, arr) {
  let i = 0

  while (i < n) {
    const num = i
    arr[i + n].classList.add(`next${num}`, direction)
    arr[i + n].addEventListener('animationend', function(){
    this.classList.remove(`next${num}`, direction)
    this.classList.add('active')
    })
    i++
  }
}


// listeners

burgerButton.addEventListener('click', showMenu)
burgerButton.addEventListener('click', toggleBlockBody)
burgerButton.addEventListener('click', showHeaderDarkBg)
headerDarkBg.addEventListener('click', hideMenu)
headerDarkBg.addEventListener('click', toggleBlockBody)
headerDarkBg.addEventListener('click', hideHeaderDarkBg)
navXbutton.addEventListener('click', hideMenu)
navXbutton.addEventListener('click', toggleBlockBody)
navXbutton.addEventListener('click', hideHeaderDarkBg)
navUl.addEventListener('click', function(event) {
  if (event.target.classList.contains('navA')) {
    hideMenu()
    hideHeaderDarkBg()
    toggleBlockBody()
  }
})

petsArrowButtonLeft.addEventListener('click', function(){
  if (isAvailable) {
    addPetCards(n)
    const bottomCards = animalsRowBottom.querySelectorAll('.petsAnimalCard')
    const topCards = animalsRowTop.querySelectorAll('.petsAnimalCard')
    hideCard('toRight', topCards)
    hideCard('toRight', bottomCards)
    showCard('fromLeft', topCards)
    showCard('fromLeft', bottomCards)
  }
})

petsArrowButtonRight.addEventListener('click', function(){
  if (isAvailable) {
    addPetCards(n)
    const bottomCards = animalsRowBottom.querySelectorAll('.petsAnimalCard')
    const topCards = animalsRowTop.querySelectorAll('.petsAnimalCard')
    hideCard('toLeft', topCards)
    hideCard('toLeft', bottomCards)
    showCard('fromRight', topCards)
    showCard('fromRight', bottomCards)
  }
})


////////////////////////////////////////////
rangeInput.addEventListener('input', function(){
  testimonialsCards.style.transform = 'translate(' + (-(commentWidth + 29) * rangeInput.value) + 'px)'
})

commentX.addEventListener('click', function() {
  toggleBlockBody()
  commentPopup.classList.remove('active')
})

commentPopup.addEventListener('click', function (event) {
  if (!event.target.closest('.popupCard')) {
      commentPopup.classList.remove('active')
      toggleBlockBody()
    }
})

testimonialsCards.addEventListener('click', function(event) {
  if (window.matchMedia('(max-width: 979px)').matches) {
    if (event.target.closest('.testimonialsCard')) {
      commentPopup.classList.add('active')
      toggleBlockBody()
      let comment = event.target.closest('.testimonialsCard')

      let title = commentPopup.querySelector('.popupCardHeaderTitle')
      let icon = commentPopup.querySelector('.popupCardAva')
      let local = commentPopup.querySelector('.popupCardLocation')
      let date = commentPopup.querySelector('.popupCardDate')
      let text = commentPopup.querySelector('.popupCardBody')

      title.innerHTML = comment.querySelector('.testimonialsCardHeaderTitle').innerHTML
      icon.src = comment.querySelector('.testimonialsCardAva').src
      local.innerHTML = comment.querySelector('.testimonialsCardLocation').innerHTML
      date.innerHTML = comment.querySelector('.testimonialsCardDate').innerHTML
      text.innerHTML = comment.querySelector('.testimonialsCardBody').innerHTML
      
    }
  }
})





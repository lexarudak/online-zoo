const burgerButton = document.querySelector('.burgerIcon')
const menu = document.querySelector('.nav')
const headerDarkBg = document.querySelector('.headerDarkBg')
const navUl = document.querySelector('.navUl')
const navXbutton = document.querySelector('.navXbutton')
const donateForm = document.forms.donateForm
const startRadio = document.getElementById('100')
const numberInput = document.getElementById('numberInput')
const donateRadio = donateForm.querySelectorAll('.donateRadio')


// functions

const showMenu = () => menu.classList.add('active')
const hideMenu = () => menu.classList.remove('active')
const showHeaderDarkBg = () => headerDarkBg.classList.add('active')
const hideHeaderDarkBg = () => headerDarkBg.classList.remove('active')
const toggleBlockBody = () => document.body.classList.toggle('active')
const setAmountValue = (event) => {
  numberInput.value = event.target.value
  event.target.classList.add('active')
  donateRadio.forEach(radio => {
    if (event.target.value !== radio.value) {
      radio.classList.remove('active')
    }
  })
}
const setRadioValue = () => {
  donateRadio.forEach(radio => {
    if (radio.value === numberInput.value) {    
      radio.setAttribute('checked', 'checked')
      radio.classList.add('active')
    } else {
      radio.removeAttribute('checked')
      radio.classList.remove('active')
    }
  })

}


// listeners

donateForm.addEventListener('submit', function(e) {
  e.preventDefault()
})
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
donateForm.addEventListener('change', setAmountValue)
numberInput.addEventListener('input', setRadioValue)
numberInput.addEventListener('input', function(event) {
  if (numberInput.value.length > 4) {
    numberInput.value = numberInput.value.slice(0, 4)
  }
  
})
'use strict'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const container = $('.container')
const forms = $$('form')

const navHeaders = $$('.nav__header')
const navLinks = $$('.nav__link')

const headerIcons = $('.header-icon')
const navBar = $('.nav')

forms.forEach(form => {
  form.addEventListener('click', function (e) {
    e.preventDefault()
  })
})

navHeaders.forEach(navHeader => {
  navHeader.addEventListener('click', function (e) {
    const navContent = e.target.closest('.nav__content')
    const navList = navContent.querySelector('.nav__list')

    if (!navContent || !navList) return
    navContent.classList.toggle('active')
    navList.classList.toggle('active')
  })
})

headerIcons.addEventListener('click', function () {
  navBar.classList.toggle('active')
})

// TODO: handle type of exercise (click to button and show corresponding exercise)
container.addEventListener('click', function (e) {
  if (!e.target.classList.contains('section__btn')) return

  let btnClickedClassName, resultClicked

  const btn = e.target
  const siblingBtns = btn
    .closest('.btn-group')
    .querySelectorAll('.section__btn')

  const results = btn.closest('.section').querySelectorAll('.section__result')

  const btnClassNames = btn.className.split(' ')
  btnClassNames.forEach(item => {
    if (item.includes('btn__')) btnClickedClassName = item.slice(5)
  })

  results.forEach(result => {
    if (result.className.includes(btnClickedClassName)) resultClicked = result
  })

  if (!resultClicked) return

  siblingBtns.forEach(btn => {
    btn.classList.remove('active')
  })
  btn.classList.add('active')

  results.forEach(result => {
    result.classList.remove('active')
  })
  resultClicked.classList.add('active')
})

import { app } from '../../index'

export class ClickChangeView {
  private readonly btns: HTMLElement[]
  window: Window

  constructor () {
    this.btns = Array.from(document.querySelectorAll('.main__view span'))
    this.makeEvent()
    this.window = window
    this.makeChangeWindow()
  }

  makeEvent (): void {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', this.changeView.bind(this))
    })
  }

  makeChangeWindow (): void {
    const smallView = this.btns[0]
    const bigView = this.btns[1]
    function test (): void {
      if (window.innerWidth < 550) {
        if (smallView.classList.contains('active-view')) {
          app.router.url.searchParams.set('big', 'true')
          const bigItemsArr = Array.from(document.querySelectorAll('.main__item'))
          const itemInfoArr = Array.from(document.querySelectorAll('.item__info'))
          itemInfoArr.forEach((el) => el.classList.toggle('info-hidden'))
          bigItemsArr.forEach((el) => el.classList.add('big-item'))
          smallView.classList.remove('active-view')
          bigView.classList.add('active-view')
          app.router.setState(app.router.states[0], app.router.url.search)
        }
        smallView.style.display = 'none'
        bigView.innerHTML = '2x2'
      } else {
        smallView.style.display = 'flex'
        bigView.innerHTML = '4x4'
      }
    }
    this.window.onresize = test
    this.window.onload = test
  }

  changeView (event: Event): void {
    if (!(event.target as HTMLElement).classList.contains('active-view')) {
      const currentActive = document.querySelector(
        '.active-view'
      ) as HTMLElement
      currentActive.classList.remove('active-view')
      ;(event.target as HTMLElement).classList.add('active-view')
      if ((event.target as HTMLElement).classList.contains('view__small')) {
        app.router.url.searchParams.set('big', 'false')
        const bigItemsArr = Array.from(document.querySelectorAll('.big-item'))
        const itemInfoArr = Array.from(document.querySelectorAll('.item__info'))
        itemInfoArr.forEach((el) => el.classList.toggle('info-hidden'))
        bigItemsArr.forEach((el) => el.classList.remove('big-item'))
      } else if (
        (event.target as HTMLElement).classList.contains('view__big')
      ) {
        app.router.url.searchParams.set('big', 'true')
        const bigItemsArr = Array.from(document.querySelectorAll('.main__item'))
        bigItemsArr.forEach((el) => el.classList.add('big-item'))
        const itemInfoArr = Array.from(document.querySelectorAll('.item__info'))
        itemInfoArr.forEach((el) => el.classList.toggle('info-hidden'))
      }
      app.router.setState(app.router.states[0], app.router.url.search)
    }
  }
}

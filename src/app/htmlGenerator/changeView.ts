export class ClickChangeView {
  private readonly btns: HTMLElement[]

  constructor () {
    this.btns = Array.from(document.querySelectorAll('.main__view span'))
    this.makeEvent()
  }

  makeEvent (): void {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', this.changeView.bind(this))
    })
  }

  changeView (event: Event): void {
    if (!(event.target as HTMLElement).classList.contains('active-view')) {
      const currentActive = document.querySelector(
        '.active-view'
      ) as HTMLElement
      currentActive.classList.remove('active-view')
      ;(event.target as HTMLElement).classList.add('active-view')
      if ((event.target as HTMLElement).classList.contains('view__small')) {
        const bigItemsArr = Array.from(document.querySelectorAll('.big-item'))
        const itemInfoArr = Array.from(document.querySelectorAll('.item__info'))
        itemInfoArr.forEach((el) => el.classList.toggle('info-hidden'))
        bigItemsArr.forEach((el) => el.classList.remove('big-item'))
      } else if (
        (event.target as HTMLElement).classList.contains('view__big')
      ) {
        const bigItemsArr = Array.from(document.querySelectorAll('.main__item'))
        bigItemsArr.forEach((el) => el.classList.add('big-item'))
        const itemInfoArr = Array.from(document.querySelectorAll('.item__info'))
        itemInfoArr.forEach((el) => el.classList.toggle('info-hidden'))
      }
    }
  }
}

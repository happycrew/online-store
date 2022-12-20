import './style.scss'
import { App } from './app/app'
import { Loader } from './app/loader/loader'
import { ContentGenerator } from './app/htmlGenerator/contentGenerator'
const loader: Loader = new Loader()
const generator: ContentGenerator = new ContentGenerator()
const app = new App(loader, generator)
app.start().catch((err: Error) => {
  throw new Error(err.message)
})
  .then(() => console.log('App successful running!'))
  .catch(() => 'Something wrong...')

// Test genius function //
let rangeInput: HTMLElement[] = []
rangeInput = document.querySelectorAll('.range-input input') as unknown as HTMLElement[]
let priceInput: HTMLElement[] = []
priceInput = document.querySelectorAll('.price-input input') as unknown as HTMLElement[]
const priceGap = 1

priceInput.forEach(input => {
  input.addEventListener('input', e => {
    const minPrice = parseInt((priceInput[0] as HTMLInputElement).value)
    const maxPrice = parseInt((priceInput[1] as HTMLInputElement).value)
    const maxRangeInputFirst = parseInt((rangeInput[1] as HTMLInputElement).max)
    console.log(e.target, 'target')
    if ((maxPrice - minPrice >= priceGap) && maxPrice <= maxRangeInputFirst) {
      if ((e.target as HTMLElement).className === 'input-min') {
        (rangeInput[0] as HTMLInputElement).value = String(minPrice)
      } else {
        (rangeInput[1] as HTMLInputElement).value = String(maxPrice)
      }
    }
  })
})

rangeInput.forEach(input => {
  input.addEventListener('input', e => {
    const minVal = parseInt((rangeInput[0] as HTMLInputElement).value)
    const maxVal = parseInt((rangeInput[1] as HTMLInputElement).value)
    if ((maxVal - minVal) < priceGap) {
      if ((e.target as HTMLElement).className === 'range-min') {
        const test = maxVal - priceGap;
        (rangeInput[0] as HTMLInputElement).value = String(test)
      } else {
        const test = minVal + priceGap;
        (rangeInput[1] as HTMLInputElement).value = String(test)
      }
    } else {
      (priceInput[0] as HTMLInputElement).value = String(minVal);
      (priceInput[1] as HTMLInputElement).value = String(maxVal)
    }
  })
})

// Resize
const viewButtons = Array.from(document.querySelectorAll('.main__view span'))

viewButtons.forEach(btn => {
  btn.addEventListener('click', event => {
    if (!(event.target as HTMLElement).classList.contains('active-view')) {
      const currentActive = document.querySelector('.active-view') as HTMLElement
      currentActive.classList.remove('active-view');
      (event.target as HTMLElement).classList.add('active-view')
      if ((event.target as HTMLElement).classList.contains('view__small')) {
        const bigItemsArr = Array.from(document.querySelectorAll('.big-item'))
        const itemInfoArr = Array.from(document.querySelectorAll('.item__info'))
        itemInfoArr.forEach((el) => el.classList.toggle('info-hidden'))
        bigItemsArr.forEach((el) => el.classList.remove('big-item'))
      } else if ((event.target as HTMLElement).classList.contains('view__big')) {
        const bigItemsArr = Array.from(document.querySelectorAll('.main__item'))
        bigItemsArr.forEach((el) => el.classList.add('big-item'))
        const itemInfoArr = Array.from(document.querySelectorAll('.item__info'))
        itemInfoArr.forEach((el) => el.classList.toggle('info-hidden'))
      }
    }
  })
}
)

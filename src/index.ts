import './style.scss'
import { App } from './app/app'
import { Loader } from './app/loader/loader'
import { ContentGenerator } from './app/htmlGenerator/contentGenerator'
import { ClickChangeView } from './app/htmlGenerator/changeView'
import { Validation } from './app/htmlGenerator/validator' // add 25.12

const loader: Loader = new Loader()
export const generator: ContentGenerator = new ContentGenerator()
const changeView: ClickChangeView = new ClickChangeView()
const validator: Validation = new Validation() // add 25.12
export const app = new App(loader, generator, changeView, validator)
app
  .start()
  .catch((err: Error) => {
    throw new Error(err.message)
  })
  .then(() => console.log('App successful running!'))
  .catch(() => 'Something wrong...')

window.addEventListener('popstate', (): void => {
  window.history.state === null ? alert('wrong') : app.router.start()
})

// Test genius function //
let rangeInput: HTMLElement[] = []
rangeInput = document.querySelectorAll(
  '.range-input input'
) as unknown as HTMLElement[]
let priceInput: HTMLElement[] = []
priceInput = document.querySelectorAll(
  '.price-input input'
) as unknown as HTMLElement[]
const priceGap = 1

priceInput.forEach((input) => {
  input.addEventListener('input', (e) => {
    const minPrice = parseInt((priceInput[0] as HTMLInputElement).value)
    const maxPrice = parseInt((priceInput[1] as HTMLInputElement).value)
    const maxRangeInputFirst = parseInt((rangeInput[1] as HTMLInputElement).max)
    if (maxPrice - minPrice >= priceGap && maxPrice <= maxRangeInputFirst) {
      if ((e.target as HTMLElement).className === 'input-min') {
        (rangeInput[0] as HTMLInputElement).value = String(minPrice)
      } else {
        (rangeInput[1] as HTMLInputElement).value = String(maxPrice)
      }
    }
  })
})

rangeInput.forEach((input) => {
  input.addEventListener('input', (e) => {
    const minVal = parseInt((rangeInput[0] as HTMLInputElement).value)
    const maxVal = parseInt((rangeInput[1] as HTMLInputElement).value)
    if (maxVal - minVal < priceGap) {
      if ((e.target as HTMLElement).className === 'range-min') {
        const test = maxVal - priceGap
        ;(rangeInput[0] as HTMLInputElement).value = String(test)
      } else {
        const test = minVal + priceGap
        ;(rangeInput[1] as HTMLInputElement).value = String(test)
      }
    } else {
      (priceInput[0] as HTMLInputElement).value = String(minVal)
      ;(priceInput[1] as HTMLInputElement).value = String(maxVal)
    }
  })
})

// Сортировка тест
const selectSort = document.getElementById('selectSort') as HTMLSelectElement

selectSort.addEventListener('change', () => {
  app.router.url.searchParams.has('sort')
    ? app.router.url.searchParams.set('sort', selectSort.value)
    : app.router.url.searchParams.append('sort', selectSort.value)
  app.router.setState(app.router.states[0], app.router.url.search)
  app.router.start()
})

// Cкрыл все блоки кроме корзины
const displayContainer = document.querySelector('.main__container') as HTMLElement
displayContainer.style.display = 'flex'
const cartEmpty = document.querySelector('.main__cart h1') as HTMLHeadingElement
cartEmpty.style.display = 'none'
const displayCart = document.querySelector('.main__cart') as HTMLElement
displayCart.style.display = 'none'
const displayModal = document.querySelector('.main__modal') as HTMLElement
displayModal.style.display = 'none'

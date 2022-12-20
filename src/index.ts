import './style.scss'
import { App } from './app/app'
import { Loader } from './app/loader/loader'
import { ContentGenerator } from './app/htmlGenerator/contentGenerator'
import { ClickChangeView } from './app/htmlGenerator/changeView'

const loader: Loader = new Loader()
const generator: ContentGenerator = new ContentGenerator()
const changeView: ClickChangeView = new ClickChangeView()
const app = new App(loader, generator, changeView)
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

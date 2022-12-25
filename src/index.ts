import './style.scss'
import { App } from './app/app'
import { Loader } from './app/loader/loader'
import { ContentGenerator } from './app/htmlGenerator/contentGenerator'
import { ClickChangeView } from './app/htmlGenerator/changeView'
import { Validation } from './app/htmlGenerator/validator' // add 25.12
import { Product } from './app/types'

const loader: Loader = new Loader()
const generator: ContentGenerator = new ContentGenerator()
const changeView: ClickChangeView = new ClickChangeView()
const validator: Validation = new Validation() // add 25.12
const app = new App(loader, generator, changeView, validator)
app
  .start()
  .catch((err: Error) => {
    throw new Error(err.message)
  })
  .then(() => console.log('App successful running!'))
  .catch(() => 'Something wrong...')

window.addEventListener('popstate', (): void => {
  window.history.state === null ? alert('wrong') : app.startSorting()
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
  switch (selectSort.value) {
    case 'price-ASC': {
      window.history.pushState(
        {
          currentPage: 'sort',
          products: (
            history.state as {
              currentPage: string
              products: Product[]
            }
          ).products
        },
        '',
        '/?sort=price-ASC'
      )
      app.startSorting()
      break
    }
    case 'price-DESC': {
      window.history.pushState(
        {
          currentPage: 'sort',
          products: (
            history.state as {
              currentPage: string
              products: Product[]
            }
          ).products
        },
        '',
        '/?sort=price-DESC'
      )
      app.startSorting()
      break
    }
    case 'rating-ASC': {
      window.history.pushState(
        {
          currentPage: 'sort',
          products: (
            history.state as {
              currentPage: string
              products: Product[]
            }
          ).products
        },
        '',
        '/?sort=rating-ASC'
      )
      app.startSorting()
      break
    }
    case 'rating-DESC': {
      window.history.pushState(
        {
          currentPage: 'sort',
          products: (
            history.state as {
              currentPage: string
              products: Product[]
            }
          ).products
        },
        '',
        '/?sort=rating-DESC'
      )
      app.startSorting()
      break
    }
    case 'discount-ASC': {
      window.history.pushState(
        {
          currentPage: 'sort',
          products: (
            history.state as {
              currentPage: string
              products: Product[]
            }
          ).products
        },
        '',
        '/?sort=discount-ASC'
      )
      app.startSorting()
      break
    }
    case 'discount-DESC': {
      window.history.pushState(
        {
          currentPage: 'sort',
          products: (
            history.state as {
              currentPage: string
              products: Product[]
            }
          ).products
        },
        '',
        '/?sort=discount-DESC'
      )
      app.startSorting()
      break
    }
  }
})

// Cкрыл все блоки кроме корзины
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const displayContainer = document.querySelector('.main__container') as HTMLElement
displayContainer.style.display = 'none'
const cartEmpty = document.querySelector('.main__cart h1') as HTMLHeadingElement
cartEmpty.style.display = 'none'
const displayCart = document.querySelector('.main__cart') as HTMLElement
displayCart.style.display = 'flex'
const displayModal = document.querySelector('.main__modal') as HTMLElement
displayModal.style.display = 'flex'

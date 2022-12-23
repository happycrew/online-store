import './style.scss'
import { App } from './app/app'
import { Loader } from './app/loader/loader'
import { ContentGenerator } from './app/htmlGenerator/contentGenerator'
import { ClickChangeView } from './app/htmlGenerator/changeView'

const loader: Loader = new Loader()
const generator: ContentGenerator = new ContentGenerator()
const changeView: ClickChangeView = new ClickChangeView()
const app = new App(loader, generator, changeView)
app
  .start()
  .catch((err: Error) => {
    throw new Error(err.message)
  })
  .then(() => console.log('App successful running!'))
  .catch(() => 'Something wrong...')

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
    console.log(e.target, 'target')
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
      window.location.href = window.location.origin.concat('/?sort=price-ASC')
      break
    }
    case 'price-DESC': {
      window.location.href = window.location.origin.concat('/?sort=price-DESC')
      break
    }
    case 'rating-ASC': {
      window.location.href = window.location.origin.concat('/?sort=price-ASC')
      break
    }
    case 'rating-DESC': {
      window.location.href = window.location.origin.concat('/?sort=price-DESC')
      break
    }
    case 'discount-ASC': {
      window.location.href = window.location.origin.concat('/?sort=price-ASC')
      break
    }
    case 'discount-DESC': {
      window.location.href = window.location.origin.concat('/?sort=price-DESC')
      break
    }
  }
})

// Cкрыл все блоки кроме корзины
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const displayContainer = document.querySelector('.main__container') as HTMLElement
displayContainer.style.display = 'flex'
const cartEmpty = document.querySelector('.main__cart h1') as HTMLHeadingElement
cartEmpty.style.display = 'none'
const displayCart = document.querySelector('.main__cart') as HTMLElement
displayCart.style.display = 'none'
const displayModal = document.querySelector('.main__modal') as HTMLElement
displayModal.style.display = 'none'

// Попытки в валидацию
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const phoneNumber = document.querySelector('.person-phone input') as HTMLInputElement
const validationBlocks = Array.from(document.querySelectorAll('.modal-form__personal-details div'))
const validationInputs = Array.from(document.querySelectorAll('.modal-form__personal-details div input'))
console.log(validationInputs[1])

function createError (block: HTMLElement): void {
  const divError = document.createElement('div')
  divError.classList.add('error')
  divError.innerHTML = 'error'
  block.append(divError)
}

function deleteError (): HTMLElement {
  const divError = document.querySelector('.error')
  return divError as HTMLElement
}

function validatePhone (phone: string | number): boolean {
  const re = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/
  return re.test(String(phone))
}

// Телефонный номер
phoneNumber.onchange = function (): void {
  const phoneVal = phoneNumber.value
  if (!validatePhone(phoneVal)) {
    console.log('zalupa oshibka')
    if (validationBlocks[1].children.length === 1) {
      createError(validationBlocks[1] as HTMLElement)
    }
  } else {
    console.log('genui')
    if (validationBlocks[1].children.length !== 1) {
      validationBlocks[1].removeChild(deleteError())
    }
  }
}

import './style.scss'
import { App } from './app/app'
import { Loader } from './app/loader/loader'
import { ContentGenerator } from './app/htmlGenerator/contentGenerator'
import { ClickChangeView } from './app/htmlGenerator/changeView'
import { Product } from './app/types'

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

// Попытки в валидацию
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validationInputs = Array.from(
  document.querySelectorAll('.modal-form__personal-details div input')
)
console.log(validationInputs[1])

const phoneNumber = document.querySelector('.person-phone input') as HTMLInputElement
const personName = document.querySelector('.person-name input') as HTMLInputElement
const personAddress = document.querySelector('.person-adress input') as HTMLInputElement
const personEmail = document.querySelector('.person-email input') as HTMLInputElement
const validationBlocks = Array.from(document.querySelectorAll('.modal-form__personal-details div'))
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cardImg = {
  nologo: 'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71',
  mastercard: 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg',
  visa: 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
  americanExpress: 'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg',
  unionPay: 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png'
}
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

function validateName (name: string): boolean {
  const checkName: string[] = name.split(' ')
  let nameFlag = true
  if (checkName.length === 1) {
    return false
  } else {
    checkName.forEach((el) => {
      if (el.length < 3) {
        nameFlag = false
      }
    })
  }
  return nameFlag
}

function validatePhone (phone: string | number): boolean {
  const re = /^[+][0-9]{11}$/
  return re.test(String(phone))
}

function validateAddress (address: string): boolean {
  const checkAddress: string[] = address.split(' ')
  let addressFlag = true
  if (checkAddress.length < 3) {
    return false
  } else {
    checkAddress.forEach((el) => {
      if (el.length < 5) {
        addressFlag = false
      }
    })
  }
  return addressFlag
}

function validateEmail (email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Телефонный номер
phoneNumber.onchange = function (): void {
  const phoneVal = phoneNumber.value
  if (!validatePhone(phoneVal)) {
    console.log('Phone number incorrect')
    if (validationBlocks[1].children.length === 1) {
      createError(validationBlocks[1] as HTMLElement)
    }
  } else {
    console.log('Phone number correct')
    if (validationBlocks[1].children.length !== 1) {
      validationBlocks[1].removeChild(deleteError())
    }
  }
}

// Проверка имени
personName.onchange = function (): void {
  const nameVal = personName.value
  if (!validateName(nameVal)) {
    console.log('Display name incorrect')
    if (validationBlocks[0].children.length === 1) {
      createError(validationBlocks[0] as HTMLElement)
    }
  } else {
    console.log('Display name correct')
    if (validationBlocks[0].children.length !== 1) {
      validationBlocks[0].removeChild(deleteError())
    }
  }
}
// Проверка адреса
personAddress.onchange = function (): void {
  const addressVal = personAddress.value
  if (!validateAddress(addressVal)) {
    console.log('Address incorrect')
    if (validationBlocks[2].children.length === 1) {
      createError(validationBlocks[2] as HTMLElement)
    }
  } else {
    console.log('Address correct')
    if (validationBlocks[2].children.length !== 1) {
      validationBlocks[2].removeChild(deleteError())
    }
  }
}

// Проверка email
personEmail.onchange = function (): void {
  const emailVal = personEmail.value
  if (!validateEmail(emailVal)) {
    console.log('Email incorrect')
    if (validationBlocks[3].children.length === 1) {
      createError(validationBlocks[3] as HTMLElement)
    }
  } else {
    console.log('Email correct')
    if (validationBlocks[3].children.length !== 1) {
      validationBlocks[3].removeChild(deleteError())
    }
  }
}

// Кредитка
const creditCart = document.querySelector('.card__number input') as HTMLInputElement
const creditCartImg = document.querySelector('.card__number img') as HTMLImageElement
// Набираем номер кредитки в формате xxxx xxxx xxxx xxxx и меняет логотип банка
creditCart.addEventListener('input', ev => {
  const numbers = /[0-9]/
  const regExp = /[0-9]{4}/
  // не позволяем ввести ничего, кроме цифр 0-9, ограничиваем размер поля 19-ю символами
  if (((ev as InputEvent).inputType === 'insertText' && !numbers.test(((ev as InputEvent).data) as string)) || creditCart.value.length > 19) {
    creditCart.value = creditCart.value.slice(0, creditCart.value.length - 1)
    return
  }
  // обеспечиваем работу клавиш "backspace","delete"
  const value = creditCart.value
  if ((ev as InputEvent).inputType === 'deleteContentBackward' && regExp.test(value.slice(-4))) {
    creditCart.value = creditCart.value.slice(0, creditCart.value.length - 1)
    return
  }

  // добавяем пробел после 4 цифр подряд
  if (regExp.test(creditCart.value.slice(-4)) && creditCart.value.length < 19) {
    creditCart.value += ' '
  }

  // меняем логотип банка
  switch (creditCart.value[0]) {
    case '3': {
      creditCartImg.src = cardImg.americanExpress
      break
    }
    case '4': {
      creditCartImg.src = cardImg.visa
      break
    }
    case '5': {
      creditCartImg.src = cardImg.mastercard
      break
    }
    case '6': {
      creditCartImg.src = cardImg.unionPay
    }
  }
  if (creditCart.value.length === 0) {
    creditCartImg.src = cardImg.nologo
  }
})

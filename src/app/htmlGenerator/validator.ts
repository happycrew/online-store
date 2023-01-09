export class Validation {
  personName: HTMLInputElement
  phoneNumber: HTMLInputElement
  personAddress: HTMLInputElement
  personEmail: HTMLInputElement
  creditCart: HTMLInputElement
  creditCartData: HTMLInputElement
  bankImage: HTMLImageElement
  validationBlocks: HTMLElement[]
  validationCardBlock: HTMLElement
  cartCVV: HTMLInputElement
  form: HTMLFormElement
  errorCount: number

  constructor () {
    this.personName = document.querySelector(
      '.person-name input'
    ) as HTMLInputElement
    this.makeOnchangeName()
    this.phoneNumber = document.querySelector(
      '.person-phone input'
    ) as HTMLInputElement
    this.makeOnchangePhone()
    this.personAddress = document.querySelector(
      '.person-adress input'
    ) as HTMLInputElement
    this.makeOnchangeAddress()
    this.personEmail = document.querySelector(
      '.person-email input'
    ) as HTMLInputElement
    this.makeOnchangeEmail()
    this.creditCart = document.querySelector(
      '.card__number input'
    ) as HTMLInputElement
    this.makeCreditCartEvent()
    this.makeCreditCartOnchange()
    this.creditCartData = document.querySelector(
      '.card__valid input'
    ) as HTMLInputElement
    this.makeCreditCartDataEvent()
    this.makeCreditCartDataOnchange()
    this.cartCVV = document.querySelector(
      '.card__data input'
    ) as HTMLInputElement
    this.makeCreditCartCVVEvent()
    this.makeCreditCartCVVOnchange()
    this.bankImage = document.querySelector(
      '.card__number img'
    ) as HTMLImageElement
    this.validationBlocks = Array.from(
      document.querySelectorAll('.modal-form__personal-details div')
    )
    this.validationCardBlock = document.querySelector(
      '.modal-form__card-details'
    ) as HTMLElement
    this.form = document.querySelector('form') as HTMLFormElement
    this.formMakeEvent()
    this.errorCount = 0
  }

  formMakeEvent (): void {
    this.form.addEventListener('submit', this.formEvent.bind(this))
  }

  formEvent (event: Event): void {
    function printNumbers (from: number, to: number, block: HTMLElement): void {
      let curr = from

      function go (): void {
        block.innerHTML = `Thanks for your order! Redirect to the store after ${curr} sec.`
        if (curr === to) {
          window.open(window.location.origin)
          clearInterval(timerId)
        }
        curr--
      }
      go()
      const timerId = setInterval(go, 1000)
    }

    event.preventDefault()

    this.validatePersonName()
    this.validatePhoneNumber()
    this.validateAddress()
    this.validateEmail()
    this.validateCreditCart()
    this.validateCreditCartData()
    this.validateCreditCartCVV()

    if (this.errorCount === 0) {
      const headerBasketCount = document.querySelector('.header__total-content') as HTMLElement
      headerBasketCount.innerHTML = '0'
      const headerTotalPrice = Array.from(document.querySelectorAll('.header__total-price span'))
      headerTotalPrice[1].innerHTML = '0'
      const mainCartWrapper = document.querySelector('.main__cart-wrapper') as HTMLElement
      mainCartWrapper.style.display = 'none'
      const mainModalContent = document.querySelector('.main__modal-content') as HTMLElement
      const mainModalFinish = document.querySelector('.main__modal-finish') as HTMLElement
      mainModalContent.style.display = 'none'
      mainModalFinish.style.display = 'block'
      printNumbers(3, 0, mainModalFinish)
    }
  }

  // Методы создания и удаления ошибок в инпутах с персональными данными

  createError (block: HTMLElement): void {
    const divError = document.createElement('div')
    divError.classList.add('error')
    divError.innerHTML = 'error'
    block.append(divError)
  }

  deleteError (block: HTMLElement): HTMLElement {
    const divError = block.querySelector('.error')
    return divError as HTMLElement
  }

  // Методы создания и удаления ошибок в инпутах с данными кредитной карты
  createCardError (block: HTMLElement, errorPlace: string): void {
    const divCardError = document.createElement('div')
    divCardError.classList.add('card__error')
    divCardError.setAttribute('id', errorPlace)
    divCardError.innerHTML = `Card ${errorPlace} - error`
    block.append(divCardError)
  }

  deleteCardError (errorPlace: string): HTMLElement {
    const divCardError = document.getElementById(`${errorPlace}`)
    return divCardError as HTMLElement
  }

  // Валидация display name aka имени пользователя

  makeOnchangeName (): void {
    this.personName.addEventListener('change', this.validatePersonName.bind(this))
    // this.personName.onchange = this.validatePersonName.bind(this)
  }

  validatePersonName (): void {
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

    const nameVal = this.personName.value
    if (!validateName(nameVal)) {
      if (this.validationBlocks[0].children.length === 1) {
        this.createError(this.validationBlocks[0])
        this.errorCount++
      }
    } else {
      if (this.validationBlocks[0].children.length !== 1) {
        this.validationBlocks[0].removeChild(this.deleteError(this.validationBlocks[0]))
        this.errorCount--
      }
    }
  }

  // Валидация телефонного номера
  makeOnchangePhone (): void {
    this.phoneNumber.addEventListener('change', this.validatePhoneNumber.bind(this))
    // this.phoneNumber.onchange = this.validatePhoneNumber.bind(this)
  }

  validatePhoneNumber (): void {
    function validatePhone (phone: string | number): boolean {
      const re = /^[+][0-9]{11}$/
      return re.test(String(phone))
    }

    const phoneVal = this.phoneNumber.value
    if (!validatePhone(phoneVal)) {
      if (this.validationBlocks[1].children.length === 1) {
        this.createError(this.validationBlocks[1])
        this.errorCount++
      }
    } else {
      if (this.validationBlocks[1].children.length !== 1) {
        this.validationBlocks[1].removeChild(this.deleteError(this.validationBlocks[1]))
        this.errorCount--
      }
    }
  }

  // Валидация адреса пользователя
  makeOnchangeAddress (): void {
    this.personAddress.addEventListener('change', this.validateAddress.bind(this))
    // this.personAddress.onchange = this.validateAddress.bind(this)
  }

  validateAddress (): void {
    function validateAddress (address: string): boolean {
      const checkAddress: string[] = address.split(' ')
      if (checkAddress.length < 3) {
        return false
      } else {
        let count = 0
        checkAddress.forEach((el) => {
          if (el.length > 5) {
            count++
          }
        })
        if (count < 3) return false
      }
      return true
    }

    const addressVal = this.personAddress.value
    if (!validateAddress(addressVal)) {
      if (this.validationBlocks[2].children.length === 1) {
        this.createError(this.validationBlocks[2])
        this.errorCount++
      }
    } else {
      if (this.validationBlocks[2].children.length !== 1) {
        this.validationBlocks[2].removeChild(this.deleteError(this.validationBlocks[2]))
        this.errorCount--
      }
    }
  }

  // Валидация электронной почты
  makeOnchangeEmail (): void {
    this.personEmail.addEventListener('change', this.validateEmail.bind(this))
    // this.personEmail.onchange = this.validateEmail.bind(this)
  }

  validateEmail (): void {
    function validateEmail (email: string): boolean {
      const re =
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }

    const emailVal = this.personEmail.value
    if (!validateEmail(emailVal)) {
      if (this.validationBlocks[3].children.length === 1) {
        this.createError(this.validationBlocks[3])
        this.errorCount++
      }
    } else {
      if (this.validationBlocks[3].children.length !== 1) {
        this.validationBlocks[3].removeChild(this.deleteError(this.validationBlocks[3]))
        this.errorCount--
      }
    }
  }

  // Валидация номера кредитной карты пользователя
  makeCreditCartEvent (): void {
    this.creditCart.addEventListener('input', (ev) => {
      const cardImg = {
        nologo:
          'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71',
        mastercard:
          'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg',
        visa: 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
        americanExpress:
          'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg',
        unionPay:
          'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png'
      }
      const numbers = /[0-9]/
      const regExp = /[0-9]{4}/
      // не позволяем ввести ничего, кроме цифр 0-9, ограничиваем размер поля 19-ю символами
      if (
        ((ev as InputEvent).inputType === 'insertText' &&
          !numbers.test((ev as InputEvent).data as string)) ||
        this.creditCart.value.length > 19
      ) {
        this.creditCart.value = this.creditCart.value.slice(
          0,
          this.creditCart.value.length - 1
        )
        return
      }
      // обеспечиваем работу клавиш "backspace","delete"
      const value = this.creditCart.value
      if (
        (ev as InputEvent).inputType === 'deleteContentBackward' &&
        regExp.test(value.slice(-4))
      ) {
        this.creditCart.value = this.creditCart.value.slice(
          0,
          this.creditCart.value.length - 1
        )
        return
      }
      // добавяем пробел после 4 цифр подряд
      if (
        regExp.test(this.creditCart.value.slice(-4)) &&
        this.creditCart.value.length < 19
      ) {
        this.creditCart.value += ' '
      }
      // меняем фотографию банка
      switch (this.creditCart.value[0]) {
        case '3': {
          this.bankImage.src = cardImg.americanExpress
          break
        }
        case '4': {
          this.bankImage.src = cardImg.visa
          break
        }
        case '5': {
          this.bankImage.src = cardImg.mastercard
          break
        }
        case '6': {
          this.bankImage.src = cardImg.unionPay
        }
      }
      if (this.creditCart.value.length === 0) {
        this.bankImage.src = cardImg.nologo
      }
    })
  }

  makeCreditCartOnchange (): void {
    this.creditCart.addEventListener('change', this.validateCreditCart.bind(this))
    // this.creditCart.onchange = this.validateCreditCart.bind(this)
  }

  validateCreditCart (): void {
    function validateCreditCard (creditcard: string): boolean {
      const checkCreditCart: string[] = creditcard.split(' ')
      let creditCardFlag = true
      if (checkCreditCart.length < 4) {
        return false
      } else {
        checkCreditCart.forEach((el) => {
          if (el.length < 4) {
            creditCardFlag = false
          }
        })
      }
      return creditCardFlag
    }

    const creditCardVal = this.creditCart.value
    if (!validateCreditCard(creditCardVal)) {
      if (document.getElementById('number') === null) {
        this.createCardError(this.validationCardBlock, 'number')
        this.errorCount++
      }
    } else {
      if (document.getElementById('number') !== null) {
        this.validationCardBlock.removeChild(this.deleteCardError('number'))
        this.errorCount--
      }
    }
  }

  // Валидация срока действия кредитной карты пользователя
  makeCreditCartDataEvent (): void {
    this.creditCartData.addEventListener('input', (ev) => {
      const numbers = /[0-9]/
      const regExp = /[0-9]{2}/
      // не позволяем ввести ничего, кроме цифр 0-9, ограничиваем размер поля 5 символами
      if (
        ((ev as InputEvent).inputType === 'insertText' &&
          !numbers.test((ev as InputEvent).data as string)) ||
        this.creditCartData.value.length > 5
      ) {
        this.creditCartData.value = this.creditCartData.value.slice(
          0,
          this.creditCartData.value.length - 1
        )
        return
      }
      // обеспечиваем работу клавиш "backspace","delete"
      const value = this.creditCartData.value
      if (
        (ev as InputEvent).inputType === 'deleteContentBackward' &&
        regExp.test(value.slice(-2))
      ) {
        this.creditCartData.value = this.creditCart.value.slice(
          0,
          this.creditCartData.value.length - 1
        )
        return
      }
      // добавяем '/' после 2 цифр подряд
      if (
        regExp.test(this.creditCartData.value.slice(-2)) &&
        this.creditCartData.value.length < 5
      ) {
        this.creditCartData.value += '/'
      }
    })
  }

  makeCreditCartDataOnchange (): void {
    this.creditCartData.addEventListener('change', this.validateCreditCartData.bind(this))
    // this.creditCartData.onchange = this.validateCreditCartData.bind(this)
  }

  validateCreditCartData (): void {
    function validateCardData (data: string): boolean {
      const creditData = data.substring(0, 2)
      let flag = true
      if (data.length < 5) {
        return false
      } else {
        if (Number(creditData) > 12 || Number(creditData) < 1) {
          flag = false
          return false
        }
      }
      return flag
    }

    const dataValue = this.creditCartData.value
    if (!validateCardData(dataValue)) {
      if (document.getElementById('valid thru') === null) {
        this.createCardError(this.validationCardBlock, 'valid thru')
        this.errorCount++
      }
    } else {
      if (document.getElementById('valid thru') !== null) {
        this.validationCardBlock.removeChild(this.deleteCardError('valid thru'))
        this.errorCount--
      }
    }
  }

  // Валидация CVV
  makeCreditCartCVVEvent (): void {
    this.cartCVV.addEventListener('input', (ev) => {
      const numbers = /[0-9]/
      const regExp = /[0-9]{2}/
      // не позволяем ввести ничего, кроме цифр 0-9, ограничиваем размер поля 3 символами
      if (
        ((ev as InputEvent).inputType === 'insertText' &&
          !numbers.test((ev as InputEvent).data as string)) ||
        this.cartCVV.value.length > 3
      ) {
        this.cartCVV.value = this.cartCVV.value.slice(
          0,
          this.cartCVV.value.length - 1
        )
        return
      }
      // обеспечиваем работу клавиш "backspace","delete"
      const value = this.cartCVV.value
      if (
        (ev as InputEvent).inputType === 'deleteContentBackward' &&
        regExp.test(value.slice(-2))
      ) {
        this.cartCVV.value = this.cartCVV.value.slice(
          0,
          this.cartCVV.value.length - 1
        )
      }
    })
  }

  makeCreditCartCVVOnchange (): void {
    this.cartCVV.onchange = this.validateCreditCartCVV.bind(this)
  }

  validateCreditCartCVV (): void {
    function validateCardCvv (data: string): boolean {
      let flag = true
      if (data.length < 3) {
        flag = false
      }
      return flag
    }

    const valueCVV = this.cartCVV.value
    if (!validateCardCvv(valueCVV)) {
      if (document.getElementById('CVV') === null) {
        this.createCardError(this.validationCardBlock, 'CVV')
        this.errorCount++
      }
    } else {
      if (document.getElementById('CVV') !== null) {
        this.validationCardBlock.removeChild(this.deleteCardError('CVV'))
        this.errorCount--
      }
    }
  }
}

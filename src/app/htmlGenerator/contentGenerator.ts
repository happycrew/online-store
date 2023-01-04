import { Product } from '../types'
import { app } from '../../index'

export class Cart {
  headerCart: HTMLElement
  cartCounter: HTMLElement
  totalPrice: HTMLElement[]
  totalPriceCart: HTMLElement
  totalProductsInCart: HTMLElement
  promoCodeInput: HTMLInputElement
  totalPriceCartNewValue: HTMLElement
  promoCodeCount: number
  constructor () {
    this.headerCart = document.querySelector('.header__basket') as HTMLElement
    this.showCart()
    this.cartCounter = document.querySelector(
      '.header__total-content'
    ) as HTMLElement
    this.totalPrice = Array.from(
      document.querySelectorAll('.header__total-price span')
    )
    this.totalPriceCart = document.querySelector('.total-cart__price span') as HTMLElement
    this.totalPriceCartNewValue = document.querySelector('.total-cart__new-price span') as HTMLElement
    this.totalProductsInCart = document.querySelector('.total-cart__products span') as HTMLElement
    this.promoCodeInput = document.querySelector('.total-cart__promocode input') as HTMLInputElement
    this.makeOnChangePromoCode()
    this.promoCodeCount = 0
  }

  promoCodeActive (promo: number): void {
    const allProdsInCart = Array.from(document.querySelectorAll('.cart-item__wrapper'))
    allProdsInCart.forEach((el) => {
      const btnCartPrice = Number(el.querySelector('.product-price')?.innerHTML.slice(8) as string)
      const btnCartPriceOnePromo = Math.floor(btnCartPrice * 0.9)
      const btnCartPriceTwoPromo = Math.floor(btnCartPrice * 0.8)
      const btnCartPlus = el.querySelector('.btnCartPlus') as HTMLButtonElement
      const btnCartMinus = el.querySelector('.btnCartMinus') as HTMLButtonElement
      if (promo === 1) {
        btnCartPlus.onclick = () => {
          const elStock = Number(el.querySelector('.product-stock')?.innerHTML.slice(7) as string)
          const elCount = Number(el.querySelector('.product-controls span')?.innerHTML as string)
          console.log(elStock, ' - Stock', elCount, ' - Count')
          if (elCount === elStock) {
            return false
          } else {
            this.totalPriceCartNewValue.innerHTML = `€ ${(String(Number(this.totalPriceCartNewValue.innerHTML.slice(2)) + btnCartPriceOnePromo))}.00`
          }
        }
        btnCartMinus.onclick = () => {
          this.totalPriceCartNewValue.innerHTML = `€ ${(String(Number(this.totalPriceCartNewValue.innerHTML.slice(2)) - btnCartPriceOnePromo))}.00`
        }
      }
      if (promo === 2) {
        btnCartPlus.onclick = () => {
          const elStock = Number(el.querySelector('.product-stock')?.innerHTML.slice(7) as string)
          const elCount = Number(el.querySelector('.product-controls span')?.innerHTML as string)
          if (elCount === elStock) return
          this.totalPriceCartNewValue.innerHTML = `€ ${(String(Number(this.totalPriceCartNewValue.innerHTML.slice(2)) + btnCartPriceTwoPromo))}.00`
        }
        btnCartMinus.onclick = () => {
          this.totalPriceCartNewValue.innerHTML = `€ ${(String(Number(this.totalPriceCartNewValue.innerHTML.slice(2)) - btnCartPriceTwoPromo))}.00`
        }
      }
    })
  }

  deletePromoCode (elem: HTMLElement, promo: string): void {
    elem.remove()
    const totalPriceNew = document.querySelector('.total-cart__new-price') as HTMLElement
    const totalPrice = document.querySelector('.total-cart__price') as HTMLElement
    const applCodes = document.querySelector('.total-cart__appl-codes') as HTMLElement
    if (applCodes.childElementCount === 1) {
      totalPriceNew.style.display = 'none'
      totalPrice.classList.remove('old-price')
      applCodes.style.display = 'none'
    }
    this.promoCodeCount -= 1
    console.log('Количество активных прокомодов: ', this.promoCodeCount)
    if (this.promoCodeCount === 1) {
      this.totalPriceCartNewValue.innerHTML = `€ ${Math.floor(Number(this.totalPrice[1].innerHTML) * 0.9)}.00`
    }
  }

  addPromoCode (elem: HTMLElement, value: string, promo: string): void {
    const totalPrice = document.querySelector('.total-cart__price') as HTMLElement
    const totalPriceNew = document.querySelector('.total-cart__new-price') as HTMLElement
    // const allPlusProdButtons = Array.from(document.querySelectorAll('.product-controls'))
    totalPrice.classList.add('old-price')
    totalPriceNew.style.display = 'block'
    const parent = document.querySelector('.total-cart__appl-codes') as HTMLElement
    elem.removeAttribute('class')
    elem.classList.add('total-cart__applied-promo')
    elem.classList.add(`${promo}-promo`)
    parent.append(elem)
    parent.style.display = 'block'
    const span = elem.querySelector('span') as HTMLElement
    span.onclick = () => this.deletePromoCode(elem, promo)
    this.promoCodeCount += 1
    console.log('Количество активных прокомодов: ', this.promoCodeCount)
    if (this.promoCodeCount === 1) {
      this.totalPriceCartNewValue.innerHTML = `€ ${Math.floor(Number(this.totalPrice[1].innerHTML) * 0.9)}.00`
      this.promoCodeActive(1)
    } else if (this.promoCodeCount === 2) {
      this.totalPriceCartNewValue.innerHTML = `€ ${Math.floor(Number(this.totalPrice[1].innerHTML) * 0.8)}.00`
      this.promoCodeActive(2)
    }
  }

  createOrDeletePromoCodeDiv (value: string, event: string): void {
    const parent = document.querySelector('.main__total-cart') as HTMLElement
    const before = document.querySelector('.total-cart__promo-example') as HTMLElement
    const elem = document.createElement('div') as HTMLElement
    const span = document.createElement('span') as HTMLElement
    span.innerHTML = 'ADD'
    elem.classList.add('total-cart__promo-value')
    if (event === 'ADD') {
      if (value === 'RS') {
        if ((document.querySelector('.RS') as HTMLElement) !== null) return
        elem.innerHTML = 'Rolling Scopes School - 10% '
        elem.classList.add('RS')
        span.onclick = () => {
          this.addPromoCode(elem, `${elem.innerHTML}`, 'RS')
          span.innerHTML = 'DROP'
        }
        if (document.querySelector('.RS-promo') === null) {
          elem.append(span)
        }
      } else {
        if ((document.querySelector('.EPAM') as HTMLElement) !== null) return
        elem.innerHTML = 'EPAM Systems - 10% '
        elem.classList.add('EPAM')
        span.onclick = () => {
          this.addPromoCode(elem, `${elem.innerHTML}`, 'EPAM')
          span.innerHTML = 'DROP'
        }
        if (document.querySelector('.EPAM-promo') === null) {
          elem.append(span)
        }
      }
      parent.insertBefore(elem, before)
    } else if (event === 'DEL') {
      const divForDelete = document.querySelector('.total-cart__promo-value') as HTMLElement
      if (divForDelete !== null) divForDelete.remove()
    }
  }

  validatePromoCode (): void {
    function validatePromo (promo: string): boolean {
      return !!(promo.toUpperCase() === 'RS' || promo.toUpperCase() === 'EPM')
    }
    const promoValue = this.promoCodeInput.value
    if (!validatePromo(promoValue)) {
      return this.createOrDeletePromoCodeDiv('RS', 'DEL')
    } else {
      return promoValue.toUpperCase() === 'RS' ? this.createOrDeletePromoCodeDiv('RS', 'ADD') : this.createOrDeletePromoCodeDiv('EPAM', 'ADD')
    }
  }

  makeOnChangePromoCode (): void {
    this.promoCodeInput.oninput = this.validatePromoCode.bind(this)
  }

  createProdInCart (): void {
    const mainContainer = document.querySelector(
      '.main__container'
    ) as HTMLElement
    const mainPopup = document.querySelector('.main__popup') as HTMLElement
    const mainCart = document.querySelector('.main__cart') as HTMLElement
    const mainCartItemsLength = (document.querySelector('.main__cart-items') as HTMLElement).childElementCount
    mainContainer.style.display = 'none'
    mainPopup.style.display = 'none'
    mainCart.style.display = 'flex'
    if (mainCartItemsLength === 0) {
      (mainCart.children[0] as HTMLElement).style.display = 'flex';
      (mainCart.children[1] as HTMLElement).style.display = 'none'
    } else {
      (mainCart.children[0] as HTMLElement).style.display = 'none';
      (mainCart.children[1] as HTMLElement).style.display = 'flex'
    }
  }

  showCart (): void {
    this.headerCart.onclick = () => this.createProdInCart()
  }

  changeBtnsCart (product: Product, value: string, stock: number): void {
    const totalPriceNumber = this.totalPrice[1].innerHTML
    const test = document.getElementById(`cart${product.id}`) as HTMLElement
    const countProd = test.querySelector('.product-controls span') as HTMLElement
    if (value === 'add') {
      if (+(countProd.innerHTML) === stock) {
        return
      }
      countProd.innerHTML = String(Number(countProd.innerHTML) + 1)
      this.cartCounter.innerHTML = String(Number(this.cartCounter.innerHTML) + 1)
      this.totalPrice[1].innerHTML = String(Number(totalPriceNumber) + product.price)
      this.totalPriceCart.innerHTML = `€ ${this.totalPrice[1].innerHTML}.00`
      this.totalProductsInCart.innerHTML = this.cartCounter.innerHTML
    } else {
      if (countProd.innerHTML === '1') {
        this.dropProdFromCart(product)
        this.createProdInCart()
        return
      }
      countProd.innerHTML = String(Number(countProd.innerHTML) - 1)
      this.cartCounter.innerHTML = String(Number(this.cartCounter.innerHTML) - 1)
      this.totalPrice[1].innerHTML = String(Number(totalPriceNumber) - product.price)
      this.totalPriceCart.innerHTML = `€ ${this.totalPrice[1].innerHTML}.00`
      this.totalProductsInCart.innerHTML = this.cartCounter.innerHTML
    }
  }

  changeCountAndPrice (product: Product, value: string): void {
    const totalPriceNumber = this.totalPrice[1].innerHTML
    if (value === 'add') {
      this.cartCounter.innerHTML = String(Number(this.cartCounter.innerHTML) + 1)
      this.totalPrice[1].innerHTML = String(Number(totalPriceNumber) + product.price)
      this.totalPriceCart.innerHTML = `€ ${this.totalPrice[1].innerHTML}.00`
      this.totalProductsInCart.innerHTML = this.cartCounter.innerHTML
    } else {
      this.cartCounter.innerHTML = String(Number(this.cartCounter.innerHTML) - 1)
      this.totalPrice[1].innerHTML = String(Number(totalPriceNumber) - product.price)
      this.totalPriceCart.innerHTML = `€ ${this.totalPrice[1].innerHTML}.00`
      this.totalProductsInCart.innerHTML = this.cartCounter.innerHTML
    }
  }

  setProdToCart (product: Product): void {
    // все товары
    const cartItems = document.querySelector('.main__cart-items') as HTMLElement
    // товар, который добавляем
    const cartWrapper = document.createElement('div') as HTMLElement
    cartWrapper.classList.add('cart-item__wrapper')
    cartWrapper.setAttribute('id', `cart${product.id}`)
    const cartItem = document.createElement('div') as HTMLElement
    cartItem.classList.add('cart-item')
    // Cоздаем id (номер товара в списке)
    const cartItemId = document.createElement('div') as HTMLElement
    cartItemId.classList.add('cart-item__id')
    cartItemId.innerHTML = `${cartItems.childElementCount + 1}`
    // Создаем info товара
    const cartItemInfo = document.createElement('div') as HTMLElement
    cartItemInfo.classList.add('cart-item__info')
    // Фото товара
    const itemIMG = document.createElement('img')
    itemIMG.setAttribute('src', `${product.thumbnail}`)
    itemIMG.setAttribute('alt', 'Product img')
    // Details
    const itemDetails = document.createElement('div')
    itemDetails.classList.add('cart-item__detail')
    const detailsClasses = [
      'product-title',
      'product-description',
      'product-other'
    ]
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div')
      div.classList.add(`${detailsClasses[i]}`)
      itemDetails.append(div)
    }
    itemDetails.children[0].innerHTML = `<h3>${product.title}</h3>`
    itemDetails.children[1].innerHTML = product.description
    itemDetails.children[2].innerHTML = `<div>Rating: ${product.rating}</div>
                                         <div>Discount: ${product.discountPercentage}%</div>`
    const cartItemNumberControl = document.createElement('div') as HTMLElement
    cartItemNumberControl.classList.add('cart-item__number-control')
    const numberControlClasses = [
      'product-stock',
      'product-controls',
      'product-price'
    ]
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div')
      div.classList.add(`${numberControlClasses[i]}`)
      cartItemNumberControl.append(div)
    }
    cartItemNumberControl.children[0].innerHTML = `Stock: ${product.stock}`
    cartItemNumberControl.children[1].innerHTML = `<button> + </button>
                                                  <span>1</span>
                                                  <button> - </button>`
    cartItemNumberControl.children[2].innerHTML = `Price: €${product.price}`
    const btnPlus = cartItemNumberControl.children[1].children[0] as HTMLButtonElement
    btnPlus.classList.add('btnCartPlus')
    const btnMinus = cartItemNumberControl.children[1].children[2] as HTMLButtonElement
    btnMinus.classList.add('btnCartMinus')
    // btnPlus.addEventListener('click', function (): void {
    //   this.changeBtnsCart(product, 'add', product.stock, this)
    btnPlus.addEventListener('click', () => this.changeBtnsCart(product, 'add', product.stock))
    // btnPlus.onclick = () => this.changeBtnsCart(product, 'add', product.stock)
    btnMinus.addEventListener('click', () => this.changeBtnsCart(product, 'drop', product.stock))
    // btnMinus.onclick = () => this.changeBtnsCart(product, 'drop', product.stock)
    cartItemInfo.append(itemIMG, itemDetails)
    cartItem.append(cartItemId, cartItemInfo, cartItemNumberControl)
    cartWrapper.append(cartItem)
    cartItems.append(cartWrapper)
    this.changeCountAndPrice(product, 'add')
  }

  dropProdFromCart (product: Product): void {
    const cartItems = document.querySelector('.main__cart-items') as HTMLElement
    const element = document.getElementById(`cart${product.id}`) as HTMLElement
    cartItems.removeChild(element)
    this.changeCountAndPrice(product, 'drop')
  }
}

export class ContentGenerator extends Cart {
  generateBrandItems (products: Product[], element: HTMLElement): void {
    const brands: string[] = []
    products.forEach((el) => {
      if (!brands.includes(el.brand.toString())) {
        brands.push(el.brand.trim())
      }
    })
    brands.sort()
    for (let i = 0; i < brands.length; i++) {
      const child = document.createElement('div') as HTMLElement
      child.classList.add('main__brand-item')
      child.classList.add('item-not-active')
      child.innerHTML = `<input type="checkbox" id="brand${i.toString()}" />
                         <label for="brand${i.toString()}">${brands[i]}</label>
                         <span>(${products.filter(value => value.brand === brands[i]).length}/${app.products.filter(value => value.brand === brands[i]).length})</span>`
      element.append(child)
    }
  }

  generateCategoryItems (categories: string[], element: HTMLElement): void {
    for (let i = 0; i < categories.length; i++) {
      const child = document.createElement('div') as HTMLElement
      child.classList.add('main__category-item')
      child.classList.add('item-not-active')
      child.innerHTML = `<input type="checkbox" id="category${i.toString()}" />
                         <label for="category${i.toString()}">${
        categories[i]
      }</label>
                         <span>(${categories.filter(value => value === categories[i]).length}/${app.products.filter(value => value.category === categories[i]).length})</span>`
      element.append(child)
    }
  }

  generateProductItems (products: Product[], element: HTMLElement): void {
    // create by me
    (document.querySelector('.main__sort-stat') as HTMLElement).innerText = `Found: ${products.length}`
    function createElementInfo (block: HTMLElement, iter: number): void {
      const itemInfo: string[] = [
        'Category',
        'Brand',
        'Price',
        'Discount',
        'Rating',
        'Stock'
      ]
      const itemSpan: string[] = [
        'category',
        'brand',
        'price',
        'discountPercentage',
        'rating',
        'stock'
      ]
      for (let j = 0; j < itemInfo.length; j++) {
        const newP = document.createElement('p') as HTMLElement
        newP.innerHTML = `${itemInfo[j]}: `
        const newSpan = document.createElement('span') as HTMLElement
        const spanContent = itemSpan[j] as keyof Product
        newSpan.innerHTML = products[iter][spanContent] as string
        newP.append(newSpan)
        block.appendChild(newP)
      }
    }
    for (let i = 0; i < products.length; i++) {
      // основной div, который мы добавляем в контейер
      const child = document.createElement('div') as HTMLElement
      child.classList.add('main__item', 'big-item')
      child.id = `product${products[i].id}`
      if (document.getElementById(`cart${products[i].id}`) !== null) {
        child.classList.add('prod-in-cart')
      }
      child.onclick = (ev: Event) => {
        if (ev.target instanceof Element) {
          if (ev.target.id === 'addCartBtn') return false
          const popupBtn = document.querySelector(
            '.product__price-btns button'
          ) as HTMLButtonElement
          document.getElementById(`cart${products[i].id}`) === null
            ? (popupBtn.innerHTML = 'ADD TO CART')
            : (popupBtn.innerHTML = 'DROP FROM CART')
        }
        app.router.setState(app.router.states[2], `/product-details/${products[i].id}`)
        app.router.start()
      }
      // div с товаром
      const mainProductItem = document.createElement('div') as HTMLElement
      mainProductItem.classList.add('main__product-item')
      // оболочка для товара + его бекграунд
      const mainWrapper = document.createElement('div') as HTMLElement
      mainWrapper.classList.add('main__wrapper')
      mainWrapper.style.background = `url(${products[i].thumbnail}) 0% 0% / cover`
      // создаем div, в который мы положим title товара и блок с информацией о нем
      const mainItemText = document.createElement('div') as HTMLElement
      mainItemText.classList.add('main__item-text')
      // создаем div с названием продукта и добавляем ему параметры
      const itemTitle = document.createElement('div') as HTMLElement
      itemTitle.classList.add('item__title')
      itemTitle.innerHTML = `${products[i].title}`
      // создаем div item__info, в который мы кладем div обертку item__info-item
      const itemInfo = document.createElement('div') as HTMLElement
      itemInfo.classList.add('item__info')
      const itemInfoItem = document.createElement('div') as HTMLElement
      itemInfoItem.classList.add('item__info-item')
      /* добавляем характеристики товара */
      createElementInfo(itemInfoItem, i)
      // добавили информацию в item__info
      itemInfo.append(itemInfoItem)
      // делаем блок с кнопками, по аналогии создаем кнопки, закидываем их в другой блок
      const mainItemBtns = document.createElement('div') as HTMLElement
      mainItemBtns.classList.add('main__item-btns')
      const itemBtn1 = document.createElement('button') as HTMLElement
      itemBtn1.setAttribute('id', 'addCartBtn')
      document.getElementById(`cart${products[i].id}`) === null
        ? (itemBtn1.innerHTML = 'ADD TO CART')
        : (itemBtn1.innerHTML = 'DROP FROM CART')
      // itemBtn1.innerHTML = 'ADD TO CART'
      itemBtn1.onclick = (ev) => this.addProdToCartCount(ev, products[i])
      const itemBtn2 = document.createElement('button') as HTMLElement
      itemBtn2.innerHTML = 'DETAILS'
      // устраиваем матрешку, закидываем одно в другое затем в третье
      mainItemBtns.append(itemBtn1, itemBtn2)
      mainItemText.append(itemTitle, itemInfo)
      mainWrapper.append(mainItemText, mainItemBtns)
      mainProductItem.append(mainWrapper)
      child.append(mainProductItem)
      // закидываем получившийся товар в блок с товарами, балдеем
      element.append(child)
    }
  }

  showSingleProduct (product: Product): void {
    const element: HTMLElement = document.querySelector(
      '.main__popup'
    ) as HTMLElement
    element.setAttribute('id', `${product.id.toString()}`)
    const mainContainer = document.querySelector(
      '.main__container'
    ) as HTMLElement
    element.style.display = 'flex' as string
    mainContainer.style.display = 'none'
    ;(element.firstChild?.nextSibling as HTMLElement).onclick = () => {
      window.history.back()
      element.style.display = 'none'
      mainContainer.style.display = 'flex'
    }
    // Меняем navigation
    const navPopup = Array.from(
      document.querySelectorAll('.main__popup-navigation a')
    )
    navPopup[1].innerHTML = product.category.toUpperCase()
    navPopup[2].innerHTML = product.brand.toUpperCase()
    navPopup[3].innerHTML = product.title.toUpperCase()
    // Меняем title окна товара
    const titleProduct = document.querySelector(
      '.main__popup-detail h3'
    ) as HTMLElement
    titleProduct.innerHTML = product.title
    // Меняем данные в описании товара
    const productDetails = Array.from(
      document.querySelectorAll('.product__detail p')
    )
    productDetails[0].innerHTML = product.description
    productDetails[1].innerHTML = String(product.discountPercentage)
    productDetails[2].innerHTML = String(product.rating)
    productDetails[3].innerHTML = String(product.stock)
    productDetails[4].innerHTML = product.brand
    productDetails[5].innerHTML = product.category
    // Меняем цену
    const productPrice = document.querySelector(
      '.product__price-btns span'
    ) as HTMLElement
    // Вешаем обработчик на кнопку
    const productAddBtn = document.querySelector(
      '.product__price-btns button'
    ) as HTMLButtonElement
    productAddBtn.onclick = (ev) => this.addProdToCartCount(ev, product)
    productPrice.innerHTML = `€${product.price}`
    // Меняем изображение
    const productSlide = document.querySelector('.popup__slide') as HTMLElement
    productSlide.innerHTML = ''
    for (let i = 0; i < product.images.length; i++) {
      const productImg = document.createElement('img') as HTMLElement
      ;(productImg as HTMLImageElement).src = `${product.images[i]}`
      productSlide.append(productImg)
    }
    const productBigImg = document.querySelector(
      '.popup__big-photo img'
    ) as HTMLImageElement
    productBigImg.src = `${product.thumbnail}`
    // Cмена изображения при клике
    const sliderImgs = Array.from(
      document.querySelectorAll('.popup__slide img')
    )
    sliderImgs.forEach((img) => {
      img.addEventListener('click', (): void => {
        productBigImg.src = `${(img as HTMLImageElement).src}`
      })
    })
  }

  addProdToCartCount (ev: Event, product: Product): void {
    const pressedBtn = ev.target as HTMLButtonElement
    const idPopup = document
      .querySelector('.main__popup')
      ?.getAttribute('id') as string
    const mainProd = document.getElementById(`product${idPopup}`) as HTMLElement
    if (
      (document.querySelector('.main__popup') as HTMLElement).style.display ===
      'flex'
    ) {
      const mainProdBtn = mainProd.querySelector(
        '.main__item-btns button'
      ) as HTMLButtonElement
      if (!mainProd.classList.contains('prod-in-cart')) {
        mainProd.classList.toggle('prod-in-cart')
        pressedBtn.innerHTML = 'Drop from cart'.toUpperCase()
        mainProdBtn.innerHTML = 'Drop from cart'.toUpperCase()
        this.setProdToCart(product)
      } else {
        mainProd.classList.toggle('prod-in-cart')
        pressedBtn.innerHTML = 'Add to cart'.toUpperCase()
        mainProdBtn.innerHTML = 'Add to cart'.toUpperCase()
        this.dropProdFromCart(product)
      }
    } else {
      if (
        !(pressedBtn.closest('.main__item') as HTMLElement).classList.contains(
          'prod-in-cart'
        )
      ) {
        (pressedBtn.closest('.main__item') as HTMLElement).classList.toggle(
          'prod-in-cart'
        )
        pressedBtn.innerHTML = 'Drop from cart'.toUpperCase()
        this.setProdToCart(product)
      } else {
        (pressedBtn.closest('.main__item') as HTMLElement).classList.toggle(
          'prod-in-cart'
        )
        pressedBtn.innerHTML = 'Add to cart'.toUpperCase()
        this.dropProdFromCart(product)
      }
    }
  }
}

import { Product } from '../types'
import { app } from '../../index'

export class ContentGenerator {
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
      child.classList.add('item-active')
      child.innerHTML = `<input type="checkbox" id="brand${i.toString()}" />
                         <label for="${i.toString()}">${brands[i]}</label>
                         <span>(0/3)</span>`
      element.append(child)
    }
  }

  generateCategoryItems (categories: string[], element: HTMLElement): void {
    for (let i = 0; i < categories.length; i++) {
      const child = document.createElement('div') as HTMLElement
      child.classList.add('main__category-item')
      child.classList.add('item-not-active')
      child.innerHTML = `<input type="checkbox" id="category${i.toString()}">
                           <label for="category${i.toString()}">${categories[
        i
      ].toString()}</label>
                           <span>(${i.toString()}/${categories.length.toString()})</span>`
      element.append(child)
    }
  }

  generateProductItems (products: Product[], element: HTMLElement): void {
    // create by me
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
      child.onclick = (ev: Event, id?: string) => {
        if (ev.target instanceof Element) {
          if (ev.target.id === 'addCartBtn') return false
        }
        const elem = ev.target as HTMLElement
        const idNumber = (elem.closest('.main__item')?.getAttribute('id')?.slice(7)) as string
        app.router.setState(app.router.states[2], `?product=${i}`)
        this.showSingleProduct(products[i], idNumber)
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
      itemBtn1.innerHTML = 'ADD TO CART'
      itemBtn1.onclick = (ev) => this.addProdToCart(ev, products[i])
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

  showSingleProduct (product: Product, id?: string): void {
    const element: HTMLElement = document.querySelector(
      '.main__popup'
    ) as HTMLElement
    element.setAttribute('id', id as string)
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
    const productAddBtn = document.querySelector('.product__price-btns button') as HTMLButtonElement
    productAddBtn.onclick = (ev) => this.addProdToCart(ev, product)
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

  addProdToCart (ev: Event, product: Product): void {
    // Количество товаров в корзине
    const cartCounter = document.querySelector('.header__total-content') as HTMLElement
    // Общая сумма
    const totalPrice = Array.from(document.querySelectorAll('.header__total-price span'))
    const totalPriceNumber = totalPrice[1].innerHTML
    // Ищем родителя кнопки, по которой клацнули
    const pressedBtn = ev.target as HTMLButtonElement
    if ((document.querySelector('.main__popup') as HTMLElement).style.display === 'flex') {
      const id = document.querySelector('.main__popup')?.getAttribute('id') as string
      const mainProd = document.getElementById(`product${id}`) as HTMLElement
      const mainProdBtn = mainProd.querySelector('.main__item-btns button') as HTMLButtonElement
      if (!(mainProd.classList.contains('prod-in-cart'))) {
        mainProd.classList.toggle('prod-in-cart')
        pressedBtn.innerHTML = 'Drop from cart'.toUpperCase()
        mainProdBtn.innerHTML = 'Drop from cart'.toUpperCase()
        cartCounter.innerHTML = String(Number(cartCounter.innerHTML) + 1)
        totalPrice[1].innerHTML = String(Number(totalPriceNumber) + product.price)
      } else {
        mainProd.classList.toggle('prod-in-cart')
        pressedBtn.innerHTML = 'Add to cart'.toUpperCase()
        mainProdBtn.innerHTML = 'Add to cart'.toUpperCase()
        cartCounter.innerHTML = String(Number(cartCounter.innerHTML) - 1)
        totalPrice[1].innerHTML = String(Number(totalPriceNumber) - product.price)
      }
    } else {
      const popupBtn = document.querySelector('.product__price-btns button') as HTMLButtonElement
      if (!(pressedBtn.closest('.main__item') as HTMLElement).classList.contains('prod-in-cart')) {
        (pressedBtn.closest('.main__item') as HTMLElement).classList.toggle('prod-in-cart')
        pressedBtn.innerHTML = 'Drop from cart'.toUpperCase()
        popupBtn.innerHTML = 'Drop from cart'.toUpperCase()
        cartCounter.innerHTML = String(Number(cartCounter.innerHTML) + 1)
        totalPrice[1].innerHTML = String(Number(totalPriceNumber) + product.price)
      } else {
        (pressedBtn.closest('.main__item') as HTMLElement).classList.toggle('prod-in-cart')
        pressedBtn.innerHTML = 'Add to cart'.toUpperCase()
        popupBtn.innerHTML = 'Add to cart'.toUpperCase()
        cartCounter.innerHTML = String(Number(cartCounter.innerHTML) - 1)
        totalPrice[1].innerHTML = String(Number(totalPriceNumber) - product.price)
      }
    }
  }
}

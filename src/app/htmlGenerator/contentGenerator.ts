import { Product } from '../types'

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
    for (let i = 0; i < products.length; i++) {
      // основной div, который мы добавляем в контейер
      const child = document.createElement('div') as HTMLElement
      child.classList.add('main__item', 'big-item')
      child.id = `product${products[i].id}`
      child.onclick = () => {
        window.location.href = window.location.origin.concat(
          `?product=${products[i].id}`
        )
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
      // создаем div item__info, в который мы положем div обертку item__info-item
      const itemInfo = document.createElement('div') as HTMLElement
      itemInfo.classList.add('item__info')
      const itemInfoItem = document.createElement('div') as HTMLElement
      itemInfoItem.classList.add('item__info-item')
      /* бежим по циклу, на каждой итерации добавляем один из пунктов характеристик товара
      через switch-case */
      for (let j = 0; j < 6; j++) {
        switch (j) {
          case 0: {
            const newP = document.createElement('p') as HTMLElement
            newP.innerHTML = 'Category: '
            const newSpan = document.createElement('span') as HTMLElement
            newSpan.innerHTML = `${products[i].category}`
            newP.append(newSpan)
            itemInfoItem.appendChild(newP)
            break
          }
          case 1: {
            const newP = document.createElement('p') as HTMLElement
            newP.innerHTML = 'Brand: '
            const newSpan = document.createElement('span') as HTMLElement
            newSpan.innerHTML = `${products[i].brand}`
            newP.append(newSpan)
            itemInfoItem.appendChild(newP)
            break
          }
          case 2: {
            const newP = document.createElement('p') as HTMLElement
            newP.innerHTML = 'Price: '
            const newSpan = document.createElement('span') as HTMLElement
            newSpan.innerHTML = `${products[i].price}`
            newP.append(newSpan)
            itemInfoItem.appendChild(newP)
            break
          }
          case 3: {
            const newP = document.createElement('p') as HTMLElement
            newP.innerHTML = 'Discount: '
            const newSpan = document.createElement('span') as HTMLElement
            newSpan.innerHTML = `${products[i].discountPercentage}`
            newP.append(newSpan)
            itemInfoItem.appendChild(newP)
            break
          }
          case 4: {
            const newP = document.createElement('p') as HTMLElement
            newP.innerHTML = 'Rating: '
            const newSpan = document.createElement('span') as HTMLElement
            newSpan.innerHTML = `${products[i].rating}`
            newP.append(newSpan)
            itemInfoItem.appendChild(newP)
            break
          }
          case 5: {
            const newP = document.createElement('p') as HTMLElement
            newP.innerHTML = 'Stock: '
            const newSpan = document.createElement('span') as HTMLElement
            newSpan.innerHTML = `${products[i].stock}`
            newP.append(newSpan)
            itemInfoItem.appendChild(newP)
            break
          }
        }
      }
      // добавили информацию в item__info
      itemInfo.append(itemInfoItem)
      // делаем блок с кнопками, по аналогии создаем кнопки, закидываем их в другой блок
      const mainItemBtns = document.createElement('div') as HTMLElement
      mainItemBtns.classList.add('main__item-btns')
      const itemBtn1 = document.createElement('button') as HTMLElement
      itemBtn1.innerHTML = 'ADD TO CART'
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
    const mainContainer = document.querySelector(
      '.main__container'
    ) as HTMLElement
    element.style.display = 'flex' as string
    mainContainer.style.display = 'none'
    ;(element.firstChild?.nextSibling as HTMLElement).onclick = () => {
      element.style.display = 'none'
      mainContainer.style.display = 'flex'
    }
    // TODO: тут позакидывать  из переменной product: Product в форму всплывающего окна
    console.log(product)
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
}

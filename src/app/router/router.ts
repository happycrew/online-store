import { Product } from '../types'
import { app, cartGenerator, generator, loadBlock } from '../../index'

export class Router {
  url: URL
  readonly states: string[] = ['home', 'cart', 'product', 'error']
  productsBlock = document.querySelector('.main__product-items') as HTMLElement

  constructor () {
    this.url = new URL(window.location.href)
    if (this.url.search.includes('?product-details=')) {
      this.setState(this.states[2], this.url.pathname.concat(this.url.search))
    } else if (this.url.search.includes('cart')) {
      this.setState(this.states[1], this.url.pathname.concat(this.url.search))
    } else if (
      this.url.search === '' ||
      this.url.search.includes('sort=') ||
      this.url.search.includes('category=') ||
      this.url.search.includes('brand=') ||
      this.url.search.includes('big=') ||
      this.url.search.includes('stock=') ||
      this.url.search.includes('price=')
    ) {
      this.setState(this.states[0], this.url.pathname.concat(this.url.search))
    } else {
      this.setState(this.states[3], this.url.pathname.concat(this.url.search))
    }
  }

  setState (state: string, url: string): void {
    history.pushState(state, '', url)
  }

  filterProducts (
    products: Product[],
    brands: string[],
    categories: string[]
  ): Product[] {
    if (brands.length > 0 && categories.length > 0) {
      return products
        .filter((value) => categories.includes(value.category))
        .filter((value) => brands.includes(value.brand))
    } else {
      return brands.length > 0
        ? products.filter((value) => brands.includes(value.brand))
        : products.filter((value) => categories.includes(value.category))
    }
  }

  getSortingMethod (url: URL): string {
    if (url.search.includes('sort=price')) {
      return url.search.includes('-DESC') ? 'price-DESC' : 'price-ASC'
    }
    if (url.search.includes('sort=rating')) {
      return url.search.includes('-DESC') ? 'rating-DESC' : 'rating-ASC'
    }
    if (url.search.includes('sort=discount')) {
      return url.search.includes('-DESC') ? 'discount-DESC' : 'discount-ASC'
    }
    this.setState(this.states[3], this.url.pathname.concat(this.url.search))
    return ''
  }

  sortProducts (arr: Product[], sortingMethod: string): Product[] {
    if (sortingMethod.includes('price')) {
      return sortingMethod.includes('DESC')
        ? arr.sort((a: Product, b: Product) => (a.price < b.price ? 1 : -1))
        : arr.sort((a: Product, b: Product) => (a.price > b.price ? 1 : -1))
    }
    if (sortingMethod.includes('rating')) {
      return sortingMethod.includes('DESC')
        ? arr.sort((a: Product, b: Product) => (a.rating < b.rating ? 1 : -1))
        : arr.sort((a: Product, b: Product) => (a.rating > b.rating ? 1 : -1))
    }
    return sortingMethod.includes('DESC')
      ? arr.sort((a: Product, b: Product) =>
        a.discountPercentage > b.discountPercentage ? 1 : -1
      )
      : arr.sort((a: Product, b: Product) =>
        a.discountPercentage < b.discountPercentage ? 1 : -1
      )
  }

  clickBCListener (ev: MouseEvent, CB: string): void {
    if ((ev.target as HTMLElement).hasAttribute('for')) {
      ev.stopImmediatePropagation()
    } else {
      const element = (ev.target as HTMLElement).parentElement as HTMLElement
      const arr = Array.from(element.children) as HTMLElement[]
      const inputElement = arr[0] as HTMLInputElement
      inputElement.checked
        ? element.classList.remove('item-not-active')
        : element.classList.add('item-not-active')
      inputElement.checked
        ? this.url.searchParams.append(CB, arr[1].innerText)
        : this.removeSearchParam(CB, arr[1].innerText)
      this.setState(
        this.states[0],
        this.url.search.length > 0 ? this.url.pathname.concat(this.url.search) : this.url.pathname
      )
      this.start()
    }
  }

  addListenersForRouting (): void {
    // popstate listener back or forward button
    window.addEventListener('popstate', (): void => {
      if (window.history.state === null) this.setState(this.states[0], app.router.url.pathname)
      app.router.start()
    })
    // sorting listener
    const selectSort = document.getElementById(
      'selectSort'
    ) as HTMLSelectElement
    selectSort.addEventListener('change', () => {
      app.router.url.searchParams.has('sort')
        ? app.router.url.searchParams.set('sort', selectSort.value)
        : app.router.url.searchParams.append('sort', selectSort.value)
      app.router.setState(app.router.states[0], app.router.url.pathname.concat(app.router.url.search))
      app.router.start()
    })
    // category select listener
    app.categoriesBlock.addEventListener('click', (ev) => {
      this.clickBCListener(ev, 'category')
    })
    // brand select listener
    app.brandsBlock.addEventListener('click', (ev) => {
      this.clickBCListener(ev, 'brand')
    })
    const setPrice = (): void => {
      this.url.searchParams.set(
        'price',
        `${(document.querySelector('.input-min') as HTMLInputElement).value}↕${
          (document.querySelector('.input-max') as HTMLInputElement).value
        }`
      )
      this.setState(this.states[0], this.url.pathname.concat(this.url.search))
      this.start()
    }
    const setStock = (): void => {
      this.url.searchParams.set(
        'stock',
          `${(document.querySelector('.stock-input-min') as HTMLInputElement).value}↕${
            (document.querySelector('.stock-input-max') as HTMLInputElement).value
          }`
      )
      this.setState(this.states[0], this.url.pathname.concat(this.url.search))
      this.start()
    }
    ;(
      document.querySelector('.input-min') as HTMLInputElement
    ).addEventListener('input', () => {
      (document.querySelector('.range-min') as HTMLInputElement).value = (
        document.querySelector('.input-min') as HTMLInputElement
      ).value
      setPrice()
    })
    ;(
      document.querySelector('.input-max') as HTMLInputElement
    ).addEventListener('input', () => {
      (document.querySelector('.range-max') as HTMLInputElement).value = (
        document.querySelector('.input-max') as HTMLInputElement
      ).value
      setPrice()
    })
    ;(
      document.querySelector('.range-min') as HTMLInputElement
    ).addEventListener('input', () => {
      (document.querySelector('.input-min') as HTMLInputElement).value = (
        document.querySelector('.range-min') as HTMLInputElement
      ).value
      setPrice()
    })
    ;(
      document.querySelector('.range-max') as HTMLInputElement
    ).addEventListener('input', () => {
      (document.querySelector('.input-max') as HTMLInputElement).value = (
        document.querySelector('.range-max') as HTMLInputElement
      ).value
      setPrice()
    });
    (
      document.querySelector('.stock-input-min') as HTMLInputElement
    ).addEventListener('input', () => {
      (document.querySelector('.stock-range-min') as HTMLInputElement).value = (
        document.querySelector('.stock-input-min') as HTMLInputElement
      ).value
      setStock()
    })
    ;(
      document.querySelector('.stock-input-max') as HTMLInputElement
    ).addEventListener('input', () => {
      (document.querySelector('.stock-range-max') as HTMLInputElement).value = (
        document.querySelector('.stock-input-max') as HTMLInputElement
      ).value
      setStock()
    })
    ;(
      document.querySelector('.stock-range-min') as HTMLInputElement
    ).addEventListener('input', () => {
      (document.querySelector('.stock-input-min') as HTMLInputElement).value = (
        document.querySelector('.stock-range-min') as HTMLInputElement
      ).value
      setStock()
    })
    ;(
      document.querySelector('.stock-range-max') as HTMLInputElement
    ).addEventListener('input', () => {
      (document.querySelector('.stock-input-max') as HTMLInputElement).value = (
        document.querySelector('.stock-range-max') as HTMLInputElement
      ).value
      setStock()
    })
    ;(
      document.querySelector('.main__btn-reset') as HTMLInputElement
    ).addEventListener('click', () => {
      this.clearSearchParam()
    })
    ;(
      document.querySelector('.header__div-logo') as HTMLInputElement
    ).addEventListener('click', () => {
      this.setState(this.states[0], app.router.url.pathname)
      this.start()
    })
    ;(
      document.querySelector('.main__btn-copy') as HTMLInputElement
    ).addEventListener('click', () => {
      const element = document.querySelector('.copied-popup') as HTMLElement
      element.style.display = 'block'
      navigator.clipboard.writeText(window.location.href).then(
        () => {
          element.innerText = 'Link copied to clipboard successful!'
        },
        (err: Error) => {
          element.innerText = 'Copying failed with error: ' + err.message
        }
      )
      setTimeout(() => (element.style.display = 'none'), 2000)
    })
    ;(
      document.getElementById('productsSearch') as HTMLInputElement
    ).addEventListener('input', (ev) => {
      this.url.searchParams.set('search', (ev.target as HTMLInputElement).value)
      this.setState(this.states[0], this.url.pathname.concat(this.url.search))
      this.start()
    })
  }

  clearSearchParam (): void {
    ['price', 'sort', 'brand', 'category', 'search', 'big', 'stock'].forEach((value) =>
      this.url.searchParams.delete(value)
    )
    ;(
      document.getElementById('selectSort') as HTMLSelectElement
    ).options[0].selected = true
    this.url.search = ''
    this.setState(this.states[0], this.url.pathname)
    this.start()
  }

  removeSearchParam (paramName: string, value: string): void {
    const searchParam = this.url.searchParams.getAll(paramName)
    this.url.searchParams.delete(paramName)
    searchParam.splice(searchParam.indexOf(value), 1)
    searchParam.forEach((val) => {
      this.url.searchParams.append(paramName, val)
    })
  }

  setSelectorsValues (arr: Product[]): void {
    const min: number = arr.reduce(function (p, v) {
      return p.price < v.price ? p : v
    }).price
    const max: number = arr.reduce(function (p, v) {
      return p.price > v.price ? p : v
    }).price
    ;(document.querySelector('.input-min') as HTMLInputElement).value =
      min.toString()
    ;(document.querySelector('.input-max') as HTMLInputElement).value =
      max.toString()
    ;(document.querySelector('.range-min') as HTMLInputElement).value =
      min === max ? (min - 20).toString() : min.toString()
    ;(document.querySelector('.range-max') as HTMLInputElement).value =
      min === max ? (max + 20).toString() : max.toString()
    const minStock: number = arr.reduce(function (p, v) {
      return p.stock < v.stock ? p : v
    }).stock
    const maxStock: number = arr.reduce(function (p, v) {
      return p.stock > v.stock ? p : v
    }).stock
    ;(document.querySelector('.stock-input-min') as HTMLInputElement).value =
      minStock.toString()
    ;(document.querySelector('.stock-input-max') as HTMLInputElement).value =
      maxStock.toString()
    ;(document.querySelector('.stock-range-min') as HTMLInputElement).value =
      minStock === maxStock ? (minStock - 3).toString() : minStock.toString()
    ;(document.querySelector('.stock-range-max') as HTMLInputElement).value =
      minStock === maxStock ? (maxStock + 3).toString() : maxStock.toString()
  }

  start (): void {
    loadBlock.style.display = 'flex'
    if (window.localStorage.getItem('cart') !== null) {
      const cart: Product[] = JSON.parse(window.localStorage.getItem('cart') as string) as Product[]
      cartGenerator.cartCounter.innerHTML = cart.length.toString()
    }
    switch (this.states.indexOf(history.state as string)) {
      case 0: // home
        if (this.url.search.length === 0) {
          this.productsBlock.innerHTML = ''
          app.categoriesBlock.innerHTML = ''
          app.brandsBlock.innerHTML = ''
          this.setSelectorsValues(app.products)
          generator.generateProductItems(app.products, this.productsBlock)
          generator.generateBrandItems(app.products, app.brandsBlock)
          generator.generateCategoryItems(
            app.categories,
            app.categoriesBlock,
            app.products
          )
        } else {
          let arr: Product[] = app.products
          if (
            arr.length > 0 &&
            (this.url.searchParams.has('category') ||
              this.url.searchParams.has('brand'))
          ) {
            arr = this.filterProducts(
              arr,
              this.url.searchParams.getAll('brand'),
              this.url.searchParams.getAll('category')
            )
          }
          if (arr.length > 0 && this.url.searchParams.has('sort')) {
            arr = this.sortProducts(arr, this.getSortingMethod(this.url))
          }
          if (arr.length > 0 && this.url.searchParams.has('price')) {
            const price: string[] = (
              this.url.searchParams.get('price') as string
            ).split('↕')
            arr = arr.filter(
              (value) =>
                value.price >= parseInt(price[0], 10) &&
                value.price <= parseInt(price[1], 10)
            )
          }
          if (arr.length > 0 && this.url.searchParams.has('stock')) {
            const stock: string[] = (
              this.url.searchParams.get('stock') as string
            ).split('↕')
            arr = arr.filter(
              (value) =>
                value.stock >= parseInt(stock[0], 10) &&
                value.stock <= parseInt(stock[1], 10)
            )
          }
          if (arr.length > 0 && this.url.searchParams.has('search')) {
            const searchString = this.url.searchParams.get('search') as string
            arr = arr.filter(
              (value) =>
                value.brand.toLowerCase().includes(searchString.toLowerCase()) ||
                value.category.toLowerCase().includes(searchString.toLowerCase()) ||
                value.title.toLowerCase().includes(searchString.toLowerCase()) ||
                value.description.toLowerCase().includes(searchString.toLowerCase())
            )
          }
          this.productsBlock.innerHTML = ''
          app.categoriesBlock.innerHTML = ''
          app.brandsBlock.innerHTML = ''
          generator.generateProductItems(arr, this.productsBlock)
          generator.generateCategoryItems(
            app.categories,
            app.categoriesBlock,
            arr
          )
          generator.generateBrandItems(arr, app.brandsBlock)
          arr.length > 0 ? this.setSelectorsValues(arr) : this.productsBlock.innerHTML = 'No products found 😏'
        }
        if (this.url.search.includes('big')) {
          if (this.url.searchParams.get('big') === 'true') {
            (document.querySelector('.view__big') as HTMLElement).click()
          } else {
            (document.querySelector('.view__small') as HTMLElement).click()
          }
        }
        break
      case 1: // cart
        app.cartGenerator.createProdInCart()
        break
      case 2: // product
        generator.showSingleProduct(
          app.products.filter(
            (value) =>
              value.id ===
              parseInt(
                window.location.search.replace('?product-details=', ''),
                10
              )
          )[0]
        )
        break
      case 3: // error
        (document.querySelector('body') as HTMLElement).innerHTML =
          '<img src="https://repost.uz/storage/uploads/2-1642399910-nadira-post-material.jpeg" alt="404" height="100%">'
        console.log('404')
        break
    }
    loadBlock.style.display = 'none'
  }
}

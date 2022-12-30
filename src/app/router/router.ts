import { Product } from '../types'
import { app, generator } from '../../index'

export class Router {
  url: URL
  readonly states: string[] = ['home', 'cart', 'product', 'error']
  productsBlock = document.querySelector('.main__product-items') as HTMLElement

  constructor () {
    this.url = new URL(window.location.href)
    if (this.url.search.includes('product=')) {
      this.setState(this.states[2], this.url.search)
    } else if (
      this.url.search === '' ||
      this.url.search.includes('sort=') ||
      this.url.search.includes('category=') ||
      this.url.search.includes('brand=')
    ) {
      this.setState(this.states[0], this.url.search)
    } else if (this.url.search.includes('cart')) {
      this.setState(this.states[2], this.url.search)
    } else {
      this.setState(this.states[4], this.url.search)
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
    return products.filter(
      (value) => brands.includes(value.brand) || categories.includes(value.category)
    )
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
    this.setState(this.states[3], this.url.search)
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
        this.url.search.length > 0 ? this.url.search : '/'
      )
      this.start()
    }
  }

  addListenersForRouting (): void {
    // popstate listener back or forward button
    window.addEventListener('popstate', (): void => {
      window.history.state === null ? alert('wrong') : app.router.start()
    })
    // sorting listener
    const selectSort = document.getElementById(
      'selectSort'
    ) as HTMLSelectElement
    selectSort.addEventListener('change', () => {
      app.router.url.searchParams.has('sort')
        ? app.router.url.searchParams.set('sort', selectSort.value)
        : app.router.url.searchParams.append('sort', selectSort.value)
      app.router.setState(app.router.states[0], app.router.url.search)
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
      this.url.searchParams.set('price', `${(document.querySelector('.input-min') as HTMLInputElement).value}↕${(document.querySelector('.input-max') as HTMLInputElement).value}`)
      this.setState(this.states[0], this.url.search)
      this.start()
    }
    (document.querySelector('.input-min') as HTMLInputElement).addEventListener('input', () => {
      (document.querySelector('.range-min') as HTMLInputElement).value = (document.querySelector('.input-min') as HTMLInputElement).value
      setPrice()
    });
    (document.querySelector('.input-max') as HTMLInputElement).addEventListener('input', () => {
      (document.querySelector('.range-max') as HTMLInputElement).value = (document.querySelector('.input-max') as HTMLInputElement).value
      setPrice()
    });
    (document.querySelector('.range-min') as HTMLInputElement).addEventListener('input', () => {
      (document.querySelector('.input-min') as HTMLInputElement).value = (document.querySelector('.range-min') as HTMLInputElement).value
      setPrice()
    });
    (document.querySelector('.range-max') as HTMLInputElement).addEventListener('input', () => {
      (document.querySelector('.input-max') as HTMLInputElement).value = (document.querySelector('.range-max') as HTMLInputElement).value
      setPrice()
    })
  }

  removeSearchParam (paramName: string, value: string): void {
    const searchParam = this.url.searchParams.getAll(paramName)
    this.url.searchParams.delete(paramName)
    searchParam.splice(searchParam.indexOf(value), 1)
    searchParam.forEach((val) => {
      this.url.searchParams.append(paramName, val)
    })
  }

  start (): void {
    switch (this.states.indexOf(history.state as string)) {
      case 0: // home
        if (this.url.search === '') {
          generator.generateProductItems(app.products, this.productsBlock)
        } else {
          let arr: Product[] = app.products
          if (
            this.url.searchParams.has('category') ||
            this.url.searchParams.has('brand')
          ) {
            arr = this.filterProducts(
              arr,
              this.url.searchParams.getAll('brand'),
              this.url.searchParams.getAll('category')
            )
          }
          if (this.url.searchParams.has('sort')) {
            arr = this.sortProducts(arr, this.getSortingMethod(this.url))
          }
          if (this.url.searchParams.has('price')) {
            const price: string[] = (this.url.searchParams.get('price') as string).split('↕')
            arr = arr.filter(value => value.price >= parseInt(price[0], 10) && value.price <= parseInt(price[1], 10))
          }
          this.productsBlock.innerHTML = ''
          generator.generateProductItems(arr, this.productsBlock)
          const min: number = arr.reduce(function (p, v) {
            return (p.price < v.price ? p : v)
          }).price
          const max: number = arr.reduce(function (p, v) {
            return (p.price > v.price ? p : v)
          }).price;
          (document.querySelector('.input-min') as HTMLInputElement).value = min.toString();
          (document.querySelector('.input-max') as HTMLInputElement).value = max.toString()
        }
        break
      case 1: // cart
        console.log('cart')
        break
      case 2: // product
        generator.showSingleProduct(
          app.products.filter(
            (value) =>
              (value.id = parseInt(
                window.location.search.replace('?product=', ''),
                10
              ))
          )[0]
        )
        break
      case 3: // error
        (document.querySelector('body') as HTMLElement).innerHTML =
          '<img src="https://repost.uz/storage/uploads/2-1642399910-nadira-post-material.jpeg" alt="404" height="100%">'
        console.log('404')
        break
    }
  }
}

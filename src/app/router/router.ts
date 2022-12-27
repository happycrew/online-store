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
      (value) => value.brand in brands || value.category in categories
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

  addListenersForRouting (): void {
    window.addEventListener('popstate', (): void => {
      window.history.state === null ? alert('wrong') : app.router.start()
    })
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
    app.categoriesBlock.addEventListener('click', (ev) => {
      const element = (ev.target as HTMLElement).parentElement as HTMLElement
      element.classList.contains('item-not-active')
        ? element.classList.remove('item-not-active')
        : element.classList.add('item-not-active')
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
          this.productsBlock.innerHTML = ''
          generator.generateProductItems(arr, this.productsBlock)
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

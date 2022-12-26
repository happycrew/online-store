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

  start (): void {
    switch (this.states.indexOf(history.state as string)) {
      case 0: // home
        if (this.url.search === '') {
          generator.generateProductItems(app.products, this.productsBlock)
        } else {
          if (this.url.search.includes('sort=')) {
            const sortingMethod = this.getSortingMethod(this.url)
            this.productsBlock.innerHTML = ''
            switch (sortingMethod) {
              case 'price-ASC':
                generator.generateProductItems(
                  app.products.sort((a: Product, b: Product) =>
                    a.price > b.price ? 1 : -1
                  ),
                  this.productsBlock
                )
                break
              case 'price-DESC':
                generator.generateProductItems(
                  app.products.sort((a: Product, b: Product) =>
                    a.price < b.price ? 1 : -1
                  ),
                  this.productsBlock
                )
                break
              case 'rating-ASC':
                generator.generateProductItems(
                  app.products.sort((a: Product, b: Product) =>
                    a.rating > b.rating ? 1 : -1
                  ),
                  this.productsBlock
                )
                break
              case 'rating-DESC':
                generator.generateProductItems(
                  app.products.sort((a: Product, b: Product) =>
                    a.rating < b.rating ? 1 : -1
                  ),
                  this.productsBlock
                )
                break
              case 'discount-ASC':
                generator.generateProductItems(
                  app.products.sort((a: Product, b: Product) =>
                    a.discountPercentage > b.discountPercentage ? 1 : -1
                  ),
                  this.productsBlock
                )
                break
              case 'discount-DESC':
                generator.generateProductItems(
                  app.products.sort((a: Product, b: Product) =>
                    a.discountPercentage < b.discountPercentage ? 1 : -1
                  ),
                  this.productsBlock
                )
                break
            }
          }
        }
        break
      case 1: // cart
        console.log('cart')
        break
      case 2: // product
        generator.showSingleProduct(
          app.products[
            parseInt(window.location.search.replace('?product=', ''), 10)
          ]
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

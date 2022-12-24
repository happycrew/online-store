import { Product } from '../types'
import { ContentGenerator } from '../htmlGenerator/contentGenerator'

export class Router {
  private readonly root: string
  productsBlock = document.querySelector('.main__product-items') as HTMLElement

  constructor (root: string) {
    this.root = root
  }

  setProducts (productArr: Product[]): void {
    window.history.pushState(
      { currentPage: 'home', products: productArr },
      '',
      ''
    )
  }

  start (generator: ContentGenerator): void {
    const currentPage: string = (
      window.history.state as { currentPage: string, prod: Product[] }
    ).currentPage
    const products: Product[] = (
      window.history.state as { currentPage: string, products: Product[] }
    ).products
    switch (currentPage) {
      case 'home':
        generator.generateProductItems(products, this.productsBlock)
        return
      case 'sort':
        if (window.location.href.includes(this.root.concat('?sort='))) {
          const sortingMethod = window.location.href.replace(
            this.root.concat('?sort='),
            ''
          )
          this.productsBlock.innerHTML = ''
          switch (sortingMethod) {
            case 'price-ASC':
              generator.generateProductItems(
                products.sort((a: Product, b: Product) =>
                  a.price > b.price ? 1 : -1
                ),
                this.productsBlock
              )
              return
            case 'price-DESC':
              generator.generateProductItems(
                products.sort((a: Product, b: Product) =>
                  a.price < b.price ? 1 : -1
                ),
                this.productsBlock
              )
              return
            case 'rating-ASC':
              generator.generateProductItems(
                products.sort((a: Product, b: Product) =>
                  a.rating > b.rating ? 1 : -1
                ),
                this.productsBlock
              )
              return
            case 'rating-DESC':
              generator.generateProductItems(
                products.sort((a: Product, b: Product) =>
                  a.rating < b.rating ? 1 : -1
                ),
                this.productsBlock
              )
              return
            case 'discount-ASC':
              generator.generateProductItems(
                products.sort((a: Product, b: Product) =>
                  a.discountPercentage > b.discountPercentage ? 1 : -1
                ),
                this.productsBlock
              )
              return
            case 'discount-DESC':
              generator.generateProductItems(
                products.sort((a: Product, b: Product) =>
                  a.discountPercentage < b.discountPercentage ? 1 : -1
                ),
                this.productsBlock
              )
              return
          }
        }
    }
    (document.querySelector('body') as HTMLElement).innerHTML =
      '<img src="https://repost.uz/storage/uploads/2-1642399910-nadira-post-material.jpeg" alt="404" height="100%">'
    console.log('404')
  }
}

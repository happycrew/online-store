import { Product } from '../types'
import { Loader } from '../loader/loader'
import { ContentGenerator } from '../htmlGenerator/contentGenerator'

export class Router {
  private readonly root: string
  productsBlock = document.querySelector('.main__product-items') as HTMLElement

  constructor (root: string) {
    this.root = root
  }

  async start (
    loader: Loader,
    generator: ContentGenerator,
    products: Product[]
  ): Promise<void> {
    const currentPage = window.location.href
    if (currentPage.includes(window.location.origin.concat('/?product='))) {
      const str = window.location.href
      const productNumber = parseInt(
        str.replace(window.location.origin.concat('/?product='), ''),
        10
      )
      const product: Product = await loader.getSingleProduct(productNumber)
      generator.showSingleProduct(product)
      return
    }
    if (currentPage.includes(this.root.concat('?sort='))) {
      const sortingMethod = currentPage.replace(this.root.concat('?sort='), '')
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
    switch (currentPage) {
      case this.root:
        generator.generateProductItems(products, this.productsBlock)
        return
      case this.root.concat('/home'):
        console.log('its ok')
        return
    }
    (document.querySelector('body') as HTMLElement).innerHTML =
      '<img src="https://repost.uz/storage/uploads/2-1642399910-nadira-post-material.jpeg" alt="404" height="100%">'
    console.log('404')
  }
}

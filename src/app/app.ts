import { Loader } from './loader/loader'
import { Product, ProductResponse } from './types'
import { Cart, ContentGenerator } from './htmlGenerator/contentGenerator'
import { Router } from './router/router'
import { ClickChangeView } from './htmlGenerator/changeView'
import { Validation } from './htmlGenerator/validator'

export class App {
  private readonly loader: Loader
  private readonly generator: ContentGenerator
  readonly brandsBlock: HTMLElement
  readonly categoriesBlock: HTMLElement
  private readonly productsBlock: HTMLElement // create by me
  private readonly clickChangeView: ClickChangeView // by me
  readonly router: Router
  private readonly validator: Validation // add 25.12
  readonly cartGenerator: Cart // ad 27.12
  products: Product[]
  categories: string[]
  brands: string[]

  constructor (
    loader: Loader,
    generator: ContentGenerator,
    changeview: ClickChangeView,
    validator: Validation, // add 25.12
    cartGenerator: Cart
  ) {
    this.loader = loader
    this.router = Object(Router) as Router
    this.generator = generator
    this.products = []
    this.categories = []
    this.brands = []
    this.brandsBlock = document.querySelector(
      '.main__brand-list'
    ) as HTMLElement
    this.categoriesBlock = document.querySelector(
      '.main__category-list'
    ) as HTMLElement
    this.productsBlock = document.querySelector(
      '.main__product-items'
    ) as HTMLElement // by me
    this.clickChangeView = changeview
    this.validator = validator // add 25.12
    this.cartGenerator = cartGenerator
  }

  async start (): Promise<void> {
    this.categories = (await this.loader.getCategorise()).sort()
    const products: ProductResponse = await this.loader.getProducts()
    this.products = products.products
    this.products.forEach((el) => {
      if (!this.brands.includes(el.brand)) {
        this.brands.push(el.brand.trim())
      }
    })
    this.brands.sort()
    this.router.addListenersForRouting()
    this.router.start()
  }
}

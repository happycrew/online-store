import { Loader } from './loader/loader'
import { ProductResponse } from './types'
import { ContentGenerator } from './htmlGenerator/contentGenerator'
import { Router } from './router/router'
import { ClickChangeView } from './htmlGenerator/changeView'

export class App {
  private readonly loader: Loader
  private readonly generator: ContentGenerator
  private readonly brandsBlock: HTMLElement
  private readonly categoriesBlock: HTMLElement
  private readonly productsBlock: HTMLElement // create by me
  private readonly clickChangeView: ClickChangeView // by me

  constructor (
    loader: Loader,
    generator: ContentGenerator,
    changeview: ClickChangeView
  ) {
    this.loader = loader
    this.generator = generator
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
  }

  async start (): Promise<void> {
    const router = new Router(window.location.origin.concat('/'))
    const categories: string[] = (await this.loader.getCategorise()).sort()
    const products: ProductResponse = await this.loader.getProducts()
    await router
      .start(this.loader, this.generator, products.products)
      .catch((err: Error) => {
        throw new Error(err.message)
      })
      .then()
      .catch()
    this.generator.generateBrandItems(products.products, this.brandsBlock)
    this.generator.generateCategoryItems(categories, this.categoriesBlock)
  }
}

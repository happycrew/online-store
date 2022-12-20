import { Loader } from './loader/loader'
import { ProductResponse } from './types'
import { ContentGenerator } from './htmlGenerator/contentGenerator'
import { Router } from './router/router'

export class App {
  private readonly loader: Loader
  private readonly generator: ContentGenerator
  private readonly brandsBlock: HTMLElement
  private readonly categoriesBlock: HTMLElement
  private readonly productsBlock: HTMLElement // create by me

  constructor (loader: Loader, generator: ContentGenerator) {
    this.loader = loader
    this.generator = generator
    this.brandsBlock = document.querySelector('.main__brand-list') as HTMLElement
    this.categoriesBlock = document.querySelector('.main__category-list') as HTMLElement
    this.productsBlock = document.querySelector('.main__product-items') as HTMLElement // by me
  }

  async start (): Promise<void> {
    const router = new Router(window.location.origin.concat('/'))
    await router.start(this.loader).catch((err: Error) => {
      throw new Error(err.message)
    }).then().catch()
    const categories: string[] = (await this.loader.getCategorise()).sort()
    const products: ProductResponse = await this.loader.getProducts()
    this.generator.generateBrandItems(products.products, this.brandsBlock)
    this.generator.generateCategoryItems(categories, this.categoriesBlock)
    this.generator.generateProductItems(products.products, this.productsBlock)
  }
}

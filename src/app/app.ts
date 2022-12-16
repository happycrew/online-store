import { Loader } from './loader/loader'
import { ProductResponse } from './types'
import { ContentGenerator } from './htmlGenerator/contentGenerator'

export class App {
  private readonly loader: Loader
  private readonly generator: ContentGenerator

  constructor (loader: Loader, generator: ContentGenerator) {
    this.loader = loader
    this.generator = generator
  }

  async start (): Promise<void> {
    const categories: string[] = await this.loader.getCategorise()
    const products: ProductResponse = await this.loader.getProducts()
    console.log(categories)
    console.log(products.products)
    this.generator.generateCategoryItems(categories)
  }
}

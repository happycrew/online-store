/*
Using - https://dummyjson.com/
Example query - https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1&select=key2&select=key3
 */

import { Product, ProductResponse } from '../types'

export class Loader {
  private products!: ProductResponse
  private categories!: string[]

  async setAllData (): Promise<void> {
    this.products = await this.loadData('https://dummyjson.com/products?limit=100') as ProductResponse
    this.categories = await this.loadData('https://dummyjson.com/products/categories') as string[]
  }

  //  downloads data from the provided link
  async loadData (url: string): Promise<unknown> {
    const res: Response = await fetch(url)
    if (!res.ok) {
      console.log(`Request failed with status ${res.status}`)
    } else {
      return await (await res.json() as Promise<unknown>)
    }
  }

  //  returns an array of products
  get getProducts (): Product[] {
    return this.products?.products
  }

  //  returns an array of categories
  get getCategories (): string[] {
    return this.categories
  }
}

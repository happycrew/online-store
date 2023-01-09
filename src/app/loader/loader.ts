/*
Using - https://dummyjson.com/
Example query - https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1&select=key2&select=key3
 */

import { Product, ProductResponse } from '../types'

export class Loader {
  async getCategorise (): Promise<string[]> {
    return await ((await (
      await fetch('https://dummyjson.com/products/categories')
    ).json()) as Promise<string[]>)
  }

  async getSingleProduct (elementId: number): Promise<Product> {
    return await ((await (
      await fetch(
        'https://dummyjson.com/products/'.concat(elementId.toString())
      )
    ).json()) as Promise<Product>)
  }

  async getProducts (limit = 100, skip = 0): Promise<ProductResponse> {
    const url = `https://dummyjson.com/products?limit=${limit.toString()}`
    return await ((await (
      await fetch(skip === 0 ? url : url.concat(`&skip=${skip.toString()}`))
    ).json()) as Promise<ProductResponse>)
  }
}

import { Product } from '../types'
import { Loader } from '../loader/loader'

export class Router {
  private readonly root: string

  constructor (root: string) {
    this.root = root
  }

  async start (loader: Loader): Promise<void> {
    const currentPage = window.location.href
    console.log(window.location.origin.concat('/?product='))
    if (currentPage.includes(window.location.origin.concat('/?product='))) {
      const str = window.location.href
      const productNumber = parseInt(str.replace(window.location.origin.concat('/?product='), ''), 10)
      const product: Product = await loader.getSingleProduct(productNumber)
      console.log(product)
      return
    }
    console.log(currentPage)
    switch (currentPage) {
      case (window.location.origin.concat('/')):
        console.log('its root')
        return
      case (this.root.concat('/home')):
        console.log('its ok')
        return
    }
    (document.querySelector('body') as HTMLElement).innerHTML = '<img src="https://repost.uz/storage/uploads/2-1642399910-nadira-post-material.jpeg" alt="404" height="100%">'
    console.log('404')
  }
}

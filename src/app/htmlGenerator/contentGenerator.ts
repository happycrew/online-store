import { Product } from '../types'

export class ContentGenerator {
  generateBrandItems (products: Product[], element: HTMLElement): void {
    const brands: string[] = []
    products.forEach((el) => {
      if (!brands.includes(el.brand.toString())) {
        brands.push(el.brand.trim())
      }
    }
    )
    brands.sort()
    for (let i = 0; i < brands.length; i++) {
      const child = document.createElement('div') as HTMLElement
      child.classList.add('main__brand-item')
      child.classList.add('item-active')
      child.innerHTML = `<input type="checkbox" id="brand${i.toString()}" />
                         <label for="${i.toString()}">${brands[i]}</label>
                         <span>(0/3)</span>`
      element.append(child)
    }
  }

  generateCategoryItems (categories: string[], element: HTMLElement): void {
    for (let i = 0; i < categories.length; i++) {
      const child = document.createElement('div') as HTMLElement
      child.classList.add('main__category-item')
      child.classList.add('item-not-active')
      child.innerHTML = `<input type="checkbox" id="category${i.toString()}">
                           <label for="category${i.toString()}">${categories[i].toString()}</label>
                           <span>(${i.toString()}/${categories.length.toString()})</span>`
      element.append(child)
    }
  }
}

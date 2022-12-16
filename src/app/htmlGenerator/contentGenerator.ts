export class ContentGenerator {
  generateCategoryItems (categories: string[]): void {
    for (let i = 0; i < categories.length; i++) {
      const element = document.querySelector('.main__category-list') as HTMLElement
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

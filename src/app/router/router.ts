export class Router {
  private readonly root: string

  constructor (root: string) {
    this.root = root
  }

  start (): string {
    const currentPage = window.location.href
    console.log(currentPage)
    switch (currentPage) {
      // add your rotes here
      case (window.location.origin.concat('/')):
        return 'its root'
      case (this.root.concat('/home')):
        return 'its ok'
    }
    (document.querySelector('body') as HTMLElement).innerHTML = '<img src="https://repost.uz/storage/uploads/2-1642399910-nadira-post-material.jpeg" alt="404" height="100%">'
    return '404'
  }
}

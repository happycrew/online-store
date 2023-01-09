import './style.scss'
import { App } from './app/app'
import { Loader } from './app/loader/loader'
import { Cart, ContentGenerator } from './app/htmlGenerator/contentGenerator'
import { ClickChangeView } from './app/htmlGenerator/changeView'
import { Validation } from './app/htmlGenerator/validator' // add 25.12

const loader: Loader = new Loader()
export const generator: ContentGenerator = Object(ContentGenerator) as ContentGenerator
const changeView: ClickChangeView = new ClickChangeView()
const validator: Validation = new Validation() // add 25.12
export const cartGenerator: Cart = new Cart()
export const loadBlock = document.querySelector('.loader-container') as HTMLElement
export const app = new App(
  loader,
  generator,
  changeView,
  validator,
  cartGenerator
)
app
  .start()
  .catch((err: Error) => {
    throw new Error(err.message)
  })
  .then(() => console.log('App successful running!'))
  .catch(() => 'Something wrong...')

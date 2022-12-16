import './style.scss'
import { App } from './app/app'
import { Loader } from './app/loader/loader'
import { ContentGenerator } from './app/htmlGenerator/contentGenerator'
const loader: Loader = new Loader()
const generator: ContentGenerator = new ContentGenerator()
const app = new App(loader, generator)
app.start().catch((err: Error) => {
  throw new Error(err.message)
})
  .then(() => console.log('App successful running!'))
  .catch(() => 'Something wrong...')

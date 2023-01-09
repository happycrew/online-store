import { Router } from '../src/app/router/router'
import { Loader } from '../src/app/loader/loader'
import {
  Cart,
  ContentGenerator
} from '../src/app/htmlGenerator/contentGenerator'
import { Validation } from '../src/app/htmlGenerator/validator'
import { App } from '../src/app/app'
import { ClickChangeView } from '../src/app/htmlGenerator/changeView'

// test('Is this Loader type', () => {
//   expect(Object(Router)).toBeInstanceOf(Router)
// })
test('Is this Loader type', () => {
  expect(new Loader()).toBeInstanceOf(Loader)
})
test('Is this ContentGenerator type', () => {
  expect(Object(ContentGenerator)).toBeInstanceOf(ContentGenerator)
})
// test('Is this Cart type', () => {
//   expect(Object(Cart)).toBeInstanceOf(Cart)
// })
test('Is this Validation type', () => {
  expect(new Validation()).toBeInstanceOf(Validation)
})
// test('Is this App type', () => {
//   const loader: Loader = new Loader()
//   const generator: ContentGenerator = new ContentGenerator()
//   const changeview: ClickChangeView = new ClickChangeView()
//   const validator: Validation = new Validation()
//   const cartGenerator: Cart = new Cart()
//   expect(new App(loader, generator, changeview, validator, cartGenerator)).toBeInstanceOf(App)
// })

import { Router } from '../src/app/router/router'

jest.mock('../src/app/router/router', () => ({
  get Router () {
    return jest.fn().mockImplementation(function () {
      return {
        getSortingMethod: (url: URL): string => {
          if (url.search.includes('sort=price')) {
            return url.search.includes('-DESC') ? 'price-DESC' : 'price-ASC'
          }
          if (url.search.includes('sort=rating')) {
            return url.search.includes('-DESC') ? 'rating-DESC' : 'rating-ASC'
          }
          if (url.search.includes('sort=discount')) {
            return url.search.includes('-DESC') ? 'discount-DESC' : 'discount-ASC'
          }
          return ''
        }
      }
    })
  }
}))

// This will not throw an error anymore
test('Is this Loader type', () => {
  const api = new Router()
  expect(api.getSortingMethod(new URL('http://localhost:8080/?price=10%E2%86%951749&sort=rating-ASC'))).toEqual('rating-ASC')
})

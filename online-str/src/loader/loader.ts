/*
Using - https://dummyjson.com/
Example query - https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1&select=key2&select=key3
 */

// import { ProductResponse } from './types'
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

class Loader {
    private products: ProductResponse
    private categories: Array<string>

    constructor() {
        this.setAllData() //  sets initial data
    }

    private async setAllData() {
        this.products = await this.loadData('https://dummyjson.com/products?limit=100')  //
        this.categories = await this.loadData('https://dummyjson.com/products/categories')
    }

    //  downloads data from the provided link
    async loadData(url: string) {
        const res: Response = await fetch(url);
        if (!res.ok) {
            console.log(`Request failed with status ${res.status}`)
        } else {
            return await res.json();
        }
    }

    //  returns an array of products
    get getProducts() {
        return this.products.products;
    }

    //  returns an array of categories
    get getCategories() {
        return this.categories;
    }
}

let a = new Loader()
// console.log(JSON.stringify(a.getProducts))
// console.log(JSON.stringify(a.getCategories))
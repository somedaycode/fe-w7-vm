import { _ } from '../util.js';
import { Observable } from '../Observable.js';
import { products } from '../data/products';

class ProductModel extends Observable {
  constructor(products) {
    super();
    this.products = products;
  }
}

export const productModel = new ProductModel(products);

import { _ } from '../util.js';
import { Observable } from '../Observable.js';
import { products } from '../data/products';

class ProductModel extends Observable {
  constructor(products) {
    super();
    this.products = products;
  }

  updateInventory(productName) {
    this.buyProduct(productName);
  }

  buyProduct(productName) {
    this.products.forEach((product) =>
      this.reduceInventory(product, productName)
    );
  }

  reduceInventory(product, productName) {
    if (product.name === productName) product.inventory -= 1;
    if (product.inventory < 0) product.inventory = 0;
  }
}

export const productModel = new ProductModel(products);

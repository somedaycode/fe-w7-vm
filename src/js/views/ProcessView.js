import { makeProcessTemplate } from '../templates/HTMLTemplates.js';
import { insertTemplate, _ } from '../util.js';

class ProcessView {
  constructor({ processScreen, walletModel, productModel }) {
    this.$processScreen = processScreen;
    this.walletModel = walletModel;
    this.productModel = productModel;
  }
}

export { ProcessView }
import { _ } from '../util.js';
import { Observer } from '../Observer.js';

class InventoryModel extends Observer {
  constructor() {
    super();
  }
}

export const walletModel = new InventoryModel();

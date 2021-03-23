import { _ } from '../util.js';
import { Observer } from '../Observer.js';
import { getDefaultBudget } from '../data/budget.js';

class WalletModel extends Observer {
  constructor() {
    super();
    this.budget = getDefaultBudget();
  }
}

export const test = new WalletModel();

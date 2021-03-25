import { _ } from '../util.js';
import { Observable } from '../Observable.js';
import { initialBudget } from '../data/budget.js';

class WalletModel extends Observable {
  constructor(initialBudget) {
    super();
    this.budget = initialBudget;
    this.insertedMoney = [];
  }

  useMoney(money) {
    const myMoney = this.budget.myMoney[money];
    if (myMoney === 0) return;
    this.budget.myMoney[money]--;
  }

  useCurrentInsertMoney(price) {
    if (this.budget.currentInsertMoney <= 0) return;
    this.budget.currentInsertMoney -= price;
  }

  getMoneyCount(moneyUnit) {
    const currentMoneyUnitCount = this.budget.myMoney[moneyUnit];
    return currentMoneyUnitCount;
  }

  getTotalBudget() {
    const currWallet = this.budget.myMoney;
    let totalBudget = 0;
    for (const money in currWallet) {
      totalBudget += Number(money) * currWallet[money];
    }
    return totalBudget;
  }

  insertMoney(money) {
    this.budget.currentInsertMoney += money;
    this.insertedMoney.push(money);
  }

  getInsertedMoney() {
    return this.insertedMoney;
  }

  returnMoney(notifyCallback) {
    if(this.insertedMoney.length === 0) return;
    this.insertedMoney.forEach((money) => {
      const moneyStr = String(money);
      this.budget.myMoney[moneyStr] += 1;
      this.budget.currentInsertMoney -= money;
    })
    notifyCallback();
    this.clearInsertedMoneyMemory();
  }

  clearInsertedMoneyMemory() {
    this.insertedMoney = [];
  }

  isMoneyCountZero({ myMoney }, moneyUnit) {
    if(myMoney[moneyUnit] === 0) return true;
  }
}

export const walletModel = new WalletModel(initialBudget);

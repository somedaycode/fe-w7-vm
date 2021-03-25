import { _ } from '../util.js';
import { walletModel } from '../models/WalletModel.js';

class InsertMoneyView {
  constructor({ insertView, returnButton }, walletModel) {
    this.walletModel = walletModel;
    this.$insertView  = insertView;
    this.$returnButton = returnButton;
    this.init();
  }

  init() {
    this.walletModel.subscribe(this.updateView.bind(this));
    this.onEvents();
  }

  updateView({ currentInsertMoney }) {
    if(currentInsertMoney === undefined) {
      currentInsertMoney = 0;
    }
    this.$insertView.textContent = `${currentInsertMoney}원`
  }

  onEvents() {
    _.on(this.$returnButton, 'click', this.handleClickReturnBtn.bind(this));
  }

  handleClickReturnBtn({target}) {
    const budget = this.walletModel.budget;
    const notifyCallback = () => this.walletModel.notify(budget)
    this.walletModel.returnMoney(notifyCallback);
  }
}

export { InsertMoneyView }
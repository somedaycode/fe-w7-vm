import { insertTemplate, _, debounce } from '../util.js';
import {
  makeWalletTemplate,
  makeTotalBudgetTemplate,
} from '../templates/HTMLTemplates.js';

class WalletView {
  constructor({ walletLists, budget }, walletModel) {
    this.$walletArea = walletLists;
    this.$budget = budget;
    this.walletModel = walletModel;
    this.walletModel.debounceReturnMoney = this.hasNoInteration();
    this.currentMoneyUnit;
    this.init();
  }

  init() {
    this.renderDefaultWallet();
    this.onEvents();
    this.walletModel.subscribe(this.updateView.bind(this));
  }

  renderDefaultWallet() {
    const wallet = this.walletModel.budget.myMoney;
    const myMoney = this.changeTypeObjToArr(wallet);
    const walletTemplate = myMoney.reduce((prev, [money, count]) => {
      const template = makeWalletTemplate(money, count);
      return (prev += template);
    }, '');
    const totalBudget = this.walletModel.getTotalBudget();
    const totalBudgetTemplate = makeTotalBudgetTemplate(totalBudget);
    insertTemplate(this.$walletArea, 'beforeend', walletTemplate);
    insertTemplate(this.$budget, 'beforeend', totalBudgetTemplate);
  }

  changeTypeObjToArr(wallet) {
    const myMoney = Object.keys(wallet).map((moneyType) => [
      Number(moneyType),
      wallet[moneyType],
    ]);
    return myMoney;
  }

  onEvents() {
    _.on(this.$walletArea, 'click', this.handleClickWalletArea.bind(this));
  }

  handleClickWalletArea({ target }) {
    if (!target.closest('.money__button')) return;
    const budget = this.walletModel.budget;
    const money = this.getMoneyUnit(target);
    if (this.walletModel.isMoneyCountZero(budget, money)) return;
    this.currentMoneyUnit = money;
    this.walletModel.updateMyBudget(money);
    this.walletModel.debounceReturnMoney();
  }

  getMoneyUnit(target) {
    const money = target.closest('.money__button').textContent.slice(0, -1);
    return Number(money);
  }

  updateView() {
    const allInsertedMoney = this.walletModel.getInsertedMoney();
    this.changeMoneyUnitCount(allInsertedMoney);
    this.changeAmountOfMoney();
  }

  changeMoneyUnitCount(allInsertedMoney) {
    allInsertedMoney.forEach((money) => {
      this.reRenderEachMoneyCount(money);
    });
  }

  reRenderEachMoneyCount(money) {
    const clickedMoneyUnits = Array.from(_.$All('.money__button'));
    const clickedMoneyUnit = clickedMoneyUnits.filter((unit) => {
      const moneyUnit = Number(unit.textContent.slice(0, -1));
      return moneyUnit === money;
    })[0];
    const clickedMoneyCount = clickedMoneyUnit.nextElementSibling;
    const currentMoneyUnitCount = this.walletModel.getMoneyCount(money);
    clickedMoneyCount.textContent = `${currentMoneyUnitCount}개`;
  }

  changeAmountOfMoney() {
    const totalBudget = this.walletModel.getTotalBudget();
    // 3자리마다 쉼표 붙이는 함수 여기에
    this.$budget.textContent = `${totalBudget}원`;
  }

  hasNoInteration() {
    const ms = 5000;
    const self = this.walletModel;
    const notify = () => this.walletModel.notify('', this.currentMoneyUnit);
    return debounce(this.walletModel.returnMoney.bind(self, notify), ms);
  }
}

export { WalletView };

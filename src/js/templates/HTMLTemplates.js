const productsTemplate = (productName, price) => {
  return `
  <li class="product">
  <button class="product__name">
  <span>${productName}</span>
  </button>
  <div class="price"><span>${price}</span></div>
  </li>`;
};

const makeWalletTemplate = (moneyType, count) => {
  return `
  <li class="wallet__list">
    <button class="money__button"><span>${moneyType}원</span></button>
    <div><span>${count}개</span></div>
  </li>
  `
}

const makeTotalBudgetTemplate = (totalBudget) => {
  return `
  <span>${totalBudget}원</span>
  `
}


const makeProcessTemplate = (action, contents) => {
  if(action = 'insert') return `<span>${contents}원 투입!</span>`;
  if(action = 'return') return `<span>${contents}원 반환!</span>`;
  if(action = 'selectProduct') return `<span>${contents}을(를) 선택</span>`;
  if(action = 'eject') return `<span>${contents}이(가) 나왔다!</span>`;
}

export { productsTemplate, makeWalletTemplate, makeTotalBudgetTemplate, makeProcessTemplate };

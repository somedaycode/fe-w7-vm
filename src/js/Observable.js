export class Observable {
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer) {
    this._observers.add(observer);
  }
  unsubscribe(observer) {
    this._observers.delete(observer);
  }
  notify(data, ...args) {
    this._observers.forEach((observer) => observer(data, ...args));
  }
}

export default class Acai {
  constructor (size, flavor, customizations = []) {
    this.size = size
    this.flavor = flavor
    this.customizations = customizations
  }

  get size () {
    return this._size
  }

  set size (value) {
    this._size = value
  }

  get flavor () {
    return this._flavor
  }

  set flavor (value) {
    this._flavor = value
  }

  get customizations () {
    return this._customizations
  }

  set customizations (value) {
    this._customizations = value
  }

  addCustomization (value) {
    this._customizations.push(value)
  }

  get time () {
    return [this.size, this.flavor, ...this.customizations].reduce((acc, curr) => acc + curr.time, 0)
  }

  get cost () {
    return [this.size, this.flavor, ...this.customizations].reduce((acc, curr) => acc + curr.cost, 0)
  }
}

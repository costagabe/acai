export default class Acai {
  constructor (size, flavor, id, customizations = []) {
    this.size = size
    this.flavor = flavor
    this.customizations = customizations
    this.id = id
  }

  addCustomization (value) {
    this.customizations.push(value)
  }

  get time () {
    return [this.size, this.flavor, ...this.customizations].reduce((acc, curr) => acc + curr.time, 0)
  }

  get cost () {
    return [this.size, this.flavor, ...this.customizations].reduce((acc, curr) => acc + curr.cost, 0)
  }
}

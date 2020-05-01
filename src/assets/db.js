import AcaiItem from '../models/AcaiItem'

const pote1 = new AcaiItem('300 ml', 5, 10, '', 1)
const pote2 = new AcaiItem('500 ml', 7, 13, '', 2)
const pote3 = new AcaiItem('700 ml', 10, 15, '', 3)

// Sabores
const banana = new AcaiItem('Banana', 0, 0, '', 4)
const kiwi = new AcaiItem('Kiwi', 5, 0, '', 5)
const morango = new AcaiItem('Morango', 0, 0, '', 6)

const granola = new AcaiItem('Granola', 0, 0, '', 7)
const leiteNinho = new AcaiItem('Leite Ninho', 0, 3, '', 8)
const pacoca = new AcaiItem('Paçoca', 3, 3, '', 9)

export default {
  sizes: [pote1, pote2, pote3],
  flavors: [banana, kiwi, morango],
  costumizations: [granola, leiteNinho, pacoca]
}

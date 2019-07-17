const {
  obterPessoas
} = require('./service')

Array.prototype.meuFilter = function (callback) {
  const lista = []
  for (index in this) {
    const item = this[index]
    const result = callback(item, index, this)

    if (!result) continue
    lista.push(item)
  }
  return lista
}

async function main() {
  try {
    const {
      results
    } = await obterPessoas('a')

    const familiaLars = results.filter(function (item) {
      // Por padrão, precisa retornar um booleano para informar
      // se deve manter ou remover da lista
      // false -> remove da lista
      // true -> mantem
      // não encontrou = -1
      // encontrou = posicao no array
      const result = item.name.toLowerCase().indexOf(`lars`) !== -1
      return result
    })
    const names = familiaLars.map(pessoa => pessoa.name)

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><> //

    const familiaSkywalker = results.meuFilter((item, index, lista) => {
      console.log(`Passando dentro do callback -> index: ${index} - lista: ${lista.length}`)
      return item.name.toLowerCase().indexOf('skywalker') !== -1
    })

    const namesS = familiaSkywalker.map(pessoa => pessoa.name)

    const teste = [1, 2, 3, 4, 2, 5, 6, 7, 2, 8, 9, 10, 11, 12]

    console.log(namesS)
    console.log(names)
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}

main()
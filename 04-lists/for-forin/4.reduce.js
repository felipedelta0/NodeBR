const {
  obterPessoas: op
} = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

  for (let index = 0; index < this.length; index++) {
    valorFinal = callback(valorFinal, this[index], this)
  }

  return valorFinal
}

async function main() {

  try {
    const {
      results
    } = await op('a')

    const pesos = results.map(item => parseInt(item.mass) ? parseInt(item.mass) : 0)
    // Caso não tenha valor na lista, passar o segundo parametro como a inicialização da mesma
    // Exemplo de lista vazia definindo a inicialização com 0
    // const x = [].reduce((anterior, proximo) => { execucao da função }, 0)
    const total = pesos.reduce((anterior, proximo) => {
      return anterior + proximo
    })
    // console.log('total: ', total)

    const minhaLista = [
      ['Luis', 'Celisa'],
      ['Leandro', 'Fabiana'],
      ['Kevin']
    ]

    const reduzido = minhaLista.meuReduce((anterior, proximo) => {
        return anterior.concat(proximo)
      }, [])
      .join(',')

    console.log('reduzido: ', reduzido)

  } catch (error) {
    console.error('DEU RUIM', error)
  }

}

main()
/*
0 - Obter um usuário
1 - Obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/

// Importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  // Quando der algum problema -> Reject
  // Quando der sucesso -> Resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('DEU RUIM DE VERDADE!!'))

      return resolve({
        id: 1,
        nome: 'Luis Felipe Alcântara dos Santos',
        dataNascimento: new Date(1996, 4, 6)
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '982791669',
        ddd: 12
      })
    }, 2000)
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Geraldo Soares Lemes',
      numero: '40'
    })
  }, 2000)
}

const usuarioPromise = obterUsuario()
// Para manipular o sucesso, usamos a função ".then"
// Para manipular erros, usamos a função ".catch"
usuarioPromise
  .then(function (resultado) {
    return obterTelefone(resultado.id)
      .then(function ResolverTelefone(result) {
        return {
          usuario: {
            id: resultado.id,
            nome: resultado.nome,
            dataNascimento: resultado.dataNascimento
          },
          telefone: result
        }
      })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco
      .then(function resolverEndereco(result) {
        return {
          usuario: resultado.usuario,
          telefone: resultado.telefone,
          endereco: result
        }
      })
  })
  .then(function (resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome}
      Nascimento: ${resultado.usuario.dataNascimento}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
      Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
    `)
  })
  .catch(function (error) {
    console.error('DEU RUIM', error)
  })


// obterUsuario(function resolverUsuario(error, usuario) {
//   if (error) {
//     console.error('DEU RUIM NO USUÁRIO ', error)
//     return;
//   }

//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error('DEU RUIM NO TELEFONE ', error1)
//       return;
//     }

//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error('DEU RUIM NO ENDEREÇO ', error2)
//         return;
//       }

//       console.log(`
//         Nome: ${usuario.nome}
//         Nascimento: ${usuario.dataNascimento}
//         Endereco: ${endereco.rua}, ${endereco.numero}
//         Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `)
//     })
//   })
// })
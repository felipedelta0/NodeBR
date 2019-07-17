/*
0 - Obter um usuário
1 - Obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: 'Luis Felipe Alcântara dos Santos',
      dataNascimento: new Date(1996, 4, 6)
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '982791669',
      ddd: 12
    })
  }, 2000)
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'Geraldo Soares Lemes',
      numero: '40'
    })
  }, 2000)
}

function resolverUsuario(erro, usuario) {
  console.log('usuario: ', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error('DEU RUIM NO USUÁRIO ', error)
    return;
  }

  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error('DEU RUIM NO TELEFONE ', error1)
      return;
    }

    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error('DEU RUIM NO ENDEREÇO ', error2)
        return;
      }

      console.log(`
        Nome: ${usuario.nome}
        Nascimento: ${usuario.dataNascimento}
        Endereco: ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `)
    })
  })
})
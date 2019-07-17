const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.once('newListener', (event, listener) => {
  if (event === 'testeEvento') {
    myEmitter.on('testeEvento', () => {
      console.log('CHEGOU AQUI')
    })
  } else {
    console.log('EITA')
  }
})

myEmitter.addListener('testeEvento', () => {
  console.log('OPAAAAA')
})

myEmitter.emit('testeEvento')
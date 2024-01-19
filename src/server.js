import http from 'node:http'

// POST - /tasks
// GET - /tasks
// PUT - /tasks/:id
// DELETE - /tasks/:id
// PATCH - /tasks/:id/complete

const tasks = []

const server = http.createServer(async(req, res) => {
  const {method, url} = req


  if(method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  if(method === 'POST' && url === '/users') {
    tasks.push({
      id: 1,
      title: 'comprar pão',
      descrpition: 'passar na padoca e comprar pão',
      completed_at: null,
      created_at: '19/01/2024',
      updated_at: null
    })

    return res.end('Criação de tasks')
  }

  return res.end("hello world")
})

server.listen(3333)


import http from 'node:http'
import { Json } from './middleware/json.js'

// POST - /tasks
// GET - /tasks
// PUT - /tasks/:id
// DELETE - /tasks/:id
// PATCH - /tasks/:id/complete

const tasks = []

const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await Json(req, res)

  if(method === 'GET' && url === '/tasks') {
    return res.end(JSON.stringify(tasks))
  }

  if(method === 'POST' && url === '/tasks') {

    const {title, descrpition, completed_at, created_at, updated_at} = req.body

    tasks.push({
      id: 1,
      title,
      descrpition,
      completed_at,
      created_at: '19/01/2024',
      updated_at
    })

    return res.end('Criação de tasks')
  }

  return res.end("hello world")
})

server.listen(3333)


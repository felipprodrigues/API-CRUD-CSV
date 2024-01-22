import http from 'node:http'
import { Json } from './middleware/json.js'
import { routes } from './routes.js'

// POST - /tasks
// GET - /tasks
// PUT - /tasks/:id
// DELETE - /tasks/:id
// PATCH - /tasks/:id/complete

const server = http.createServer(async(req, res) => {
  const {method, url} = req

  await Json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routeParams = req.url.match(route.path)

    // CRIAMOS A NOVA CHAVE EM REQ CHAMADA PARAMS
    req.params = {...routeParams.groups}

    return route.handler(req, res)
  }


  return res.writeHead(404).end()
})

server.listen(3333)


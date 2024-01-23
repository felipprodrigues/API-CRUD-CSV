import { Database } from './database.js'
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

const newDate = new Date().toISOString()
const currentDate = newDate.split('T').join('@').split('.')[0]

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const {title, description, completed_at} = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at,
        created_at: currentDate,
      }

      database.insert('tasks', task)

      return res.end('Criação de tasks')
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description, completed_at } = req.body

      database.update('tasks', id, {
        title,
        description,
        completed_at,
        updated_at: currentDate
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      // const { completed_at } = req.body

      database.update('tasks', id, completed_at)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]

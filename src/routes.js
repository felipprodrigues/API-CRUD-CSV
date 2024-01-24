import { Database } from './database.js'
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

const newDate = new Date()


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
      const {title, description } = req.body

      if(!title || !description) {
        return res.writeHead(400).end(JSON.stringify({message: 'title and description are required'}))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: newDate,
        updated_at: newDate
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
      const {title, description } = req.body

      if(!title || !description) {
        return res.writeHead(204).end(JSON.stringify({message: 'title and description are required'}))
      }

      const [registeredTasks] = database.select('tasks', id)

      if(!registeredTasks) {
        return res.writeHead(404).end(JSON.stringify({message: 'cannot find current id'}))
      }

      const updatedTasks = {
        title: title ?? registeredTasks.title,
        description: description ?? registeredTasks.description,
        updated_at: newDate
      }

      database.update('tasks', id, updatedTasks)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const [registeredTasks] = database.select('tasks', id)

      if(!registeredTasks) {
        return res.writeHead(204).end(JSON.stringify({message: 'title and description are required'}))
      }

      const taskCompleted = !!registeredTasks.completed_at // converts truthy/falsy to boolean
      const completed_at = taskCompleted ? newDate : null

      database.update('tasks', id, completed_at)
      console.log(taskCompleted, 'aqui o item')
      console.log(completed_at, 'aqui o item')


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

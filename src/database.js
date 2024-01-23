import fs from 'node:fs/promises'

// localização relativa ao banco de dados
const dataBasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  // será instanciado assim que o banco de dados for instanciado
  constructor() {
    fs.readFile(dataBasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data)
      }).catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
    return data
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      // retorna -1 caso seja false
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      // retorna -1 caso seja false
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }

  patch(table, id, completed_at) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      // retorna -1 caso seja false
      this.#database[table][rowIndex] = {id, ...completed_at}
      this.#persist()
    }
  }
}

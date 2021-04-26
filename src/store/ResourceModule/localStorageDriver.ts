import { v4 as uuid } from 'uuid'

const storage = localStorage

export default {
  async get (endpoint: string) {
    const parts = endpoint.split('/')

    if (parts[parts.length - 1] === '') {
      parts.pop()
    }

    const id = parts[parts.length - 1]

    const storageKey = parts.slice(0, -1).join('/')

    const table = storage.getItem(storageKey)

    return table ? JSON.parse(table)[id] : null
  },
  async get_all (endpoint: string) {
    let key = endpoint
    if (endpoint.slice(-1) === '/') {
      key = endpoint.slice(0, -1)
    }
    const table = storage.getItem(key)

    return table ? Object.values(JSON.parse(table)) : []
  },
  async post (endpoint: string, data: {[key: string]: any} = {}) {
    let key = endpoint
    if (endpoint.slice(-1) === '/') {
      key = endpoint.slice(0, -1)
    }
    let table = JSON.parse(storage.getItem(key))

    if (!table) table = {}

    const id: string = data.id || uuid()
    data.id = id

    table[id] = data

    storage.setItem(key, JSON.stringify(table))

    return data
  },
  async update (endpoint: string, data: Resource) {
    const parts = endpoint.split('/')

    if (parts[parts.length - 1] === '') {
      parts.pop()
    }

    const id = parts[parts.length - 1]

    const storageKey = parts.slice(0, -1).join('/')

    const table = JSON.parse(storage.getItem(storageKey))

    if (table) {
      table[id] = data
    }

    storage.setItem(storageKey, JSON.stringify(table))

    return data
  },
  async delete (endpoint: string) {
    const parts = endpoint.split('/')

    if (parts[parts.length - 1] === '') {
      parts.pop()
    }

    const id = parts[parts.length - 1]

    const storageKey = parts.slice(0, -1).join('/')

    const table = JSON.parse(storage.getItem(storageKey))

    if (table) {
      delete table[id]
    }

    storage.setItem(storageKey, JSON.stringify(table))
  },

}

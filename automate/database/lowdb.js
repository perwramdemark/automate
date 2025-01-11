import { JSONFilePreset } from 'lowdb/node'
import path from 'path'
import Config from '../config.js'

export class LowdbBase {
  constructor(filePath) {
    const config = new Config()
    this.filePath = path.resolve(config.get('FOLDER'), filePath)
  }

  async #init() {
    this.db = await JSONFilePreset(this.filePath, [])
  }

  async getCollection() {
    await this.#init()
    return this.db.data
  }

  async write() {
    await this.db.write()
  }
}

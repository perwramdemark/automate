import { JSONFilePreset } from 'lowdb/node'

export class LowdbBase {
  constructor(filePath) {
    this.filePath = filePath
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

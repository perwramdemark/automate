import {LowdbBase} from 'automate/database/lowdb.js'

export class TheMovieDbStorage extends LowdbBase {

  constructor(filename) {
    super(filename)
  }

  async findItemById(id) {
    const items = await this.getCollection()
    return items.find(item => item.id === id)
  }

  async addItemOrItems(newItemOrItems) {
    const items = await this.getCollection()

    // Handle case where newItemOrItems is an array
    if (Array.isArray(newItemOrItems)) {
      // Filter out items that already exist in the collection
      const itemsToAdd = newItemOrItems.filter(item => !items.some(existingItem => existingItem.id === item.id))
      items.push(...itemsToAdd)
      await this.write()
      return itemsToAdd
    }

    // Handle case where newItemOrItems is a single item
    if (!items.some(existingItem => existingItem.id === newItemOrItems.id)) {
      items.push(newItemOrItems)
      await this.write()
      return newItemOrItems
    }

    return null
  }

}

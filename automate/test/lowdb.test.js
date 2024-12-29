import { LowdbBase } from '../database/lowdb.js'
import { describe, expect, it } from 'vitest'

describe('Lets test the lowDb integration', () => {
  it('should initialize with an empty collection', async () => {
    const db = new LowdbBase('test.json')
    const data = await db.getCollection()

    expect(data).toEqual([])

    await db.write()
    const data2 = await db.getCollection()

    expect(data).toEqual([])
    expect(data2).toEqual([])
  })

  it('should be able to add one item collection', async () => {
    const db = new LowdbBase('test2.json')
    const data = await db.getCollection()

    expect(data).toEqual([])

    data.push({ id: '3' })
    await db.write()
    expect(data).toEqual([{ id: '3' }])
  })
})

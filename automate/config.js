import * as dotenv from 'dotenv'

export default class Config {
  constructor() {
    dotenv.config()
    this.validate()
  }

  validate() {
    const requiredVars = [
      'FOLDER',
      'LANGUAGE',
      'THEMOVIEDB_READ_TOKEN',
      'THEMOVIEDB_ACCOUNT_OBJECT_ID',
    ]
    const missingVars = requiredVars.filter((key) => !process.env[key])

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      )
    }
  }

  get(key) {
    return process.env[key]
  }
}

import { Sequelize } from 'sequelize-typescript'
import { ApiKey } from '../models/apiKey'
import { Event } from '../models/event'
import { User } from '../models/user'
import { Door } from '../models/door'

export class Database {
  private readonly sequelize: Sequelize

  constructor (connectionInfo: string) {
    this.sequelize = new Sequelize(connectionInfo, {
      logging: console.log
    })
    this.registerModels()
  }

  registerModels (): void {
    this.sequelize.addModels([
      ApiKey,
      Event,
      User,
      Door
    ])
  }
}

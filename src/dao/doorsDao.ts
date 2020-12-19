import { Service } from 'typedi'
import * as uuid from 'uuid'
import { Door, DoorModel } from '../models/door'
import { API } from '../publicInterfaces'

// tslint:disable:newline-per-chained-call
@Service()
export class DoorsDao {
  public async create (body: API.Doors.Post.Body): Promise<DoorModel> {
    return (await Door.create({
      uuid: uuid.v4(),
      ...body
    })).serialize()
  }

  public async getById (uuid: string): Promise<Door | null> {
    return Door.findOne({
      where: {
        uuid
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    })
  }

  public async getAll (): Promise<Door[]> {
    return Door.findAll({
      order: [['createdAt', 'DESC']]
    })
  }

  public async update (door: Door): Promise<Door> {
    return door.save()
  }
}

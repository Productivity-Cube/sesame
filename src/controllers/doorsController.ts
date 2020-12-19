import { Authorized, Body, Get, JsonController, Params, Post, Put } from 'routing-controllers'
import { DoorsDao } from '../dao/doorsDao'
import { DoorNotFoundError } from '../errors/apiErrors'
import { Door, DoorModel } from '../models/door'
import { API } from '../publicInterfaces'

@JsonController()
export class DoorsController {
  constructor (
    private readonly doorsDao: DoorsDao,
  ) {
  }

  @Post('/doors')
  @Authorized()
  async index (@Body() body: API.Doors.Post.Body): Promise<API.Doors.Post.Response> {
    return this.doorsDao.create(body)
  }

  @Get('/doors')
  @Authorized()
  async getAll (): Promise<API.Doors.Get.Response> {
    return (await this.doorsDao.getAll()).map((door: Door): DoorModel => door.serialize())
  }

  @Put('/doors/:uuid')
  @Authorized()
  async update (@Params() params: API.Doors.uuid.Put.Params, @Body() body: API.Doors.uuid.Put.Body): Promise<API.Doors.uuid.Put.Response> {
    const door: Door | null = await this.doorsDao.getById(params.uuid)
    if (!door) {
      throw new DoorNotFoundError()
    }

    door.overwrite(<DoorModel> body)

    return (await this.doorsDao.update(door)).serialize()
  }

  @Get('/doors/:uuid')
  @Authorized()
  async get (@Params() params: API.Doors.uuid.Get.Params): Promise<API.Doors.uuid.Get.Response> {
    const door: Door | null = await this.doorsDao.getById(params.uuid)
    if (!door) {
      throw new DoorNotFoundError()
    }

    return door.serialize()
  }
}

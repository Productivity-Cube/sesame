import { Authorized, Body, Get, JsonController, Post, QueryParams, Put } from 'routing-controllers'
import { EVENT_MAX_PEOPLE, EVENT_REGISTER_CLIENT } from '../config'
import { EventDao } from '../dao/eventDao'
import { EventModel } from '../models/event'
import { API } from '../publicInterfaces'

@JsonController()
export class EventController {
  constructor (
    private readonly eventDao: EventDao,
  ) {
  }

  @Post('/events')
  @Authorized()
  async index (@Body() body: API.Events.Post.Body): Promise<API.Events.Post.Response> {
    return this.eventDao.create(body.name)
  }

  @Post('/clients')
  @Authorized()
  async registerClient (@Body() body: API.Clients.Post.Body): Promise<API.Clients.Post.Response> {
    // tslint:disable-next-line:no-non-null-assertion
    return (await this.eventDao.create(EVENT_REGISTER_CLIENT, (body.ingoing ? 1 : -1).toString())).toJSON()
  }

  @Get('/clients/number')
  @Authorized()
  async currentClients (): Promise<API.Clients.Number.Get.Response> {
    return {
      currentClients: await this.eventDao.getCurrentClients()
    }
  }

  @Put('/clients/number/max')
  @Authorized()
  async setMaxClients (@Body() body: API.Clients.Number.Max.Put.Body): Promise<API.Clients.Number.Max.Put.Response> {
    // tslint:disable-next-line:no-non-null-assertion
    return (await this.eventDao.create(EVENT_MAX_PEOPLE, body.max!.toString())).toJSON()
  }

  @Get('/clients/number/max')
  @Authorized()
  async getMaxClients (): Promise<API.Clients.Number.Max.Get.Response> {
    const event: EventModel | null = await this.eventDao.getLastValue(EVENT_MAX_PEOPLE)

    return {
      max: event && event.value ? parseInt(event.value, 0) : 0
    }
  }

  @Get('/events')
  @Authorized()
  async list (
    @QueryParams() queryParams: API.Events.Get.QueryParams,
  ): Promise<API.Events.Get.Response> {
    return this.eventDao.find(queryParams)
  }
}

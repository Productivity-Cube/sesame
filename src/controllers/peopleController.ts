import { Body, JsonController, Post } from 'routing-controllers'
import { DoorsSensorClient } from '../client/doorSensorClient'
import { EVENT_MAX_PEOPLE } from '../config'
import { DoorsDao } from '../dao/doorsDao'
import { EventDao } from '../dao/eventDao'
import {
  DoorCannotBeOpenedError,
  DoorNotFoundError,
  MaxLimitNotFoundError,
  MinPeopleError,
  SensorError
} from '../errors/apiErrors'
import { Door } from '../models/door'
import { EventModel } from '../models/event'
import * as moment from 'moment'

@JsonController()
export class PeopleController {
  constructor (
    private readonly eventDao: EventDao,
    private readonly doorsDao: DoorsDao,
    private readonly doorsSensorClient: DoorsSensorClient
  ) {
  }

  @Post('/people/mask')
  async index (@Body() body: any): Promise<any> {
    const numberOfPeople: number = body.people
    if (numberOfPeople < 1) {
      throw new MinPeopleError()
    }

    const currentClients: number = await this.eventDao.getCurrentClients()
    const limit: EventModel | null = await this.eventDao.getLastValue(EVENT_MAX_PEOPLE)
    if (!limit) {
      throw new MaxLimitNotFoundError()
    }

    const isOk: boolean = currentClients + numberOfPeople < (limit.value || 0)

    if (isOk) {
      const door: Door | null = await this.doorsDao.getById(body.doorId)
      if (door === null) {
        throw new DoorNotFoundError()
      }
      // tslint:disable-next-line:newline-per-chained-call
      const now: number = parseInt(moment().format('HHmm'), 0)
      if ((door.openAt && parseInt(door.openAt, 0) > now) || (door.closeAt && parseInt(door.closeAt, 0) < now)) {
        throw new DoorCannotBeOpenedError()
      }

      const isDoorOpened: boolean = await this.doorsSensorClient.letPersonIn(door)
      if (!isDoorOpened) {
        throw new SensorError()
      }
    }

    return { 'ok': isOk }
  }
}

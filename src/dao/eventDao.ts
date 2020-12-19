import * as _ from 'lodash'
import * as moment from 'moment'
import * as Sequelize from 'sequelize'
import { Service } from 'typedi'
import * as uuid from 'uuid'
import { EVENT_REGISTER_CLIENT } from '../config'
import { Event, EventModel } from '../models/event'
import { API } from '../publicInterfaces'

// tslint:disable:newline-per-chained-call
@Service()
export class EventDao {
  public async create (name: string, value?: string, doorId?: string): Promise<Event> {
    return Event.create({
      uuid: uuid.v4(),
      name,
      value,
      doorId
    })
  }

  public async getLastValue (name: string): Promise<EventModel | null> {
    return Event.findOne({
      where: {
        name
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    })
  }

  public async getCurrentClients (): Promise<number> {
    const events: Event[] = await Event.findAll({
      include: [{ all: true }],
      where: {
        name: EVENT_REGISTER_CLIENT
      },
    })

    return events.reduce((sum: number, event: Event): number => sum + parseInt(event.value ?? '0', 0), 0)
  }

  // tslint:disable-next-line:cyclomatic-complexity max-func-body-length
  public async find (
    queryParams: API.Events.Get.QueryParams,
  ): Promise<EventModel[]> {
    const group: string[] = []
    const attributes: Sequelize.FindAttributeOptions = ['uuid', 'name', 'value', 'createdAt']

    const eventWhere: {
      createdAt?: Object;
    } = {}

    if (!_.isUndefined(queryParams.dateFrom)) {
      eventWhere.createdAt = {
        [Sequelize.Op.gte]: moment(queryParams.dateFrom).toDate()
      }
    }

    if (!_.isUndefined(queryParams.dateTo)) {
      eventWhere.createdAt = {
        ...eventWhere.createdAt,
        [Sequelize.Op.lte]: moment(queryParams.dateTo).toDate()
      }
    }

    return (await Event.findAll({
      include: [{ all: true }],
      attributes: attributes,
      where: <Sequelize.WhereOptions> eventWhere,
      order: [['createdAt', 'desc']],
      group: _.isEmpty(group) ? undefined : group,
    })).map((event: Event): EventModel => event.toJSON())
  }
}

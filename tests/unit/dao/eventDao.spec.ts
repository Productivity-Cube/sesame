import * as Sequelize from 'sequelize'
import { SinonStub } from 'sinon'
import { EventDao } from '../../../src/dao/eventDao'
import { Event } from '../../../src/models/event'
import { activityMock } from '../../mocks/Activity'
import { eventMock } from '../../mocks/Event'
import { ModelMock } from '../../mocks/Model'
import { userMock } from '../../mocks/User'
import { expect, sinon } from '../setup'
// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-null-keyword max-func-body-length no-big-function

describe('#EventDao', () => {
  const eventDao: EventDao = new EventDao()
  describe('create', () => {
    const createStub: SinonStub = sinon.stub(Event, 'create')
    const findOneStub: SinonStub = sinon.stub(Event, 'findOne')

    it('Should save event for the user and activity', async () => {
      createStub.resolves(new ModelMock(eventMock))
      findOneStub.resolves(new ModelMock(eventMock))
      expect(await eventDao.create('test')).to.equal(eventMock)
      expect(createStub).to.be.calledWith({
        uuid: sinon.match.any,
        name: 'userName',
        productivityRate: undefined,
        userId: userMock.uuid,
        activityId: activityMock.uuid
      })
    })
  })

  describe('find', () => {
    const findAllStub: SinonStub = sinon.stub(Event, 'findAll')
    findAllStub.resolves([new ModelMock(eventMock)])

    it('Should retrieve all data for user', async () => {
      expect(await eventDao.find('userName', {})).to.deep.equal([eventMock])
      expect(findAllStub.lastCall.args[0].include[0].where).to.deep.equal({})
      expect(findAllStub.lastCall.args[0].include[1].where).to.deep.equal({ name: 'userName' })
    })

    it('Should be able to filter by date from', async () => {
      expect(await eventDao.find({
        dateFrom: '12-10-2012',
      })).to.deep.equal([eventMock])
      expect(findAllStub.lastCall.args[0].where).to.deep.equal({
        createdAt: {
          [Sequelize.Op.gte]: '2012-12-09T23:00:00.000Z',
        },
      })
      expect(findAllStub.lastCall.args[0].include[0].where).to.deep.equal({})
      expect(findAllStub.lastCall.args[0].include[1].where).to.deep.equal({ name: 'userName' })
    })
    it('Should be able to filter by date to', async () => {
      expect(await eventDao.find({
        dateTo: '12-10-2012',
      })).to.deep.equal([eventMock])
      expect(findAllStub.lastCall.args[0].where).to.deep.equal({
        createdAt: {
          [Sequelize.Op.lte]: '2012-12-09T23:00:00.000Z',
        },
      })
      expect(findAllStub.lastCall.args[0].include[0].where).to.deep.equal({})
      expect(findAllStub.lastCall.args[0].include[1].where).to.deep.equal({ name: 'userName' })
    })
  })
})

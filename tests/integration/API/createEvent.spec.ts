// tslint:disable:typedef newline-per-chained-call no-unused no-unused-expression no-backbone-get-set-outside-model
import { API } from '../../../src/publicInterfaces'
import { loginCall } from '../helpers/apiCalls'

// tslint:disable-next-line:max-func-body-length
describe('POST /api/events', () => {
  const name: string = 'Wojciech'

  let user: API.Login.Post.Response
  beforeEach(async () => {
    user = await loginCall(name, 200)
  })
})

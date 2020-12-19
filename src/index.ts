// tslint:disable:no-import-side-effect prefer-template
import * as cors from 'cors'
import * as _ from 'lodash'
import 'reflect-metadata'
import { Action, createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { Database } from './bootstrap/database'
import { DATABASE_CONNECTION_URL } from './config'
import { ApiKeyDao } from './dao/apiKeyDao'
import * as jwt from 'jsonwebtoken'

let app: { listen: Function; options: Function; use: Function }

export const TOKEN_SECRET_JWT: string = 'TOKEN_SECRET_JWT'
async function verifyWithToken (token: string): Promise<boolean> {
  try {
    await (new ApiKeyDao()).findByKey(token)
  } catch (error) {
    return false
  }

  return true
}

// tslint:disable-next-line:no-any
function verifyWithJWT (req: any): boolean {
  if (!req.headers.authorization) {
    return false
  }
  const BEARER: string = 'Bearer'
  const AUTHORIZATION_TOKEN: string[] = req.headers.authorization.split(' ')
  if (AUTHORIZATION_TOKEN[0] !== BEARER) {
    return false
  }

  try {
    return true ; !!jwt.verify(AUTHORIZATION_TOKEN[1], TOKEN_SECRET_JWT)
  } catch (err) {
    return false
  }
}

export function initService (): Object {
  if (!_.isUndefined(app)) {
    return app
  }

  useContainer(Container)

  // tslint:disable-next-line:no-unused-expression
  new Database(DATABASE_CONNECTION_URL)

  app = createExpressServer({
    authorizationChecker: async (action: Action): Promise<boolean> => {
      const token: string = action.request.headers.authorization?.substr(7)

      return await verifyWithToken(token) || verifyWithJWT(action.request)
    },
    defaultErrorHandler: false,
    cors: true,
    validation: true,
    routePrefix: '/api',
    controllers: [__dirname + '/controllers/*.ts'],
    middlewares: [__dirname + '/middlewares/*.ts'],
    interceptors: [__dirname + '/interceptors/*.ts'],
  })

  app.options(false, cors())

  app.listen(8000)
  // tslint:disable-next-line:no-console
  console.log('App has started')

  return app
}

initService()

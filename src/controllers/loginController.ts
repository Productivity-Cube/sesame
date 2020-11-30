import { Body, JsonController, Post, Req } from 'routing-controllers'
import { TOKEN_SECRET_JWT } from '../index'
import { UserModel } from '../models/user'
import { API } from '../publicInterfaces'
import { UserDao } from '../dao/userDao'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@JsonController()
export class LoginController {
  constructor (
    private readonly userDao: UserDao,
  ) {
  }

  @Post('/login')
  async index (@Body() body: API.Login.Post.Body): Promise<API.Login.Post.Response> {
    const login: string = <string> body.login
    const password: string = <string> body.password

    const user: UserModel = await this.userDao.getByLoginAndPassword(login, password)

    return this.generateTokens(user)
  }

  generateTokens (user: UserModel): API.Login.Post.Response {
    const ACCESS_TOKEN: string = jwt.sign({
      sub: user.uuid,
      role: 'admin',
      type: 'ACCESS_TOKEN'
    },
      TOKEN_SECRET_JWT, {
        expiresIn: 120
      });
    const REFRESH_TOKEN: string = jwt.sign({
      sub: user.uuid,
      rol: 'admin',
      type: 'REFRESH_TOKEN'
    },
    TOKEN_SECRET_JWT, {
      expiresIn: 480
    })

    return {
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN
    }
  }
}

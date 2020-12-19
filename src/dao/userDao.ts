import * as _ from 'lodash'
import { Service } from 'typedi'
import { UserNotFoundError } from '../errors/apiErrors'
import { User, UserModel } from '../models/user'
import * as bcrypt from 'bcrypt'

@Service()
export class UserDao {
  public async getByLoginAndPassword (login: string, password: string): Promise<UserModel> {
    const user: User | null = await User.findOne({
      where: {
        login,
      }
    })

    if (_.isNull(user)) {
      throw new UserNotFoundError()
    }

    // @todo hax
    if (user.password) {
      user.password = password
      await user.hashPassword()
      console.log(user.password)
    }
    if (!user.password || !(await bcrypt.compare(password, user.password))) {
      throw new UserNotFoundError()
    }

    return user.toJSON()
  }
}

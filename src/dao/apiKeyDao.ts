import * as crypto from 'crypto'
import * as _ from 'lodash'
import { Service } from 'typedi'
import * as uuid from 'uuid'
import { ApiKeyNotFoundError } from '../errors/apiErrors'
import { ApiKey, ApiKeyModel } from '../models/apiKey'

@Service()
export class ApiKeyDao {
  public async createForUser (): Promise<ApiKey> {
    return ApiKey.create({
      ...this.generateApiKeyObject()
    })
  }

  public async findByKey (key: string): Promise<ApiKeyModel> {
    // tslint:disable-next-line:typedef
    const apiKey: ApiKey | null = await ApiKey.findOne({
      where: {
        key,
      }
    })

    if (_.isNull(apiKey)) {
      throw new ApiKeyNotFoundError()
    }

    return apiKey.toJSON()
  }

  private generateApiKeyObject (): ApiKeyModel {
    return {
      uuid: uuid.v4(),
      key: crypto
        .randomBytes(48)
        .toString('hex')
    }
  }
}

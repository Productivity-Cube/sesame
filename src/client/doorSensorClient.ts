import { Service } from 'typedi'
import { Door } from '../models/door'
import fetch from 'node-fetch'

@Service()
export class DoorsSensorClient {
  public async letPersonIn (door: Door): Promise<boolean> {
    try {
      // tslint:disable-next-line:no-http-string
      await fetch(`http://${door.ip}/person/add`)

      return true
    } catch (e) {
      return false
    }
  }
}

import * as _ from 'lodash'
import { expect } from '../setup'

export function expectWithoutDates (data: Object, expectedResult: Object): void {
  const omit: string[] = ['createdAt', 'updatedAt', 'apiKey']
  // tslint:disable-next-line:newline-per-chained-call
  expect(_.omit(data, omit)).to.deep.equal(_.omit(expectedResult, omit))
}

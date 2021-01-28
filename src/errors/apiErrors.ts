import { HttpError } from 'routing-controllers'

export class UserNotFoundError extends HttpError {
  constructor () {
    super(404, 'User not found');
    Object.setPrototypeOf(this, UserNotFoundError.prototype)
  }
}
export class DoorNotFoundError extends HttpError {
  constructor () {
    super(404, 'Door not found');
    Object.setPrototypeOf(this, UserNotFoundError.prototype)
  }
}
export class DoorCannotBeOpenedError extends HttpError {
  constructor () {
    super(400, 'Door cannot be opened');
    Object.setPrototypeOf(this, DoorCannotBeOpenedError.prototype)
  }
}
export class SensorError extends HttpError {
  constructor () {
    super(500, 'Sensor error');
    Object.setPrototypeOf(this, SensorError.prototype)
  }
}
export class MinPeopleError extends HttpError {
  constructor () {
    super(400, 'Minimal people count is 1');
    Object.setPrototypeOf(this, MinPeopleError.prototype)
  }
}
export class MaxLimitNotFoundError extends HttpError {
  constructor () {
    super(404, 'Max Limit not found');
    Object.setPrototypeOf(this, MaxLimitNotFoundError.prototype)
  }
}
export class ActivityNotFoundError extends HttpError {
  constructor () {
    super(404, 'Activity not found');
    Object.setPrototypeOf(this, ActivityNotFoundError.prototype)
  }
}
export class ApiKeyNotFoundError extends HttpError {
  constructor () {
    super(404, 'Api Key not found');
    Object.setPrototypeOf(this, ApiKeyNotFoundError.prototype)
  }
}

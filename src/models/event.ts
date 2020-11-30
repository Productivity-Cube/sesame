import { AllowNull, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'

export interface EventModel {
  uuid?: string
  name?: string
  value?: string
  createdAt?: Date | string
}

@Table({
  timestamps: true,
})
export class Event extends Model<Event> implements EventModel {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  public uuid?: string

  @Column
  public name?: string

  @Column
  public value?: string

  createdAt?: Date | string
}

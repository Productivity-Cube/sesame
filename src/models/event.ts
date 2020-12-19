import { AllowNull, Column, DataType, Model, PrimaryKey, ForeignKey, Table, Unique,BelongsTo } from 'sequelize-typescript'
import { Door } from './door'

export interface EventModel {
  uuid?: string
  name?: string
  value?: string
  doorId?: string
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

  @Column
  // tslint:disable-next-line:typedef
  @ForeignKey(() => Door)
  public doorId?: string

  // tslint:disable-next-line:typedef
  @BelongsTo(() => Door)
  public door?: Door

  createdAt?: Date | string
}

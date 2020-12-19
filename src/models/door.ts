import { AllowNull, Column, DataType, Model, PrimaryKey, HasMany, Table, Unique } from 'sequelize-typescript'
import { Event } from './event'

export interface DoorModel {
  uuid?: string
  name?: string
  openAt?: string
  closeAt?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

@Table({
  timestamps: true,
})
export class Door extends Model<Door> implements DoorModel {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  public uuid?: string

  @Column
  public name?: string

  @Column
  public openAt?: string

  @Column
  public closeAt?: string

  // tslint:disable-next-line:typedef
  @HasMany(() => Event)
  public events?: Event

  createdAt?: Date | string
  updatedAt?: Date | string

  public overwrite (door: DoorModel): void {
    this.name = door.name ?? this.name
    this.openAt = door.openAt ?? this.openAt
    this.closeAt = door.closeAt ?? this.closeAt
  }

  public serialize(): DoorModel {
    return JSON.parse(JSON.stringify(this))
  }
}

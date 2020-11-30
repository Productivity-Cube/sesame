import { AllowNull, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'
import * as bcrypt from 'bcrypt'

export interface UserModel {
  uuid?: string
  login?: string
  password?: string
}

@Table({
  timestamps: true,
})
export class User extends Model<User> {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  public uuid?: string

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public login?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  public password?: string

  public hashPassword (): void {
    const saltRounds: number = 10 // @todo
    this.password = bcrypt.hashSync(this.password, saltRounds)
  }
}

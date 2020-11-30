import { AllowNull, Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript'

export interface ApiKeyModel {
  uuid?: string
  key?: string
}

@Table({
  timestamps: true,
})
export class ApiKey extends Model<ApiKey> implements ApiKeyModel {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  public uuid?: string

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public key?: string
}

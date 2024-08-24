import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  modelName: 'user',
  freezeTableName: true,
})
export class UserEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  status: number;

  @Column({ allowNull: false, type: DataType.DATE })
  createdAt: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  deletedAt: Date;
}

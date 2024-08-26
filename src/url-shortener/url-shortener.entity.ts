import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from 'src/user/user.entity';

@Table({
  tableName: 'url_shortener',
  modelName: 'url_shortener',
  freezeTableName: true,
})
export class UrlShortenerEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => UserEntity)
  @Column({ allowNull: true, type: DataType.INTEGER })
  userId: number;

  @Column({ allowNull: false, type: DataType.STRING })
  url_original: string;

  @Column({ allowNull: false, type: DataType.STRING })
  url_short: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  count: number;

  @Column({ allowNull: false, type: DataType.DATE })
  createdAt: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  deletedAt: Date;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}

import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UrlShortenerEntity } from 'src/url-shortener/url-shortener.entity';

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

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  status: number;

  @Column({ allowNull: false, type: DataType.DATE })
  createdAt: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  deletedAt: Date;

  @HasMany(() => UrlShortenerEntity)
  urlShorteners: UrlShortenerEntity[];
}

import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from 'domain/entities/User';

export default (sequelize: Sequelize): Record<string, any> => {
  class UserModel extends Model implements User {
    public id!: string;

    public balance!: number;

    public currency!: string;
    
    public static associate(): void {
      this.belongsToMany(sequelize.models.AtmModel, {
        foreignKey: 'user_id',
        through: 'TransactionModel',
        as: 'atms',
      });
    }
  }

  UserModel.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.DECIMAL,
    },
    currency: {
      type: new DataTypes.STRING(128),
    },
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return UserModel;
}
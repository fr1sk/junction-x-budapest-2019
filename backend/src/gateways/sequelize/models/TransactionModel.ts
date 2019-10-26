import { Model, DataTypes, Sequelize } from 'sequelize';
import { Transaction } from 'domain/entities/Transaction';

export default (sequelize: Sequelize): Record<string, any> => {
  class TransactionModel extends Model implements Transaction {
    public atm_id!: string;

    public user_id!: string;

    public type!: string;

    public amount!: number;

    public static associate(): void {
      this.belongsTo(sequelize.models.AtmModel, {
        foreignKey: 'atm_id',
        as: 'atms',
      });

      this.belongsTo(sequelize.models.UserModel, {
        foreignKey: 'user_id',
        as: 'users',
      });
    }
  }

  TransactionModel.init({
    atm_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'atm',
        key: 'id',
      },
      unique: 'transaction',
    },
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id',
      },
      unique: 'transaction',
    },
    type: {
      type: new DataTypes.STRING(128),
    },
    amount: {
      type: DataTypes.DECIMAL,
    },
  }, {
    sequelize,
    tableName: 'transaction',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return TransactionModel;
}
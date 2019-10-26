import { Model, DataTypes, Sequelize } from 'sequelize';
import { Transaction } from 'domain/entities/Transaction';

export default (sequelize: Sequelize): Record<string, any> => {
  class TransactionModel extends Model implements Transaction {
    public id!: string;

    public atm_id!: string;

    public user_id!: string;

    public type!: string;

    public amount!: number;

    public qr_code!: string;

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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    atm_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'atm',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    type: {
      type: new DataTypes.STRING(128),
    },
    amount: {
      type: DataTypes.DECIMAL,
    },
    qr_code: {
      type: new DataTypes.STRING(400),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'transactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return TransactionModel;
};

import { Model, DataTypes, Sequelize } from 'sequelize';
import { Atm } from 'domain/entities/Atm';

export default (sequelize: Sequelize): Record<string, any> => {
  class AtmModel extends Model implements Atm {
    public id!: string;
    
    public location!: string;

    public deposit!: boolean;

    public balance!: number;

    public currency!: string[];

    public static associate(): void {
      this.belongsToMany(sequelize.models.UserModel, {
        foreignKey: 'atm_id',
        through: 'TransactionModel',
        as: 'users',
      });
    }
  }

  AtmModel.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    location: {
      type: new DataTypes.STRING(128),
    },
    deposit: {
      type: DataTypes.BOOLEAN,
    },
    balance: {
      type: DataTypes.DECIMAL,
    },
    currency: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  }, {
    sequelize,
    tableName: 'atm',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return AtmModel;
}
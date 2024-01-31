import { DataTypes,
  Model,
  InferAttributes, InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Teams extends Model<InferAttributes<Teams>,
InferCreationAttributes<Teams>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}
Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

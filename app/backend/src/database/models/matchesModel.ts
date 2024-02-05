import { DataTypes, Model,
  InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '.';
import modelsTeams from './teamsModel';

class Matches extends Model<InferAttributes<Matches>,
InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    field: 'home_team_id',
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    type: DataTypes.INTEGER,
  },
  awayTeamId: {
    field: 'away_team_id',
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    type: DataTypes.INTEGER,
  },
  inProgress: {
    field: 'in_progress',
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Matches.belongsTo(modelsTeams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(modelsTeams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

modelsTeams.hasMany(Matches, { foreignKey: 'homeTeamId' });
modelsTeams.hasMany(Matches, { foreignKey: 'awayTeamId' });

export default Matches;

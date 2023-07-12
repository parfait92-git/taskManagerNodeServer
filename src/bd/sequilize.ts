import defineTask from "../models/task.model";
import defineToken from "../models/token.model";
import defineUser from '../models/user.model';
const { Sequelize, DataTypes } =  require("sequelize");

const sequelize = new Sequelize('tasksmanager', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

export const UserModel = defineUser(sequelize, DataTypes);
export const TaskModel = defineTask(sequelize, DataTypes);
export const TokenModel = defineToken(sequelize, DataTypes);

export const initDb = () => {
    return sequelize.sync({alter: true})
    .then(()=> {
        console.log('la base de données "taskmanager" à bien été crée.');        
    })
}


export default sequelize;
import { UserModel } from "../bd/sequilize";

const uniqid = require('uniqid');

export default function defineTask(sequelize: any, DataTypes: any) {
  const Task = sequelize.define('tasks', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: uniqid
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le userId ne doit pas être null' },
        notNull: { msg: 'La propriété userId est requise' }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: 'username', msg: 'Ce nom d\'utilisateur est déjà utilisé.' },
      validate: {
        notEmpty: { msg: 'Le nom ne doit pas être null' },
        notNull: { msg: 'La propriété nom est requise' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    realized: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,

    hooks: {
      beforeCreate: (task: any, options: any) => {
        task.priority = 'Low';
      },
      beforeUpdate: (task: any, options: any) => {
        task.priority = 'High'; 
      }
    }
  });

  Task.belongsTo(UserModel, { foreignKey: 'userid' });

  return Task;
}

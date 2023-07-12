const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
    'tasksmanager', //nom de la base de donnee
    'root',// nom d'utilisateur par defaut de mariadb permettant d'acceder a la BD
    '',// le mot de pass par defaut est vide
    {
        host: 'localhost',// le nom permettant de situer la base de donnée
        dialect: 'mariadb',// nom du driver que nous utiliser pour inter-agir avec sequilize qui est notre ORM
        dialectOptions: {
            timezone: 'Etc/GMT-5'
        },
        logging: false
    }

);

sequelize.authenticate()
.then(() => console.log('la bd a été bien connecté'))
.catch((err: any)=> console.error(err))

export { sequelize }
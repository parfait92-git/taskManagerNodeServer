const uniqid = require('uniqid');

export default function defineUser(sequelize: any, DataTypes: any) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: uniqid
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le nom ne doit pas être null'},
                notNull: {
                    msg: 'La propriété nom est réquise'
                }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le prenom ne doit pas être null'},
                notNull: {
                    msg: 'La propriété prenom est réquise'
                }
            }
        },
        profilImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
            validate: {
                notEmpty: {msg: 'Le date ne doit pas être null'},
                notNull: {
                    msg: 'La propriété date est réquise'
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'username',
                msg: 'Ce nom d\'utilisateur est déjà utilisé.',
            },
            validate: {
                notEmpty: {msg: 'Le nom ne doit pas être null'},
                notNull: {
                    msg: 'La propriété nom est réquise'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le mail ne doit pas être null'},
                notNull: {
                    msg: 'La propriété mail est réquise'
                  },
                  isEmail: { msg: 'Le format de l\'e-mail est invalide' }
            }
        },
        right: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            notEmpty: {msg: 'Le champs droit d\'utilisateur ne doit pas être null'},
            notNull: {
                msg: 'La propriété droit d\'utilisateur est réquise'
              },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            isNumeric: {
                args: true,
                msg: 'Le mot de passe doit contenir au moins un nombre'
              },
            validate: {
                notEmpty: {msg: 'Le mot de passe ne doit pas être null'},
                notNull: {
                    msg: 'La propriété mot de passe est réquise'
                  },
                  hasUppercase(value: string) {
                    if (!/[A-Z]/.test(value)) {
                      throw new Error('Le mot de passe doit contenir au moins une lettre majuscule');
                    }
                  }
            },
            min: {
                args: [6],
                msg: 'Le mot de passe doit être supérieur ou egale à 6 caractères'
            },
            max: {
                args: [24],
                msg: 'Le mot de passe doit être inférieur ou egale à 24 caractères'
            }
        },
        updated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'updated'
        },
    },  {
        timestamps: true,
        createAt: 'created',
        updatedAt: 'updated'
    });
}

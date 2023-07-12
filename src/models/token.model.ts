import { Sequelize } from "sequelize";
import { UserModel } from "../bd/sequilize";
const uniqid = require('uniqid');
const express = require('express');

export default function defineToken(sequelize: any, DataTypes: any) {
  const Token =  sequelize.define('tokens', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: {msg: 'Le token ne doit pas être null'},
            notNull: {
                msg: 'La propriété token est réquise'
            }
        }
    },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le userId ne doit pas être null'},
                notNull: {
                    msg: 'La propriété userId est réquise'
                }
            }
        },
        expriredAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
            validate: {
                notEmpty: {msg: 'Le expriredAt ne doit pas être null'},
                notNull: {
                    msg: 'La propriété expriredAt est réquise'
                }
            }
        }
    });

    Token.belongsTo(UserModel, {foreignKey: 'userId'});
    return Token;

}
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserAttributes {
    name: string;
    email: string;
}

export class User extends Model<UserAttributes, UserAttributes> {
    name!: string;
    email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly dataValues!: UserAttributes & { createdAt: Date, updatedAt: Date };

    public static initTable = (sequelize: Sequelize) => {
        User.init(
            {
                email: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    field: 'email',
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    field: 'name',
                },
            },
            { sequelize, modelName: 'client' },
        );
    };
}
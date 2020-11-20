import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { User } from './user';

interface OrderAttributes {
    id: number;
    user_email: User['email'];
    total: number;
}

export class Order extends Model<OrderAttributes, Optional<OrderAttributes, 'id'>> {
    id!: number;
    user_email!: User['email'];
    total!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly dataValues!: OrderAttributes & { createdAt: Date, updatedAt: Date };

    public static initTable = (sequelize: Sequelize) => {
        Order.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user_email: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    field: 'user_email',
                },
                total: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'total',
                },
            },
            { sequelize, modelName: 'order2' },
        );
    };
}
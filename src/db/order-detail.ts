import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Order } from './order';
import { Product } from './product';

export interface OrderDetailAttributes {
    id: number;
    product_id: Product['id'];
    order_id: Order['id'];
    total: number;
    quantity: number;
}

export class OrderDetail extends Model<OrderDetailAttributes, Optional<OrderDetailAttributes, 'id'>> {
    id!: number;
    product_id!: Product['id'];
    order_id!: Order['id'];
    total!: number;
    quantity!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly dataValues!: OrderDetailAttributes & { createdAt: Date, updatedAt: Date };

    public static initTable = (sequelize: Sequelize) => {
        OrderDetail.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                product_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'product_id',
                },
                order_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'order_id',
                },
                total: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'total',
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'quantity',
                },
            },
            { sequelize, modelName: 'order_detail' },
        );
    };
}
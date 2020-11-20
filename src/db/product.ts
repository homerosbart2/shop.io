import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ProductAttributes {
    id: number;
    color: string;
    name: string;
    price: number;
    quantity: number
}

const DEFAULT_PRODUCTS: Optional<ProductAttributes, 'id'>[] = [
    {
        color: '#7E60BF',
        name: 'Product X',
        price: 3599,
        quantity: 50,
    },
    {
        color: '#B296D9',
        name: 'Product Y',
        price: 7299,
        quantity: 100,
    },
    {
        color: '#E4CEF2',
        name: 'Product Z',
        price: 550,
        quantity: 17,
    },
];

export class Product extends Model<ProductAttributes, Optional<ProductAttributes, 'id'>> {
    id!: number;
    color!: string;
    name!: string;
    price!: number;
    quantity!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly dataValues!: ProductAttributes & { createdAt: Date, updatedAt: Date };

    public static initTable = (sequelize: Sequelize) => {
        Product.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                color: {
                    type: DataTypes.STRING(7),
                    allowNull: false,
                    field: 'color',
                },
                name: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    field: 'name',
                },
                price: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'price',
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'quantity',
                },
            },
            { sequelize, modelName: 'product' },
        );
    };

    public static initDefaultProducts = async () => {
        DEFAULT_PRODUCTS.forEach(product => {
            Product.findOrCreate(
                {
                    where: {
                        name: product.name,
                    },
                    defaults: product,
                },
            )
        });
    }
}
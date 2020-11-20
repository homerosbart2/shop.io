import express from 'express';
import { Optional, Sequelize } from 'sequelize';
import { Product, ProductAttributes } from './db/product';
import { User, UserAttributes } from './db/user';
import { createTransport } from 'nodemailer';
import { sendEmail } from './util/send-email';
import { ShoppingCart } from './types/shopping-cart';
import { OrderDetail, OrderDetailAttributes } from './db/order-detail';
import { Order } from './db/order';
import Cors from 'cors';
import path from 'path';
require('dotenv').config();

export const TRANSMITTER_EMAIL = 'shop.io.development@gmail.com';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: TRANSMITTER_EMAIL,
        pass: 'development9413!!',
    },
});

const PORT = 3002;

const sequelize = new Sequelize(
    'postgres://hcampos@localhost:5432/shop.io',
    {
        logging: false,
        define: {
            freezeTableName: true,
        },
    },
);
sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');

    Product.initTable(sequelize);
    User.initTable(sequelize);
    Order.initTable(sequelize);
    OrderDetail.initTable(sequelize);

    (async () => {
        await sequelize.sync({ alter: true });
        await Product.initDefaultProducts();
    })();
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});

const app = express();
app.use(express.static(path.join(__dirname, '../frontend/build')));
console.log(__dirname);
app.use(express.text({ type: ['json', 'text'] }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/product', async (req, res) => {
    let successful = true;
    let data: Promise<ProductAttributes | null>[] = [];

    const products = await Product.findAll();

    data = products.map(async product => {
        const orderDetails = await OrderDetail.findAll({
            where: {
                product_id: product.id,
            },
        });

        const productCount = orderDetails.reduce(
            (currentProductCount, orderDetail) => {
                return currentProductCount + orderDetail.quantity;
            },
            0,
        )

        const newProduct = {
            ...product.dataValues,
            quantity: product.quantity - productCount,
        };

        return newProduct.quantity > 0
            ? newProduct
            : null;
    });

    Promise.all(data).then(products => {
        res.header('Content-Type', 'application/json');
        res.send({
            successful,
            data: products.filter(product => product !== null),
        });
    });
});

app.post('/user', async (req, res) => {
    let successful = false;

    const user: UserAttributes = JSON.parse(req.body);

    if (!(await User.findByPk(user.email))) {
        User.create(user);
        successful = true;
    }

    res.header('Content-Type', 'application/json');
    res.send({
        successful,
        data: successful ? user : null,
    });
});

app.get('/user/:email', async (req, res) => {
    let successful = false;

    const user = await User.findByPk(req.params.email);

    if (user) {
        successful = true;
    }

    res.header('Content-Type', 'application/json');
    res.send({
        successful,
        data: user,
    });
});

const computeOrderDetails = async (shoppingCart: ShoppingCart): Promise<{ total: number, orderDetails: Optional<OrderDetailAttributes, 'id' | 'order_id'>[] }> => {
    return new Promise(async resolve => {
        let total = 0;
        const orderDetails: Optional<OrderDetailAttributes, 'id' | 'order_id'>[] = [];

        const shoppingCartCounts = Object.entries(shoppingCart);

        for (let index = 0; index < shoppingCartCounts.length; index++) {
            const [productId, productCount] = shoppingCartCounts[index];
            const product = await Product.findByPk(+productId);

            if (product) {
                const productTotal = product.price * productCount;
                total += productTotal;
                orderDetails.push({
                    product_id: +productId,
                    total: productTotal,
                    quantity: productCount,
                });
            }

            if (index === shoppingCartCounts.length - 1) {
                resolve({
                    total,
                    orderDetails,
                });
            }
        }
    });
};

app.post('/order', async (req, res) => {
    let successful = true;

    const requestBody: {
        shoppingCart: ShoppingCart,
        user: User,
    } = JSON.parse(req.body);

    const { total, orderDetails } = await computeOrderDetails(requestBody.shoppingCart);

    const order = await Order.create({
        user_email: requestBody.user.email,
        total,
    });

    sendEmail(requestBody.user.email, total, transporter);

    orderDetails.forEach(async orderDetail => await OrderDetail.create({
        ...orderDetail,
        order_id: order.id,
    }));

    res.header('Content-Type', 'application/json');
    res.send({
        successful,
    });
});

app.post("/order/pay", Cors(), async (req, res) => {
    const { amount, id } = JSON.parse(req.body);
    try {
        await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "shop.io",
            payment_method: id,
            confirm: true,
        });
        res.send({
            successful: true,
        });
    } catch (error) {
        res.send({
            successful: false,
        });
    }
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});
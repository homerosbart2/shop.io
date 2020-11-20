import { createContext } from 'react';
import { ProductStore } from './product-store';
import { UserStore } from './user-store';
import { OrderStore } from './order-store';

const productStore = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();

export const storeContext = createContext({
    productStore,
    userStore,
    orderStore,
});
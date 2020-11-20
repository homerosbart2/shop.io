import { ShoppingCart } from './shopping-cart';
import { User } from './user';

export interface Order {
    shoppingCart: ShoppingCart;
    user: User;
}
import React, { useEffect, useMemo, useState } from 'react';
import { Login } from './components/login/login';
import { User } from './types/user';
import { useStore } from './stores';
import { ProductCard } from './components/product-card/product-card';
import { Navbar } from './components/navbar/navbar';
import { Product } from './types/product';
import { observer } from 'mobx-react';
import { Button, BUTTON_COLOR } from './components/button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShoppingCart } from './types/shopping-cart';
import { StripeContainer } from './stripe/stripe-container';
import { ContextMessage } from './components/context-message/context-message';

import './shop.scss';

export enum SHOP_MODE {
    CATALOGE,
    CART,
}

export const Shop = observer(() => {
    const store = useStore();
    const productStore = store.productStore;
    const products = productStore.products;
    const mappedProducts = productStore.mappedProducts;
    const userStore = store.userStore;
    const user = store.userStore.user;

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({});
    const [mode, setMode] = useState<SHOP_MODE>(SHOP_MODE.CATALOGE);
    const [showStripeContainer, setShowStripeContainer] = useState<boolean>(false);
    const [contextMessage, setContextMessage] = useState<string>('');

    useEffect(
        () => {
            if (mode === SHOP_MODE.CATALOGE) {
                productStore.index();
            }
        },
        [mode, productStore],
    );

    const { inCartProductCount, total } = useMemo(
        () => {
            return Object.entries(shoppingCart).reduce(
                (countAndTotal, [productId, productCount]) => {
                    const product = mappedProducts[productId];

                    return {
                        inCartProductCount: countAndTotal.inCartProductCount + productCount,
                        total: product
                            ? countAndTotal.total + (productCount * product.price)
                            : 0,
                    };
                },
                {
                    inCartProductCount: 0,
                    total: 0,
                },
            );
        },
        [shoppingCart, mappedProducts],
    );

    const handleSignIn = async (user: Partial<User> & Pick<User, 'email'>, isNew: boolean) => {
        let successful = false;

        if (isNew) {
            successful = await userStore.create(user as User);
        } else {
            successful = await userStore.show(user.email);
        }

        if (successful) {
            setLoggedIn(true);
            setMode(SHOP_MODE.CATALOGE);
            localStorage.setItem('loggedInUserEmail', user.email);
            const storedShoppingCart = localStorage.getItem(`shoppingCart::${user.email}`);
            if (storedShoppingCart) {
                setShoppingCart(JSON.parse(storedShoppingCart));
            }
        } else {
            handleFail('Your email is not registered, please sign up.')
        }
    };

    const handleSignOut = () => {
        setLoggedIn(false);
        setShoppingCart({});
        localStorage.removeItem('loggedInUserEmail');
    };

    const handleAddToCart = (product: Product) => {
        setShoppingCart(shoppingCart => {
            const productCount = (shoppingCart[product.id] || 0) + 1;

            const canAdd = productCount <= product.quantity;

            const newShoppingCart = canAdd
                ? {
                    ...shoppingCart,
                    [product.id]: productCount,
                } : shoppingCart;

            if (!canAdd) {
                handleFail('Not enough stock.')
            }

            if (user) {
                localStorage.setItem(`shoppingCart::${user.email}`, JSON.stringify(newShoppingCart));
            }

            return newShoppingCart;
        });
    };

    const handleRemoveFromCart = (productId: Product['id']) => {
        setShoppingCart(shoppingCart => {
            const productCount = (shoppingCart[productId] || 0) - 1;

            const newShoppingCart = {
                ...shoppingCart,
            };

            if (productCount === 0) {
                delete newShoppingCart[productId];
            } else if (productCount > 0) {
                newShoppingCart[productId] = productCount;
            }

            if (user) {
                localStorage.setItem(`shoppingCart::${user.email}`, JSON.stringify(newShoppingCart));
            }

            return newShoppingCart;
        });
    };

    const handleModeChange = (mode: SHOP_MODE) => {
        setMode(mode);
    };

    const handleProceedButtonClick = async () => {
        setShowStripeContainer(true);
    };

    const handleCancelButtonClick = () => {
        setShowStripeContainer(false);
    };

    const handlePaySuccess = async () => {
        if (user) {
            if (await store.orderStore.create({
                shoppingCart,
                user,
            })) {
                setShoppingCart({});
                setShowStripeContainer(false);
                localStorage.setItem(`shoppingCart::${user.email}`, JSON.stringify({}));
            };
        }
    };

    const handleFail = (message: string) => {
        setContextMessage(message);
    };

    const handleMessageClear = () => {
        setContextMessage('');
    }

    return (
        <div className="shop">
            <Login
                loggedIn={loggedIn}
                onSignIn={handleSignIn}
                onFail={handleFail}
            />
            <div className={`manager ${loggedIn ? 'shown' : ''}`}>
                <Navbar
                    shopMode={mode}
                    inCartProductCount={inCartProductCount}
                    onShopModeChange={handleModeChange}
                    onSignOut={handleSignOut}
                />
                <div className="catalogue">
                    {products.map(product => (
                        <ProductCard
                            key={`product-${product.id}`}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
                <div className={`cart ${mode === SHOP_MODE.CART ? 'shown' : ''}`}>
                    <div className="summary">
                        <div className="table">
                            <div className="headers">
                                <div className="header"/>
                                <div className="header">
                                    Quantity
                                </div>
                                <div className="header">
                                    Image
                                </div>
                                <div className="header">
                                    Name
                                </div>
                                <div className="header">
                                    Subtotal
                                </div>
                            </div>
                            {products.length > 0 && Object.entries(shoppingCart).map(([productId, productCount]) => {
                                const product = mappedProducts[productId];

                                return (
                                    <div key={`row-${productId}`} className="row">
                                        <div className="cell">
                                            <div
                                                className="remove-formatter"
                                                onClick={() => handleRemoveFromCart(+productId)}
                                            >
                                                <FontAwesomeIcon icon="minus"/>
                                            </div>
                                        </div>
                                        <div className="cell">
                                            <div className="quantity-formatter">
                                                {productCount}
                                            </div>
                                        </div>
                                        <div className="cell">
                                            <div className="image-formatter" style={{ backgroundColor: product?.color }}/>
                                        </div>
                                        <div className="cell">
                                            <div className="name-formatter">
                                                {product?.name}
                                            </div>
                                        </div>
                                        <div className="cell">
                                            <div className="price-formatter">
                                                ${(((product?.price || 0) * productCount) / 100).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="total">
                            <Button
                                color={BUTTON_COLOR.GREEN}
                                shown={total > 0 && !showStripeContainer}
                                onClick={handleProceedButtonClick}
                            >
                                Proceed
                            </Button>
                            <StripeContainer
                                amount={total}
                                shown={showStripeContainer}
                                onCancelButtonClick={handleCancelButtonClick}
                                onPaySuccess={handlePaySuccess}
                            />
                            <div className="amount">
                                <div className="text">
                                    Total
                                </div>
                                <div className="number">
                                ${(total / 100).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContextMessage message={contextMessage} onMessageClear={handleMessageClear}/>
        </div>
    );
});

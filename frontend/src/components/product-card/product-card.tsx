import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Product } from '../../types/product';

import './product-card.scss';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard = (props: ProductCardProps) => {
    const handleAddToCart = () => {
        props.onAddToCart(props.product);
    };

    return (
        <div className="product">
            <div className="card">
                <div className="image" style={{ backgroundColor: props.product.color }}/>
                <div className="name">
                    {props.product.name}
                </div>
                <div className="quantity">
                    {props.product.quantity}
                </div>
                <div className="add-to-cart" onClick={handleAddToCart}>
                    <FontAwesomeIcon icon="shopping-cart"/> Add one
                </div>
            </div>
            <div className="price">
                ${(props.product.price / 100).toFixed(2)}
            </div>
        </div>
    );
};
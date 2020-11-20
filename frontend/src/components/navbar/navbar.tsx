import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SHOP_MODE } from '../../shop';

import './navbar.scss';

interface NavbarProps {
    shopMode: SHOP_MODE;
    inCartProductCount: number;
    onShopModeChange: (mode: SHOP_MODE) => void;
    onSignOut: () => void;
}

export const Navbar = (props: NavbarProps) => {
    const handleCatalogueActionClick = () => {
        if (props.shopMode !== SHOP_MODE.CATALOGE) {
            props.onShopModeChange(SHOP_MODE.CATALOGE);
        }
    }
    
    const handleCartActionClick = () => {
        if (props.shopMode !== SHOP_MODE.CART) {
            props.onShopModeChange(SHOP_MODE.CART);
        }
    }

    return (
        <div className="navbar">
            <div className="brand">
                shop<span className="secondary">.io</span>
            </div>
            <div className="actions">
                <div
                    className={`action ${props.shopMode === SHOP_MODE.CATALOGE ? 'selected' : ''}`}
                    onClick={handleCatalogueActionClick}
                >
                    <FontAwesomeIcon icon="store"/>
                    <div className="selected-indicator"/>
                </div>
                <div
                    className={`action ${props.shopMode === SHOP_MODE.CART ? 'selected' : ''}`}
                    onClick={handleCartActionClick}
                >
                    <FontAwesomeIcon icon="shopping-cart"/>
                    <div className={`counter ${props.inCartProductCount > 0 ? 'shown' : ''}`}>
                        {props.inCartProductCount}
                    </div>
                    <div className="selected-indicator"/>
                </div>
                <div
                    className="action"
                    style={{ fontSize: 18 }}
                    onClick={props.onSignOut}
                >
                    <FontAwesomeIcon icon="sign-out-alt"/>
                    <div className="selected-indicator"/>
                </div>
            </div>
        </div>
    );
};
import React from 'react';
import './button.scss';

export enum BUTTON_COLOR { 
    GREEN = 'green',
    ORANGE = 'orange',
}

interface ButtonProps {
    children: React.ReactNode;
    color: BUTTON_COLOR;
    shown?: boolean;
    onClick: () => void;
}

export const Button = (props: ButtonProps) => {
    return (
        <div
            className={`button ${props.color} ${props.shown !== false ? 'shown' : ''}`}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
}
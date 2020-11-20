import React, { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { Button, BUTTON_COLOR } from '../button/button';
import { EMAIL_REGEX } from '../../util/regex';

import './login.scss';
import { useStore } from '../../stores';
import { observer } from 'mobx-react';

interface LoginProps {
    loggedIn: boolean;
    onSignIn: (user: Partial<User> & Pick<User, 'email'>, isNew: boolean) => void;
    onFail: (message: string) => void;
}

enum MODE {
    LOGIN,
    REGISTRATION,
}

const DEFAULT_USER: User = {
    name: '',
    email: '',
}

export const Login = observer((props: LoginProps) => {
    const store = useStore();
    const user = store.userStore.user;

    const [edittedUser, setEdittedUser] = useState<User>(DEFAULT_USER);
    const [mode, setMode] = useState<MODE>(MODE.LOGIN);
    
    const { onSignIn } = props;
    useEffect(
        () => {
            if (!user) {
                const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
                if (loggedInUserEmail) {
                    onSignIn({ email: loggedInUserEmail }, false);
                }
            }
        },
        [onSignIn, user],
    );

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEdittedUser(user => ({ ...user, name: event.target.value }));
    };

    const handleUserEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEdittedUser(user => ({ ...user, email: event.target.value }));
    };

    const handleRegisterButtonClick = () => {
        setMode(loginMode => loginMode === MODE.REGISTRATION ? MODE.LOGIN : MODE.REGISTRATION);
    };

    const handleAcceptButtonClick = () => {
        if (edittedUser.email.match(EMAIL_REGEX)) {
            if (mode === MODE.REGISTRATION) {
                if (edittedUser.name) {
                    props.onSignIn(edittedUser, true);
                } else {
                    props.onFail('Please insert your name.');
                }
            } else {
                props.onSignIn({ email: edittedUser.email }, false);
            }
        } else {
            props.onFail('Incorrect email format.');
        }
    };

    return (
        <div className={`login ${props.loggedIn ? '' : 'shown'}`}>
            <div className="brand">
                shop<span className="secondary">.io</span>
            </div>
            <input
                className={`user-name-input ${mode === MODE.LOGIN ? '' : 'shown'}`}
                type="text"
                name="name"
                value={edittedUser.name}
                placeholder="Name: John Wick"
                onChange={handleUserNameChange}
            />
            <input
                type="text"
                name="email"
                value={edittedUser.email}
                placeholder="Email: myname@email.com"
                onChange={handleUserEmailChange}
            />
            <div className="buttons">
                <Button
                    color={BUTTON_COLOR.ORANGE}
                    onClick={handleRegisterButtonClick}
                >
                    {mode === MODE.REGISTRATION ? 'Sign In' : 'Sign Up'}
                </Button>
                <Button
                    color={BUTTON_COLOR.GREEN}
                    onClick={handleAcceptButtonClick}
                >
                    Accept
                </Button>
            </div>
        </div>
    );
});
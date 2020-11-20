import React, { useEffect } from 'react';
import { useState } from 'react';
import parse from 'html-react-parser';
import './context-message.scss';

interface ContextMessageProps {
    message: string;
    onMessageClear: () => void;
}

export const ContextMessage = (props: ContextMessageProps) => {
    const [message, setMessage] = useState<string>('');
    const [showMessage, setShowMessage] = useState<boolean>(false);

    useEffect(
        () => {
            if (props.message) {
                const isShowingMessage = showMessage;
                setMessage(props.message);
                setShowMessage(true);

                if (!isShowingMessage) {
                    const timeoutId = window.setTimeout(
                        () => {
                            setShowMessage(false);

                            window.setTimeout(
                                () => {
                                    props.onMessageClear();
                                },
                                300,
                            )
                        },
                        3000,
                    )
    
                    return () => {
                        window.clearTimeout(timeoutId);
                    }
                }
            }
        },
        [props.message],
    );

    return (
        <div className={`context-message ${showMessage ? 'shown' : ''}`}>
            {parse(message || '')}
        </div>
    );
}
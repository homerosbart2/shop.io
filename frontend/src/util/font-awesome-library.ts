import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSignOutAlt,
    faShoppingCart,
    faStore,
    faMinus,
} from '@fortawesome/free-solid-svg-icons';

export class FontAwesomeLibrary {
    static initializeFontAwesomeLibrary = () => {
        library.add(
            faSignOutAlt,
            faShoppingCart,
            faStore,
            faMinus,
        );
    };
}
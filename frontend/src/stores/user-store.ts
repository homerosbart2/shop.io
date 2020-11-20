import { makeAutoObservable, runInAction } from 'mobx';
import type { User } from '../types/user';
import { getApi, postApi } from '../util/http';

export class UserStore {
    user?: User;
    isShowing = false;
    isCreating = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    get path() {
        return 'user';
    }

    show = async (userEmail: User['email']) => {
        this.isShowing = true;

        const response = await getApi<User>(`${this.path}/${userEmail}`);
        runInAction(() => {
            if (response.successful && response.data) {
                this.user = response.data;
            }
        });

        this.isShowing = false;
        
        return response.successful;
    }

    create = async (user: User) => {
        this.isCreating = true;

        const response = await postApi<User>(this.path, user);
        runInAction(() => {
            if (response.successful && response.data) {
                this.user = response.data;
            }
        });

        this.isCreating = false;

        return response.successful;
    }
}
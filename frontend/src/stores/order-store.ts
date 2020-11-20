import { makeAutoObservable } from 'mobx';
import { Order } from '../types/order';
import { postApi } from '../util/http';

export class OrderStore {
    isCreating = false;
    isPaying = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    get path() {
        return 'order';
    }

    create = async (order: Order) => {
        this.isCreating = true;

        const response = await postApi<unknown>(this.path, order);

        this.isCreating = false;

        return response.successful;
    }

    pay = async (id: string, amount: number) => {
        this.isPaying = true;

        const response = await postApi<unknown>(`${this.path}/pay`, { id, amount })

        this.isPaying = false;

        return response.successful;
    }
}
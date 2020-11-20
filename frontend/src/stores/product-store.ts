import { makeAutoObservable, runInAction } from 'mobx';
import type { Product } from '../types/product';
import { getApi } from '../util/http';
import type { Mapped } from '../types/mapped';

export class ProductStore {
    products: Product[] = [];
    isIndexing = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    get mappedProducts() {
        return this.products.reduce(
            (mappedProducts, product) => ({
                ...mappedProducts,
                [product.id]: product,
            }),
            {} as Mapped<Product>,
        );
    }

    get path() {
        return 'product';
    }

    index = async () => {
        this.isIndexing = true;

        const response = await getApi<Product[]>(this.path);
        runInAction(() => {
            if (response.successful && response.data) {
                this.products = response.data;
            }
        });

        this.isIndexing = false;
        
        return response.successful;
    }
}
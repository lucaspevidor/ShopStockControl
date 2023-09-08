import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

export interface Error {
    error: string;
    message?: string;
}

export const APIError = AxiosError<Error>;

export interface Pack {
    id: number,
    pack_id: number,
    prduct_id: number,
    qty: number,
}

export interface Product {
    code: number,
    name: string,
    cost_price: string,
    sales_price: string,
}

export interface ProductWithPacks extends Product {
    product_idToproducts: Pack[]
}

export interface UpdateItem {
    type: string;
    code: number;
    new_price: number;
    errors: string[];
    product: ProductWithPacks | undefined;
    packs: Pack[] | undefined;    
}

export interface BackendResponse {
    items: UpdateItem[];
    badRequest: boolean;
}

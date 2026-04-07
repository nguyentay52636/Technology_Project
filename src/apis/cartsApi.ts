export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export interface Cart {
    id: number;
    products: CartProduct[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CartsApiResponse {
    carts: Cart[];
    total: number;
    skip: number;
    limit: number;
}

export interface CartQueryParams {
    limit?: number;
    skip?: number;
}

export interface CartProductInput {
    id: number;
    quantity: number;
}

export interface AddCartInput {
    userId: number;
    products: CartProductInput[];
}

export interface UpdateCartInput {
    products: CartProductInput[];
}

export interface DeleteCartResponse extends Cart {
    isDeleted: boolean;
    deletedOn?: string;
}

const BASE_URL = "https://dummyjson.com/carts";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

const buildQuery = (params?: CartQueryParams): string => {
    if (!params) {
        return "";
    }

    const query = new URLSearchParams();

    if (typeof params.limit === "number") {
        query.set("limit", String(params.limit));
    }

    if (typeof params.skip === "number") {
        query.set("skip", String(params.skip));
    }

    const queryString = query.toString();
    return queryString ? `?${queryString}` : "";
};

export const cartsApi = {
    getCarts: async (params?: CartQueryParams): Promise<Cart[]> => {
        const data = await fetchJson<CartsApiResponse>(`${BASE_URL}${buildQuery(params)}`);
        return data.carts;
    },

    getCartById: async (id: string | number): Promise<Cart> => {
        return fetchJson<Cart>(`${BASE_URL}/${id}`);
    },

    getUserCarts: async (userId: string | number): Promise<Cart[]> => {
        const data = await fetchJson<CartsApiResponse>(`${BASE_URL}/user/${userId}`);
        return data.carts;
    },

    addCart: async (payload: AddCartInput): Promise<Cart> => {
        return fetchJson<Cart>(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    },

    updateCart: async (id: string | number, payload: UpdateCartInput): Promise<Cart> => {
        return fetchJson<Cart>(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    },

    deleteCart: async (id: string | number): Promise<DeleteCartResponse> => {
        return fetchJson<DeleteCartResponse>(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
    },
};
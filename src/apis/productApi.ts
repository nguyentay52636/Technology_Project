export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number; 
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    images: string[];
    thumbnail: string;
}

export interface ApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export type ProductCreateInput = Omit<Product, "id">;
export type ProductUpdateInput = Partial<ProductCreateInput>;

export interface DeleteProductResponse {
    id: number;
    isDeleted: boolean;
    deletedOn?: string;
}

const BASE_URL = "https://dummyjson.com/products";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export const productApi = {
    getProducts: async (): Promise<Product[]> => {
        const data = await fetchJson<ApiResponse>(BASE_URL);
        return data.products;
    },

    getProductById: async (id: string | number): Promise<Product> => {
        return fetchJson<Product>(`${BASE_URL}/${id}`);
    },

    searchProducts: async (query: string): Promise<Product[]> => {
        const data = await fetchJson<ApiResponse>(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
        return data.products;
    },

    getProductsByCategory: async (category: string): Promise<Product[]> => {
        const data = await fetchJson<ApiResponse>(`${BASE_URL}/category/${encodeURIComponent(category)}`);
        return data.products;
    },

    addProduct: async (product: ProductCreateInput): Promise<Product> => {
        return fetchJson<Product>(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
    },

    updateProduct: async (
        id: string | number,
        product: ProductUpdateInput,
    ): Promise<Product> => {
        return fetchJson<Product>(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
    },

    deleteProduct: async (id: string | number): Promise<DeleteProductResponse> => {
        return fetchJson<DeleteProductResponse>(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
    },
};
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

export const productApi = {
    getProducts: async (): Promise<Product[]> => {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        return data.products;
    },

    getProductById: async (id: string | number): Promise<Product> => {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: Product = await response.json();
        return data;
    },
};
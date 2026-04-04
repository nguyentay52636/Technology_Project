
export interface UserAddress {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    gender: string;
    image: string;
    address: UserAddress;
    role: string;
}

export interface UsersApiResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export const usersApi = {
    getUsers: async (): Promise<User[]> => {
        const response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: UsersApiResponse = await response.json();
        return data.users;
    },

    getUserById: async (id: string | number): Promise<User> => {
        const response = await fetch(`https://dummyjson.com/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: User = await response.json();
        return data;
    },
};

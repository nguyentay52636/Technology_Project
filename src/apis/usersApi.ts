
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

export type UserPutInput = Omit<User, "id">;
export type UserPatchInput = Partial<Omit<UserPutInput, "address">> & {
    address?: Partial<UserAddress>;
};

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

    // Use PUT when you want to send the full user payload.
    updateUser: async (id: string | number, payload: UserPutInput): Promise<User> => {
        const response = await fetch(`https://dummyjson.com/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: User = await response.json();
        return data;
    },

    // Use PATCH for partial updates (for example 1-2 fields only).
    patchUser: async (id: string | number, payload: UserPatchInput): Promise<User> => {
        const response = await fetch(`https://dummyjson.com/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: User = await response.json();
        return data;
    },
};

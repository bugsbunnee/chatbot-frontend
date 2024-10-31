import http from "./http";

import { AuthData, EmailData, RegisterData } from "../utils/schema";
import { User } from "../store/auth";

interface AuthResponse {
    token: string;
}

interface InitializeResponse {
    isExisting: boolean;
    message: string;
}

export const initializeLogin = async (data: EmailData) => {
    return http.post<InitializeResponse>('/auth/initialize', data);
};

export const login = async (data: AuthData) => {
    return http.post<AuthResponse>('/auth/login', data);
};

export const register = async (data: RegisterData) => {
    return http.post<User>('/auth/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: 'editor',
    });
};




import { create } from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    user: {
        id: string;
        email: string;
        name: string;
    } | null;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    user: null,
    login: () => set({
        isLoggedIn: true,
        user: {
            id: '123',
            email: 'dongrae@example.com',
            name: '동그래'
        }
    }),
    logout: () => set({
        isLoggedIn: false,
        user: null
    })
}));
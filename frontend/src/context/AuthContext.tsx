"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/AlertProvider";
import { AuthMode } from "@/wrappers/LayoutWrapper";
import { URL } from "@/helpers/url";

interface User {
    id: string;
    name: string;
    email: string;
    desiredJob?: string;
    desiredSalary?: number;
    profilePicture?: string;
}

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterPayload) => Promise<void>;
    logout: () => void;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    desiredJob?: string;
    desiredSalary?: number;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { setAlert } = useAlert();

    const isAuthenticated = !!user;

    async function login(email: string, password: string) {
        setIsLoading(true);

        if (!email || email.trim() === "") {
            setAlert({ type: "error", message: "Please provide your email" });
            setIsLoading(false);
            return;
        }

        if (!password || password.trim() === "") {
            setAlert({ type: "error", message: "Please provide your password" });
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`${URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to synchronize profile on the server.');
            }

            const { token } = await res.json();
            localStorage.setItem("token", token);

            await fetchUser(token);

            setAlert({ type: "success", message: `Welcome back ${user?.name}!` });
        } catch (error) {
            setAlert({ type: "error", message: "Login failed" });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    async function register(data: RegisterPayload) {
        setIsLoading(true);

        if (!data) {
            setAlert({ type: "error", message: "Please fill in all the required fields" });
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`${URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to synchronize profile on the server.');
            }

            const { token } = await res.json();
            localStorage.setItem("token", token);

            await fetchUser(token);

            setAlert({ type: "success", message: "Account created successfully!" });
        } catch (error) {
            setAlert({ type: "error", message: "Registration failed. Please try again." });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    }

    async function fetchUser(token: string) {
        const res = await fetch(`${URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Invalid session");

        const data = await res.json();
        setUser(data);
    }

    //keeps the user logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token).catch(() => logout()); //automatically logs out if the token is invalid/expired
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, isLoading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
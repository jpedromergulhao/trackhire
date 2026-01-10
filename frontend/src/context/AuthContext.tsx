"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/AlertProvider";
import { URL } from "@/helpers/url";
import { useLoading } from "./LoadingContext";

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
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterPayload) => Promise<void>;
    logout: () => void;
    authLoading: boolean;
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
    const [authLoading, setAuthLoading] = useState(true);
    const router = useRouter();
    const { setAlert } = useAlert();
    const { setLoading } = useLoading();

    const isAuthenticated = !!user;

    async function login(email: string, password: string) {
        setLoading(true);

        if (!email || email.trim() === "") {
            setAlert({ type: "error", message: "Please provide your email" });
            setLoading(false);
            return;
        }

        if (!password || password.trim() === "") {
            setAlert({ type: "error", message: "Please provide your password" });
            setLoading(false);
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
                throw new Error(data.message || 'Log in failed. Please try again.');
            }

            const { token } = await res.json();
            localStorage.setItem("token", token);

            await fetchUser(token);

            setAlert({ type: "success", message: `Hi! ${user?.name}!` });
        } catch (error: any) {
            setAlert({
                type: "error",
                message: error.message || "Log in failed. Please try again."
            });
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function register(data: RegisterPayload) {
        setLoading(true);

        if (!data) {
            setAlert({ type: "error", message: "Please fill in all the required fields" });
            setLoading(false);
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
                throw new Error(data.message || 'Registration failed. Please try again.');
            }

            const { token } = await res.json();
            localStorage.setItem("token", token);

            await fetchUser(token);

            setAlert({ type: "success", message: "Account created successfully!" });
        } catch (error: any) {
            setAlert({
                type: "error",
                message: error.message || "Registration failed. Please try again.",
            });
            throw error;
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    }

    async function fetchUser(token: string) {
        const res = await fetch(`${URL}/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Invalid session");
        }

        const data = await res.json();
        setUser(data);
    }

    //keeps the user logged in
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setAuthLoading(false);
            return;
        }

        fetchUser(token)
            .catch(() => logout())
            .finally(() => setAuthLoading(false)); //automatically logs out if the token is invalid/expired
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, login, register, logout, authLoading  }}
        >
            {children}
        </AuthContext.Provider>
    );
}
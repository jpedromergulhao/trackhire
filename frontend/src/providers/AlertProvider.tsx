"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AlertCircleIcon, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface AlertState {
    type: 'success' | 'error';
    message: string;
}

interface AlertContextType {
    setAlert: (alert: AlertState | null) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alert, setStateAlert] = useState<AlertState | null>(null);

    const setAlert = useCallback((newAlert: AlertState | null) => {
        setStateAlert(newAlert);
        if (newAlert) {
            setTimeout(() => {
                setStateAlert(null);
            }, 5000);
        }
    }, []);

    return (
        <AlertContext.Provider value={{ setAlert }}>
            {children}
            {alert && (
                <div
                    className="fixed top-5 right-5 z-50 w-11/12 sm:w-96 max-w-lg"
                    role="alert"
                    aria-live="assertive"
                >
                    <Alert
                        variant={alert.type === 'error' ? 'destructive' : 'default'}
                        className="shadow-xl"
                    >
                        {alert.type === 'error' ? <AlertCircleIcon className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                </div>
            )}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used inside an AlertProvider');
    }
    return context;
}
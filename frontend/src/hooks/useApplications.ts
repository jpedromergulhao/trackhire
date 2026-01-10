import { Application } from "@/app/applications/page";
import { URL } from "@/helpers/url";
import { AlertState } from "@/providers/AlertProvider";
import { Dispatch, SetStateAction } from "react";

type CreateApplicationPayload = Pick<
    Application,
    "companyName" | "role" | "jobDescription" | "jobCategory" | "seniority" | "salary" | "technicalStage" | "status"
>;

export async function editApplication(
    editedApplication: Application,
    applications: Application[],
    token: string,
    setApplications: Dispatch<SetStateAction<Application[]>>,
    setLoading: (v: boolean) => void,
    setAlert: (alert: AlertState | null) => void,
) {
    setLoading(true);

    if (!editedApplication) {
        setAlert({
            type: "error",
            message: "There is no application to be edited.",
        });
        setLoading(false);
        return;
    }

    if (!token) {
        setAlert({
            type: "error",
            message: "You do not have permission to do that.",
        });
        setLoading(false);
        return;
    }

    const targetApplication = applications.find(
        app => app.id === editedApplication.id
    );

    if (
        targetApplication &&
        JSON.stringify(editedApplication) === JSON.stringify(targetApplication)
    ) {
        setAlert({ type: "error", message: "No changes detected." });
        setLoading(false);
        return;
    }

    try {
        const res = await fetch(`${URL}/applications/${editedApplication.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedApplication),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Error editing the application.');
        }

        setApplications(prev =>
            prev.map(app =>
                app.id === editedApplication.id ? editedApplication : app
            )
        );

        setAlert({ type: "success", message: `Application for ${editedApplication.companyName} successfully edited.` });
    } catch (error: any) {
        setAlert({
            type: "error",
            message: error.message || "Error editing the application.",
        });
        throw error;
    } finally {
        setLoading(false);
    }
}

export async function createApplication(
    payload: CreateApplicationPayload,
    token: string,
    setApplications: Dispatch<SetStateAction<Application[]>>,
    setLoading: (v: boolean) => void,
    setAlert: (alert: AlertState | null) => void,
) {
    setLoading(true);

    if (!payload) {
        setAlert({
            type: "error",
            message: "There is no application to be created.",
        });
        setLoading(false);
        return;
    }

    if (!token) {
        setAlert({
            type: "error",
            message: "You do not have permission to do that.",
        });
        setLoading(false);
        return;
    }

    try {
        const res = await fetch(`${URL}/applications`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyName: payload.companyName,
                role: payload.role,
                jobDescription: payload.jobDescription,
                jobCategory: payload.jobCategory || "TECH",
                seniority: payload.seniority || 'JUNIOR',
                salary: payload.salary || 0,
                technicalStage: payload.technicalStage || 'NONE',
                status: payload.status || "APPLIED",
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Error creating the application.');
        }

        const created = await res.json();
        setApplications(prev => [created, ...prev]);
        setAlert({ type: "success", message: `Application for ${payload.companyName} successfully created.` });
    } catch (error: any) {
        setAlert({
            type: "error",
            message: error.message || "Error creating the application.",
        });
        throw error;
    } finally {
        setLoading(false);
    }
}

export async function deleteApplication(
    id: string,
    token: string,
    setApplications: Dispatch<SetStateAction<Application[]>>,
    setLoading: (v: boolean) => void,
    setAlert: (alert: AlertState | null) => void,
) {
    setLoading(true);

    if (!id) {
        setAlert({
            type: "error",
            message: "There is no application to be deleted.",
        });
        setLoading(false);
        return;
    }

    if (!token) {
        setAlert({
            type: "error",
            message: "You do not have permission to do that.",
        });
        setLoading(false);
        return;
    }

    try {
        const res = await fetch(`${URL}/applications/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Error deleting the application.');
        }

        setApplications(prev =>
            prev.filter(app => app.id !== id)
        );

        setAlert({ type: "success", message: `Application deleted.` });
    } catch (error: any) {
        setAlert({
            type: "error",
            message: error.message || "Error deleting the application.",
        });
        throw error;
    } finally {
        setLoading(false);
    }
}
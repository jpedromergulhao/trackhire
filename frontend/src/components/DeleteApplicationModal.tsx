"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { deleteApplication } from "@/hooks/useApplications";
import { useAlert } from "@/providers/AlertProvider";
import { useLoading } from "@/context/LoadingContext";
import { Application } from "@/app/applications/page";

interface DeleteApplicationModalProps {
    setDeleteId: Dispatch<SetStateAction<string>>,
    setApplications: Dispatch<SetStateAction<Application[]>>,
    token: string | null,
    id: string
}

export function DeleteApplicationModal({ token, id, setApplications, setDeleteId }: DeleteApplicationModalProps) {
    const { setAlert } = useAlert();
    const { setLoading, loading } = useLoading();

    const handleDelete = async () => {
        if (!token) {
            setAlert({
                type: "error",
                message: "You do not have permission to do that.",
            });
            return;
        }

        await deleteApplication(
            id,
            token,
            setApplications,
            setLoading,
            setAlert
        );

        setDeleteId("");
    };

    return (
        <Dialog
            open={!!id}
            onOpenChange={(open) => {
                if (!open) setDeleteId("");
            }}
        >
            <DialogContent className="sm:max-w-[420px] bg-cyan-50 text-cyan-950">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">
                        Are you sure?
                    </DialogTitle>
                </DialogHeader>
                <p className="text-base text-center">
                    This is an irreversible action. After confirmation, the application will be permanently deleted.
                </p>
                <DialogFooter>
                    <DialogClose asChild>
                        <button
                            disabled={loading}
                            onClick={() => setDeleteId("")}
                            className="bg-transparent text-cyan-950 hover:text-cyan-800 font-bold transition-all duration-300"
                        >
                            No
                        </button>
                    </DialogClose>
                    <button
                        disabled={loading}
                        onClick={handleDelete}
                        className='bg-cyan-950 hover:bg-cyan-800 cursor-pointer text-white font-bold 
                            transition-all duration-300 rounded-full w-[100px] p-2'
                    >
                        {loading ? "Deleting..." : "Yes"}
                    </button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
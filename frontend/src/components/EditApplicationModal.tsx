"use client";

import { Application, APPLICATION_STATUS, JOB_CATEGORIES, SENIORITIES, TECHNICAL_STAGES } from "@/app/applications/page"
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { editApplication } from "@/hooks/useApplications";
import { useAlert } from "@/providers/AlertProvider";
import { useLoading } from "@/context/LoadingContext";

interface EditApplicationModalProps {
    application: Application,
    applications: Application[],
    setApplicationToEdit: Dispatch<SetStateAction<Application | null>>,
    setApplications: Dispatch<SetStateAction<Application[]>>,
    token: string | null
}

type FormElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

export function EditApplicationModal({ application, applications, setApplications, setApplicationToEdit, token }: EditApplicationModalProps) {
    const [formData, setFormData] = useState<Application>(application);
    const { setAlert } = useAlert();
    const { loading, setLoading } = useLoading();

    const handleChange = (e: React.ChangeEvent<FormElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === "salary" ? Number(value) || 0 : value,
        }));
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setAlert({
                type: "error",
                message: "You do not have permission to do that.",
            });
            return;
        }

        await editApplication(
            formData,
            applications,
            token,
            setApplications,
            setLoading,
            setAlert
        );

        setApplicationToEdit(null);
    };

    return (
        <Dialog
            open={!!application}
            onOpenChange={(open) => {
                if (!open) setApplicationToEdit(null);
            }}>
            <DialogContent
                className="sm:max-w-[420px] bg-cyan-50 text-cyan-950 max-h-[90vh] overflow-hidden"
            >
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">
                        Application edit
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEdit} className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto pr-1 space-y-3 py-5">
                        <div className="flex space-x-2">
                            <div className="space-y-2">
                                <Label htmlFor="companyName" className='font-bold text-base'>Company name</Label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className='text-cyan-950 bg-white selection:bg-cyan-800 selection:text-white'
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role" className='font-bold text-base'>Role</Label>
                                <Input
                                    id="role"
                                    name="role"
                                    type="text"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className='text-cyan-950 bg-white selection:bg-cyan-800 selection:text-white'
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobDescription" className='font-bold text-base'>Job description</Label>
                            <Textarea
                                id="jobDescription"
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleChange}
                                className='text-cyan-950 bg-white max-w-full overflow-y-auto selection:bg-cyan-800 selection:text-white'
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="jobCategory" className='font-bold text-base'>Category</Label>
                                <select
                                    name="jobCategory"
                                    value={formData.jobCategory}
                                    onChange={handleChange}
                                    className="border border-cyan-950 rounded px-2 py-1 cursor-pointer"
                                >
                                    {JOB_CATEGORIES.map((category, index) => (
                                        <option key={index} value={formData.jobCategory}>
                                            {category.replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seniority" className='font-bold text-base'>Seniority</Label>
                                <select
                                    name="seniority"
                                    value={formData.seniority}
                                    onChange={handleChange}
                                    className="border border-cyan-950 rounded px-2 py-1 cursor-pointer"
                                >
                                    {SENIORITIES.map((seniority, index) => (
                                        <option key={index} value={formData.seniority}>
                                            {seniority.replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status" className='font-bold text-base'>Status</Label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="border border-cyan-950 rounded px-2 py-1 cursor-pointer"
                                >
                                    {APPLICATION_STATUS.map((status, index) => (
                                        <option key={index} value={formData.status}>
                                            {status.replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="technicalStage" className="font-bold text-base">
                                    Tech stage
                                </Label>
                                <select
                                    name="technicalStage"
                                    className="border border-cyan-950 rounded px-2 py-1 cursor-pointer"
                                    value={formData.jobCategory === "NON_TECH" ? "NONE" : formData.technicalStage}
                                    onChange={handleChange}
                                    disabled={formData.jobCategory === "NON_TECH"}
                                >
                                    {TECHNICAL_STAGES.map((stage, index) => (
                                        <option key={index} value={stage}>
                                            {stage.replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary" className='font-bold text-base'>Salary</Label>
                            <Input
                                id="salary"
                                name="salary"
                                type="text"
                                value={formData.salary}
                                onChange={handleChange}
                                className='text-cyan-950 bg-white selection:bg-cyan-800 selection:text-white'
                            />
                        </div>
                    </div>

                    <div className="flex space-x-5 justify-end w-full pt-4">
                        <button
                            disabled={loading}
                            onClick={() => setApplicationToEdit(null)}
                            className="text-cyan-950 bg-white max-h-[150px] overflow-y-auto resize-none selection:bg-cyan-800 selection:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className='bg-cyan-950 hover:bg-cyan-800 cursor-pointer text-white font-bold 
                            transition-all duration-300 rounded-full w-[100px] p-2'
                        >
                            {loading ? "Editing..." : "Edit"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
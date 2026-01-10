import { Application, APPLICATION_STATUS, JOB_CATEGORIES, SENIORITIES, TECHNICAL_STAGES } from "@/app/applications/page"
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createApplication } from "@/hooks/useApplications";
import { useAlert } from "@/providers/AlertProvider";
import { useLoading } from "@/context/LoadingContext";

interface CreateApplicationModalProps {
    setOpenCreateModal: Dispatch<SetStateAction<boolean>>,
    openCreateModal: boolean,
    token: string | null,
    setApplications: Dispatch<SetStateAction<Application[]>>,
}

type FormElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

export function CreateApplicationModal({ openCreateModal, setOpenCreateModal, setApplications, token }: CreateApplicationModalProps) {
    const { setAlert } = useAlert();
    const { loading, setLoading } = useLoading();
    const [formData, setFormData] = useState<Application>({
        id: "",
        companyName: "",
        role: "",
        jobDescription: "",
        jobCategory: "TECH",
        seniority: "JUNIOR",
        salary: 0,
        status: "APPLIED",
        technicalStage: "NONE",
        createdAt: "",
        updatedAt: "",
    });

    const handleChange = (e: React.ChangeEvent<FormElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === "salary" ? Number(value) || 0 : value,
        }));
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            status: formData.status ?? "APPLIED",
            technicalStage:
                formData.jobCategory === "NON_TECH"
                    ? "NONE"
                    : formData.technicalStage ?? "NONE",
        };

        if (!token) {
            setAlert({
                type: "error",
                message: "You do not have permission to do that.",
            });
            setLoading(false);
            return;
        }

        await createApplication(
            payload,
            token,
            setApplications,
            setLoading,
            setAlert
        );

        setOpenCreateModal(false);
    };

    return (
        <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
            <DialogContent className="sm:max-w-[420px] bg-cyan-50 text-cyan-950 max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">
                        Application creation
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto pr-1 space-y-3 py-5">
                        <div className="flex space-x-2">
                            <div className="space-y-2">
                                <Label htmlFor="companyName" className='font-bold text-base'>Company name</Label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    value={formData?.companyName}
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
                                    value={formData?.role}
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
                                value={formData?.jobDescription}
                                onChange={handleChange}
                                className="text-cyan-950 bg-white max-h-[150px] overflow-y-auto resize-none selection:bg-cyan-800 selection:text-white"
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="space-y-1">
                                <Label htmlFor="jobCategory" className='font-bold text-base'>Category</Label>
                                <select
                                    name="jobCategory"
                                    value={formData.jobCategory || "TECH"}
                                    onChange={handleChange}
                                    className="border border-cyan-950 rounded px-2 py-1 cursor-pointer"
                                >
                                    {JOB_CATEGORIES.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category.replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="seniority" className='font-bold text-base'>Seniority</Label>
                                <select
                                    name="seniority"
                                    value={formData.seniority || "JUNIOR"}
                                    onChange={handleChange}
                                    className="border border-cyan-950 rounded px-2 py-1 cursor-pointer"
                                >
                                    {SENIORITIES.map((seniority, index) => (
                                        <option key={index} value={seniority}>
                                            {seniority.replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="status" className='font-bold text-base'>Status</Label>
                                <select
                                    name="status"
                                    value={formData.status || "APPLIED"}
                                    onChange={handleChange}
                                    className="border border-cyan-950 rounded px-2 py-1 cursor-pointer"
                                >
                                    {APPLICATION_STATUS.map((status, index) => (
                                        <option key={index} value={status}>
                                            {status.replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="technicalStage" className="font-bold text-base">
                                    Tech stage
                                </Label>
                                <select
                                    name="technicalStage"
                                    value={formData.jobCategory === "NON_TECH" ? "NONE" : formData.technicalStage || "NONE"}
                                    onChange={handleChange}
                                    disabled={formData.jobCategory === "NON_TECH"}
                                    className="border border-cyan-950 rounded px-2 py-1 cursor-pointer"
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

                    <div className="flex-1 overflow-y-auto pr-1 space-y-3 py-5">
                        <button
                            disabled={loading}
                            onClick={() => setOpenCreateModal(false)}
                            className="bg-transparent text-cyan-950 hover:text-cyan-800 font-bold transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className='bg-cyan-950 hover:bg-cyan-800 cursor-pointer text-white font-bold 
                            transition-all duration-300 rounded-full w-[100px] p-2'
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
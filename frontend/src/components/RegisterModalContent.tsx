import { DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { AuthModalHeader } from "./AuthModalHeader";
import { useState } from "react";
import { RegisterPayload, useAuth } from "@/context/AuthContext";
import { AuthMode } from "@/wrappers/LayoutWrapper";
import { useLoading } from "@/context/LoadingContext";

interface Props {
    onBackToLogin: () => void;
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

export function RegisterModalContent({ onBackToLogin, setAuthMode }: Props) {
    const [formData, setFormData] = useState<RegisterPayload>({
        name: "",
        email: "",
        password: "",
        desiredJob: "",
        desiredSalary: undefined,
    });
    const { register } = useAuth();
    const { loading } = useLoading();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "desiredSalary" ? Number(value) || undefined : value,
        }));
    };

    const handleCreateAnAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(formData);
        setAuthMode("login");
    };

    return (
        <>
            <AuthModalHeader
                title="Create an account"
                description=""
            />
            <form onSubmit={handleCreateAnAccount}>
                <div className="space-y-3 py-5">
                    <div className="space-y-1">
                        <Label htmlFor="name" className='font-bold text-lg'>Your name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            onChange={handleChange}
                            placeholder="Your name"
                            className='text-cyan-950 bg-white selection:bg-cyan-800 selection:text-white'
                            required
                        />
                    </div>
                    <div className="flex space-x-3">
                        <div className="space-y-1">
                            <Label htmlFor="job" className='font-bold text-lg'>Desired Job</Label>
                            <Input
                                id="job"
                                name="desiredJob"
                                type="text"
                                onChange={handleChange}
                                placeholder="Full Stack Developer"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="salary" className='font-bold text-lg'>Desired salary</Label>
                            <Input
                                id="salary"
                                name="desiredSalary"
                                type="text"
                                onChange={handleChange}
                                placeholder="10000"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email" className='font-bold text-lg'>Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className='text-cyan-950 bg-white selection:bg-cyan-800 selection:text-white'
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password" className='font-bold text-lg'>Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="********"
                            className='text-cyan-950 bg-white selection:bg-cyan-800 selection:text-white'
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className='bg-cyan-950 hover:bg-cyan-800 cursor-pointer text-white font-bold transition-all duration-300 rounded-full w-full p-3'
                >
                    {loading ? "Creating..." : "Create your account"}
                </button>
            </form>

            <DialogFooter className="flex flex-row items-center justify-center gap-1 text-sm">
                <span>Do you already have an account?</span>
                <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-cyan-800 hover:underline cursor-pointer font-semibold"
                >
                    Log in
                </button>
            </DialogFooter>
        </>
    );
}
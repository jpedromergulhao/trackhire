import { DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { AuthModalHeader } from "./AuthModalHeader";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthMode } from "@/wrappers/LayoutWrapper";
import { useLoading } from "@/context/LoadingContext";

interface Props {
    onCreateAccount: () => void;
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>
}

export function LoginModalContent({ onCreateAccount, setAuthMode }: Props) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();
    const { loading } = useLoading();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
        setAuthMode(null);
    };

    return (
        <>
            <AuthModalHeader
                title="Log in"
                description="To connect to your account in the TrackHire application, enter your email and password"
            />
            <form onSubmit={handleLogin}>
                <div className="space-y-3 py-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className='font-bold text-lg'>Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className='text-cyan-950 bg-white selection:bg-cyan-800 selection:text-white'
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className='font-bold text-lg'>Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    {loading ? "Connecting..." : "Connect"}
                </button>
            </form>

            <DialogFooter className="flex flex-row items-center justify-center gap-1 text-sm">
                <span>Don't have an account?</span>
                <button
                    type="button"
                    onClick={onCreateAccount}
                    className="text-cyan-800 hover:underline cursor-pointer font-semibold"
                >
                    Create one
                </button>
            </DialogFooter>
        </>
    );
}
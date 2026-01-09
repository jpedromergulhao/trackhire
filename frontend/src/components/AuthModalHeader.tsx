import Image from "next/image";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import logo from '../../public/trackHire.svg';

interface AuthModalHeaderPros {
    title: string,
    description: string
}

export function AuthModalHeader({ title, description }: AuthModalHeaderPros) {
    return (
        <DialogHeader className="flex flex-col items-center space-y-1 text-center">
            <Image
                src={logo}
                alt="TrackHire Logo"
                height={80}
                width={80}
            />
            <DialogTitle className="font-bold text-3xl">{title}</DialogTitle>
            {description && (
                <DialogDescription className="text-lg text-cyan-800 text-center">
                    {description}
                </DialogDescription>
            )}
        </DialogHeader>
    )
}
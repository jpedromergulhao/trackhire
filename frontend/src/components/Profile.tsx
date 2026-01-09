import { CircleUserRoundIcon, LogInIcon, LogOutIcon, User } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MouseEventHandler } from "react";
import { useAuth } from "@/context/AuthContext";

interface ProfileProps {
     onLoginClick: () => void;
}

export interface MenuItemContentProps {
    openModal: MouseEventHandler<HTMLDivElement> | undefined;
    text: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Profile({ onLoginClick }: ProfileProps) {
    const { user, logout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-fit cursor-pointer">
                    {user?.profilePicture ? (
                        <Image
                            src={user.profilePicture}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    ) : (
                        <CircleUserRoundIcon
                            className="text-white hover:text-cyan-100 transition-all duration-300"
                        />
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-cyan-950 px-3" align="end">

                {user && (
                    <DropdownMenuItem className="bg-transparent! flex justify-between cursor-pointer text-white hover:text-cyan-100! transition-all duration-300">
                        Profile
                        <User className="h-5 w-5 text-white hover:text-cyan-100!" />
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                {user ? (
                    <DropdownMenuItem
                        onClick={logout}
                        className="bg-transparent! flex justify-between cursor-pointer text-white hover:text-cyan-100! transition-all duration-300"
                    >
                        Log out
                        <LogOutIcon className="h-5 w-5 text-white hover:text-cyan-100!" />
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        onClick={onLoginClick}
                        className="bg-transparent! flex justify-between cursor-pointer text-white hover:text-cyan-100! transition-all duration-300"
                    >
                        Log in
                        <LogInIcon className="h-5 w-5 text-white hover:text-cyan-100!" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


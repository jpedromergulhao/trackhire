import { CircleUserRoundIcon, LogOutIcon, LogInIcon, User } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

interface MenuItemContentProps {
    text: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Profile() {
    const user = null;

    const handleLogout = async () => {
        
    }

    const MenuItemContent = ({ text, icon: Icon }: MenuItemContentProps) => (
        <div className="text-white hover:text-cyan-100 flex items-center justify-between w-full">
            <span>{text}</span>
            <DropdownMenuShortcut>
                <Icon className="h-5 w-5 text-white hover:text-cyan-100" />
            </DropdownMenuShortcut>
        </div>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-fit cursor-pointer">
                    {/* {user.profilePic ? (
                <Image
                    src={user.profilePic}
                    alt={`${user.name} photo`}
                    className=""
                />
            )
                : (
                    <CircleUserRoundIcon
                        className=""
                    />
                )
            } */}
                    <CircleUserRoundIcon
                        className="text-white hover:text-cyan-100 transition-all duration-300"
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10 bg-cyan-950" align="end">
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-cyan-800!">
                    <Link href='/profile'>
                        <MenuItemContent text="Profile" icon={User} />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user !== null ? (
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        Log out
                        <DropdownMenuShortcut><LogOutIcon /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-cyan-800!">
                        <Link href='/login'>
                            <MenuItemContent text="Log in" icon={LogInIcon} />
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

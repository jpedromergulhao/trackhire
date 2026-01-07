import React from "react";
import Link from "next/link";

interface Links {
    name: string,
    href: string
}

export default function Nav(): React.ReactNode {

    const navLinks: Links[] = [
        {
            name: "Applications",
            href: "/applications",
        }
    ]

    return (
        <nav className="h-fit">
            {navLinks.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className="text-white font-bold hover:text-cyan-100 transition-all duration-300"
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}
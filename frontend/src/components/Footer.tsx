import Image from "next/image";
import Link from "next/link";
import Logo from '../../public/trackHire.svg';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { ReactNode } from "react";

interface Contacts {
    href: string
    text: string
}

interface SocialLinks {
    href: string
    ariaLabel: string
    icon: ReactNode
}

export default function Footer() {
    const contacts: Contacts[] = [
        {
            href: "mailto:trackhire@test.com",
            text: "trackhire@test.com"
        },
        {
            href: "tel:+9999999999",
            text: "(999) 999-9999"
        }
    ];

    const socialLinks: SocialLinks[] = [
        {
            href: 'https://www.instagram.com/',
            ariaLabel: 'Instagram link',
            icon: <InstagramIcon />
        },
        {
            href: 'https://www.facebook.com/',
            ariaLabel: 'Facebook link',
            icon: <FacebookIcon />
        },
        {
            href: 'https://x.com/',
            ariaLabel: 'X link',
            icon: <TwitterIcon />
        },
        {
            href: 'https://www.linkedin.com/',
            ariaLabel: 'LinkedIn link',
            icon: <LinkedinIcon />
        },
    ]

    return (
        <footer className="bg-cyan-950 text-white pb-5 pt-20 text-center">
            <div className="flex flex-col space-y-8 md:flex-row md:justify-between md:space-y-0 pb-10 items-center px-30">
                <div className="flex flex-col space-y-1">
                    {contacts.map((contact, index) => (
                        <Link
                            key={index}
                            href={contact.href}
                            className="text-white font-bold hover:text-cyan-100 transition-all duration-300 underline"
                        >
                            {contact.text}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center justify-center bg-white p-5 rounded-full w-30 h-30 overflow-hidden">
                    <Image
                        src={Logo}
                        alt="TrackHire Logo"
                        className="object-contain" 
                        width={100}  
                        height={100} 
                    />
                </div>
                <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            target="blank"
                            className="text-white hover:text-cyan-100 transition-all duration-300"
                            aria-label={link.ariaLabel}
                        >
                            {link.icon}
                        </Link>
                    ))}
                </div>
            </div>
            <p className="text-white w-full pt-10 border-t-2 border-cyan-800">
                © 2026 TrackHire. All rights reserved. Developer by{" "}
                <Link
                    href="https://portfoliojoaopedro-tan.vercel.app/"
                    target="_blank"
                    className="hover:text-cyan-100 transition-all duration-300 underline"
                >
                    João Pedro Mergulhão
                </Link>
            </p>
        </footer>
    );
}

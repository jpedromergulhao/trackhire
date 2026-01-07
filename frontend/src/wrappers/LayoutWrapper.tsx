"use client";

import React, { useState } from 'react';
import Image from "next/image";
import logoWhite from "../../public/trackHire-white.svg";
import logoCyan from "../../public/trackHire-cyan.svg";
import { Toaster } from 'sonner';
import { AlertProvider } from '@/providers/AlertProvider';
import Nav from '@/components/Nav';
import Profile from '@/components/Profile';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [logo, setLogo] = useState<string>(logoWhite);

    return (
        <AlertProvider>
            <header className='sticky w-full top-0 py-0 px-0 md:py-4 md:px-6 z-50 flex justify-center'>
                <div className='bg-cyan-950 flex w-full md:w-fit py-2 px-8 md:px-15 space-x-0 md:space-x-20 flex-row md:rounded-full items-center justify-between'>
                    <Link href={"/"}>
                        <Image
                            src={logo}
                            alt='TrackHire Logo'
                            width={50}
                            height={50}
                            onMouseEnter={() => setLogo(logoCyan)}
                            onMouseLeave={() => setLogo(logoWhite)}
                        />
                    </Link>
                    <Nav />
                    <Profile />
                </div>
            </header>
            <main className='pt-5 pb-20 px-3 md:px-10 lg:px-20'>
                {children}
            </main>
            <Footer />
            <Toaster
                position="top-center"
                theme="light"
                toastOptions={{
                    classNames: {
                        toast: 'bg-white text-cyan-950 border-gray-200 shadow-lg',
                        title: 'text-cyan-950 font-semibold',
                        description: 'text-cyan-800',
                        actionButton: 'bg-cyan-950 hover:bg-cyan-800 text-white font-medium',
                        cancelButton: 'text-cyan-950 hover:text-cyan-800',
                    },
                }}
            />
        </AlertProvider>
    );
}
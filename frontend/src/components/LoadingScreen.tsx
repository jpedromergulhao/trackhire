"use client";

import Image from "next/image";
import logo from '../../public/trackHire.svg';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cyan-50/80 backdrop-blur-xs">
            <div className="relative flex items-center justify-center">

                <div className="absolute h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-cyan-600"></div>

                <div className="absolute h-24 w-24 animate-ping rounded-full bg-cyan-200/50"></div>

                <div className="relative animate-bounce-slow">
                    <Image
                        src={logo}
                        alt="TrackHire Logo"
                        width={80}
                        height={80}
                        className="drop-shadow-[0_0_15px_rgba(8,145,178,0.3)]"
                    />
                </div>
            </div>
        </div>
    );
}
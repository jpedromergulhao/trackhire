"use client"

import Image, { StaticImageData } from "next/image";
import Gif1 from "../../public/Gif.gif";
import Gif2 from "../../public/Gif2.gif"
import { useEffect, useState } from "react";

export default function Home() {
  const [gif, setGif] = useState<StaticImageData>(Gif1);
  const [alt, setAlt] = useState<string>("Woman typing on a computer.");

  //Change the gif when on mobile devices 
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 660px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setGif(Gif2);
        setAlt("Woman typing on her cell phone.");
      } else {
        setGif(Gif1);
        setAlt("Woman typing on a computer.");
      }
    };

    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <>
      <section className="flex flex-col items-center space-y-10 lg:flex-row lg:space-y-0 lg:space-x-20">
        <div className="space-y-6">
          <h2 className="bg-cyan-100 text-cyan-800 font-bold py-2 px-10 text-sm rounded-full text-center w-full sm:w-fit">
            Your career journey starts here.
          </h2>
          <h1 className="text-cyan-950 font-bold text-4xl sm:text-6xl">
            Stop Losing Track of Job Applications. Track. Organize. Get Hired
          </h1>
          <p className="text-cyan-950 text-lg md:text-2xl">
            Keep all your job applications, interviews, and outcomes in one place.
            Stay organized, focused, and in control of your job search, without spreadsheets or guesswork.
          </p>
          <button className="
          bg-cyan-950 hover:bg-cyan-800 text-white transition-all duration-300 cursor-pointer 
          font-bold px-5 py-3 rounded-full hover:-translate-y-1 w-full sm:w-fit
          ">
            Start Tracking Applications →
          </button>
        </div>
        <Image
          src={gif}
          alt={alt}
          unoptimized
          className="animate-float w-auto h-60 sm:h-90 md:h-100 lg:h-110 xl:h-120"
        />
      </section>
    </>
  );
}

"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./hero-highlight";
import Link from "next/link";

export function TextHighlight() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl h-[90%] md:text-4xl lg:text-4xl font-bold text-white max-w-3xl leading-relaxed lg:leading-[1.6] mx-auto text-start"
      >
        Say hello to precision and efficiency in every sprint. <br />
        <Highlight className="text-white">When AI meets agile</Highlight>
      </motion.h1>

      <Link
        href={"/auth/login"}
        className="btn bg-primary text-white mt-8 rounded-[5px] px-10 hover:text-white hover:bg-transparent hover:border-2 hover:border-primary"
      >
        Start Using Jaggle
      </Link>
    </HeroHighlight>
  );
}

"use client";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import mockupImg from "../../public/mockup.png";
import getUser from "./api/getCurrentUser";

export default function Home() {
  const userPresent = async () => {
    const userString = await getUser();
    const user = JSON.parse(userString);

    return user;
  };

  return (
    <main className="flex h-auto flex-col items-center">
      <NavBar user={userPresent()} />

      <div className="h-[500px] w-full flex flex-col justify-center items-center text-center gap-10">
        <p className="w-[60%] leading-[65px] text-5xl font-extrabold">
          The{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300">
            Ultimate Empowerment
          </span>{" "}
          Partner for Your Team.
        </p>
        <p className="w-[60%] text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla iusto
          numquam assumenda provident. Officiis esse saepe cumque numquam
          tempora odio illo dolorum error inventore alias! Aspernatur ducimus
          exercitationem omnis tempora.
        </p>

        <Link
          href={"/auth/login"}
          className="btn bg-yellow-300 text-black rounded-[5px] px-10 hover:text-white hover:bg-transparent hover:border-2 hover:border-yellow-300"
        >
          Start Using Jaggle
        </Link>
      </div>

      <div className="mockup-browser border border-base-300 w-[80%] h-[600px] mt-14">
        <span className="indicator-item badge bg-yellow-300 p-4 text-black absolute right-0 top-3 -rotate-12">
          Work 10x faster
        </span>
        <div className="mockup-browser-toolbar">
          <div className="input border border-base-300">
            https://www.jaggleai.com
          </div>
        </div>
        <Image className="" src={mockupImg} alt="Mockup image" />
        <div className="flex justify-center px-4 py-16 border-t border-base-300"></div>
      </div>

      <div className="hero h-auto relative p-52">
        <div className="hero-content text-center">
          <div className="w-[70%]">
            <h1 className="text-5xl leading-[65px] font-bold">
              Jaggle your coworker, supercharged by AI.
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

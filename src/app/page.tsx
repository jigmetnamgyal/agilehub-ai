"use client";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import mockupImg from "../../public/mockup.png";
import { TextHighlight } from "@/components/homepage/text-highlight";
import { GlobeComponent } from "@/components/homepage/globeComponent";
import { Mac } from "@/components/homepage/mac";
import { InfiniteCard } from "@/components/homepage/infinite-card";

export default function Home() {
  return (
    <main className="flex h-auto flex-col items-center px-10">
      <NavBar />

      <div className="h-svh w-full flex justify-center items-center text-center">
        <div className="h-full flex flex-col justify-center items-center text-center gap-10 w-[55%]">
          {/* <p className="w-[60%] leading-[65px] text-5xl font-extrabold">
          The{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300">
            Ultimate Empowerment
          </span>{" "}
          Partner for Your Team.
        </p> */}
          <TextHighlight />
          <InfiniteCard />
          {/* <p className="w-[60%] text-sm">
          Elevate your software development game with Jaggle AI. Our AI-driven
          platform streamlines user story creation and sprint planning, making
          agile success effortless. Say hello to precision and efficiency in
          every sprint.
        </p> */}
        </div>

        <div className="w-[45%] justify-start items-start">
          <GlobeComponent />
        </div>
      </div>

      {/* <div className="mockup-browser border border-base-300 w-[80%] h-[700px] mt-14">
				<span className="indicator-item badge bg-secondary p-4 text-black absolute right-0 top-3 -rotate-12">
					Work 10x faster
				</span>
				<div className="mockup-browser-toolbar">
					<div className="input border border-base-300">
						https://www.jaggleai.com
					</div>
				</div>
				<Image className="" src={mockupImg} alt="Mockup image" />
				<div className="flex justify-center px-4 py-16 border-t border-base-300"></div>
			</div> */}

      <Mac />

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

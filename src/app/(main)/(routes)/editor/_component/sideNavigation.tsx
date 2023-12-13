"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import {
  ChevronsLeft,
  ChevronsUpDown,
  MenuIcon,
  PlusCircle,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname, useRouter } from "next/navigation";
import getUser from "@/app/api/getCurrentUser";
import truncateStr from "../_utils/truncate";
import { useAuth, useClerk } from "@clerk/nextjs";
import CreateProject from "./createProject";
import ProjectFolder from "./projectFolder";
import { toast } from "sonner";
import { supabaseClient } from "@/app/api/supabase";
import CreateBpmn from "./createBpmn";

const SideNavigation = ({ getData }: any) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { userId, getToken } = useAuth();

  const [userStoryPrompt, setUserStoryPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [pages, setPages] = useState<any>([]);

  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizing = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const [user, setUser] = useState<any>(null);

  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState<string>("");

  // Remove this later
  const [testUserStory, setTestUserStory] = useState<string>("");

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  useEffect(() => {
    const getUserDetails = async () => {
      const usr = await getUser();
      const usrDetails = JSON.parse(usr);
      setUser(usrDetails);
    };

    getUserDetails();
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    let newWidth = e.clientX;

    if (newWidth < 288) newWidth = 288;
    if (newWidth > 480) newWidth = 480;

    if (sideBarRef.current && navbarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseup = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseup);
  };

  const resetWidth = () => {
    if (sideBarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sideBarRef.current.style.width = isMobile ? "100%" : "288px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 288px)",
      );

      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "288px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sideBarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sideBarRef.current.style.width = "0";
      sideBarRef.current.style.padding = "0";
      navbarRef.current.style.setProperty("width", "100%");

      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseup);
  };

  function getProjectId(childData: any) {
    setProjectId(childData);
  }

  const createProject = async () => {
    const token = await getToken({ template: "jaggle_ai_supabase_jwt" });

    try {
      const { data, error } = await supabaseClient(token || "")
        .from("projects")
        .insert([
          {
            user_id: userId,
            title: projectTitle,
            description: projectDescription,
          },
        ])
        .select();

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Project created successfully");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const generateBpmnDiagram = async () => {
    setLoading(true);

    const token = await getToken({ template: "jaggle_ai_supabase_jwt" });

    const response = await fetch("/api/bpmn-ai", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        prompt: testUserStory,
      }),
    });

    const data = await response.json();

    console.log(data);
    getData(data);
    setLoading(false);
  };

  async function generateStory() {
    setLoading(true);

    const token = await getToken({ template: "jaggle_ai_supabase_jwt" });

    const response = await fetch("/api/jaggleai", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        prompt: userStoryPrompt,
      }),
    });

    const data = await response.json();

    getData(data);

    const pages = await supabaseClient(token as string)
      .from("pages")
      .insert([
        {
          page_title: pageTitle,
          project_id: projectId,
          user_prompt: userStoryPrompt,
          ai_generated_description: data.jaggleAiResponse,
        },
      ])
      .select("*");

    setPages(pages.data);
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen bg-gray-500/60 absolute top-0 left-0 flex flex-col justify-center items-center">
          <p className="text-lg font-extrabold text-center">
            Jaggle is generating your Flow diagram. <br /> It will take less
            than a min, thank you for your patience 🫰
          </p>
          <span className="mt-5 loading loading-dots loading-lg"></span>
        </div>
      ) : null}
      <aside
        ref={sideBarRef}
        className={`group/sidebar bg-primary-content z-[99999] h-full overflow-y-auto relative flex flex-col ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile ? "w-0 p-0" : "w-72"}`}
      >
        <div className="w-auto px-4 pt-[12px] z-[999999] flex">
          <div className="w-full dropdown">
            <div
              tabIndex={0}
              role="button"
              className="w-full flex items-center"
            >
              <div className="avatar object-contain">
                <div className="w-7 h-7 rounded-full">
                  {/* trunk-ignore(eslint/@next/next/no-img-element) */}
                  <img src={user?.imageUrl} alt="Avatar" />
                </div>
              </div>

              <div className="ml-2">
                <p className="text-xs">{user?.firstName}'s Workspace</p>
                <p className="text-[9px] truncate">
                  {truncateStr(
                    user?.emailAddresses[0].emailAddress,
                    user?.emailAddresses[0].emailAddress.indexOf("@"),
                  )}
                  ...
                </p>
              </div>
              <ChevronsUpDown className="ml-1 h-[13px]" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p
                  onClick={() => {
                    signOut(() => router.push("/"));
                    toast.success("Successfully logged out");
                  }}
                >
                  Logout
                </p>
              </li>
            </ul>
          </div>

          <div
            role="button"
            onClick={collapse}
            className={`h-6 w-6 z-[999999] rounded-sm hover:bg-neutral-300 absolute top-3 right-2 group-hover/sidebar:opacity-100 transition ${
              isMobile ? "opacity-100" : "opacity-0"
            }`}
          >
            <ChevronsLeft className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-8">
          <CreateProject
            onClick={() => {
              document.getElementById("my_modal_5")?.showModal();
            }}
            label="New Project"
            icon={PlusCircle}
          />
        </div>

        <div className="mt-8">
          <CreateBpmn
            onClick={() => {
              document.getElementById("bpmn_model")?.showModal();
            }}
            label="New Bpmn Diagram"
            icon={PlusCircle}
          />
        </div>

        <dialog id="bpmn_model" className="modal w-[60%] mx-auto">
          <div className="modal-box w-11/12 max-w-5xl">
            <p className="mb-5 font-bold text-md">Your user Story</p>
            <textarea
              onChange={(e) => setTestUserStory(e.target.value)}
              className="mb-3 textarea outline outline-offset-1 focus:outline-yellow-300 outline-yellow-300 outline-1 w-full rounded-md"
              placeholder="Type Here ..."
            ></textarea>
            <p className="text-xs text-gray-400">
              <i>
                Give detailed user story about the project so that Jaggle AI can
                generate a bpmn diagram for you.
              </i>
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  onClick={generateBpmnDiagram}
                  className="btn text-white"
                >
                  Create Bpmn Diagram
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="my_modal_5" className="modal w-[60%] mx-auto">
          <div className="modal-box w-11/12 max-w-5xl">
            <p className="mb-5 font-bold text-md">
              👋 What is the name of your project ?
            </p>
            <input
              type="text"
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Jaggle"
              className="mb-5 input outline outline-offset-1 focus:outline-yellow-300 outline-yellow-300 outline-1 w-full rounded-md"
            />
            <p className="mb-5 font-bold text-md">
              👋 Tell me more about your Project ?
            </p>
            <textarea
              onChange={(e) => setProjectDescription(e.target.value)}
              className="mb-3 textarea outline outline-offset-1 focus:outline-yellow-300 outline-yellow-300 outline-1 w-full rounded-md"
              placeholder="Type Here ..."
            ></textarea>
            <p className="text-xs text-gray-400">
              <i>
                Give detailed description about the project so that Jaggle AI
                will have a good context of your project and generate accurate
                data for you.
              </i>
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button onClick={createProject} className="btn text-white">
                  Create Project
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <div className="mt-8">
          <ProjectFolder project_id={getProjectId} pages={pages} />
        </div>

        <dialog id="my_modal_4" className="modal w-[60%] mx-auto">
          <div className="modal-box w-11/12 max-w-5xl">
            <p className="mb-5 font-bold text-lg">
              Can you provide me the title of the feature ?
            </p>
            <input
              type="text"
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="SSO Auth"
              className="mb-5 input outline outline-offset-1 focus:outline-yellow-300 outline-yellow-300 outline-1 w-full rounded-md"
            />

            <p className="mb-5 font-bold text-lg">
              Can you explain me the feature ?
            </p>
            <textarea
              onChange={(e) => setUserStoryPrompt(e.target.value)}
              className="mb-5 textarea outline outline-offset-2 focus:outline-yellow-300 outline-yellow-300 outline-2 w-full"
              placeholder="Write a user story for ...."
            ></textarea>
            <p className="text-xs">
              <i>
                Example Prompt: Generate a user story for a SSO auth module with
                google and linkedIn feature.
              </i>
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button onClick={generateStory} className="btn">
                  Start Writing
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-[3px] bg-yellow-300/80 right-0 top-0"
        ></div>
      </aside>

      <div
        ref={navbarRef}
        className={`absolute top-0 z-[99999] left-60 w-[calc(100%-288px)] ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile && "left-0 w-full"}`}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-black"
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default SideNavigation;

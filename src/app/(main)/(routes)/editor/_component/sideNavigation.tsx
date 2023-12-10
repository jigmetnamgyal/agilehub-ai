"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname, useRouter } from "next/navigation";
import getUser from "@/app/api/getCurrentUser";
import truncateStr from "../_utils/truncate";
import { useClerk } from "@clerk/nextjs";

const SideNavigation = ({ getData }: any) => {
  const { signOut } = useClerk();
  const router = useRouter();

  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizing = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const [userStoryPrompt, setUserStoryPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

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
      console.log(usrDetails);
    };

    getUserDetails();
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
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

      sideBarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)",
      );

      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
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

  async function generateStory() {
    setLoading(true);
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
    setLoading(false);

    getData(data);
  }

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen bg-black/60 absolute top-0 left-0 z-[999999] flex justify-center items-center">
          <p>Jaggle is 💭</p>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : null}
      <aside
        ref={sideBarRef}
        className={`group/sidebar bg-primary-content z-[99999] h-full overflow-y-auto relative flex flex-col ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile ? "w-0 p-0" : "w-60"}`}
      >
        <div className="w-auto px-4 pt-[12px] z-[999999] flex">
          <div className="w-full dropdown">
            <div tabIndex={0} role="button" className="w-full flex">
              <div className="avatar object-contain">
                <div className="w-7 h-7 rounded-full">
                  {/* trunk-ignore(eslint/@next/next/no-img-element) */}
                  <img src={user?.imageUrl} alt="Avatar" />
                </div>
              </div>

              <div className="ml-2">
                <p className="text-xs">{user?.firstName}'s Workspace</p>
                <p className="text-[8px]">
                  {truncateStr(
                    user?.emailAddresses[0].emailAddress,
                    user?.emailAddresses[0].emailAddress.indexOf("@"),
                  )}
                  ...
                </p>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p
                  onClick={() => {
                    signOut(() => router.push("/"));
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
            <ChevronsLeft className="h-6 w-6 text-yellow-300" />
          </div>
        </div>

        <button
          className="btn my-10 bg-yellow-300 text-black max-w-[300px] mx-auto"
          onClick={() => {
            document.getElementById("my_modal_4")?.showModal();
          }}
        >
          <p className="text-xs">Generate User Story</p>
        </button>
        <dialog id="my_modal_4" className="modal w-[60%] mx-auto">
          <div className="modal-box w-11/12 max-w-5xl">
            <p className="mb-10 font-bold text-lg">
              👋 What feature are you working today ?
            </p>
            <textarea
              onChange={(e) => setUserStoryPrompt(e.target.value)}
              className="mb-10 textarea outline outline-offset-2 focus:outline-yellow-300 outline-yellow-300 outline-2 w-full"
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
        <div>
          <p>Action Items</p>
        </div>

        <div className="mt-4">
          <p>Documents</p>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-[3px] bg-yellow-300/80 right-0 top-0"
        ></div>
      </aside>

      <div
        ref={navbarRef}
        className={`absolute top-0 z-[99999] left-60 w-[calc(100%-240px)] ${
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

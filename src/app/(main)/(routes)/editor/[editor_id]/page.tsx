"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";
import getUser from "@/app/api/getCurrentUser";

import "@blocknote/core/style.css";
import SideNavigation from "../_component/sideNavigation";

const Editor = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userStory, setUserStory] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      const userString = await getUser();
      const user = JSON.parse(userString);

      setUserDetails(user);
    };

    getUserDetails();
  }, []);

  const editor: BlockNoteEditor | null = useBlockNote({});

  function getJaggleAiResponse(childData: any) {
    setUserStory(childData?.jaggleAiResponse);
  }

  return (
    <div className="flex max-w-screen w-screen h-screen max-h-auto bg-white">
      <SideNavigation getData={getJaggleAiResponse} />
      {/* <BlockNoteView
				className="w-full h-full p-20"
				editor={editor}
				theme={"light"}
			/> */}
      <p className="text-black w-80%">User stroy: {userStory}</p>
    </div>
  );
};

export default Editor;

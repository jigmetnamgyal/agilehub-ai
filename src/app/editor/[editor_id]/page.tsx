"use client";

import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  Theme,
  darkDefaultTheme,
  lightDefaultTheme,
  useBlockNote,
} from "@blocknote/react";
import { useEffect, useState } from "react";
import getUser from "@/app/api/getCurrentUser";

import "@blocknote/core/style.css";

const Editor = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getUserDetails = async () => {
      const userString = await getUser();
      const user = JSON.parse(userString);

      setUserDetails(user);
    };

    getUserDetails();
  }, []);

  const editor: BlockNoteEditor | null = useBlockNote({});

  return (
    <div className="flex max-w-screen w-screen h-screen max-h-auto bg-white">
      <div className="h-screen sticky bg-gray-100 w-[300px]"></div>
      <BlockNoteView
        className="w-full h-full p-20"
        editor={editor}
        theme={"light"}
      />
    </div>
  );
};

export default Editor;

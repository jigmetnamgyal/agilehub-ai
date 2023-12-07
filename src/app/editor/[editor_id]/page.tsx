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
    <div className="max-w-screen w-screen h-screen max-h-auto bg-white">
      <BlockNoteView
        className="w-full h-full"
        editor={editor}
        theme={"light"}
      />
    </div>
  );
};

export default Editor;

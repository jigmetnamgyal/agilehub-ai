"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEffect, useState } from "react";
import getUser from "@/app/api/getCurrentUser";
import { useParams } from "next/navigation";

const Editor = () => {
  useEffect(() => {
    const getUserDetails = async () => {
      const userString = await getUser();
      const user = JSON.parse(userString);

      setUserDetails(user);
    };

    getUserDetails();
  }, []);

  const [userDetails, setUserDetails] = useState({});

  const params = useParams();

  const editor: BlockNoteEditor = useBlockNote({});

  return (
    <div>
      <BlockNoteView editor={editor} />
    </div>
  );
};

export default Editor;

"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useParams } from "next/navigation";
import "@blocknote/core/style.css";

const Editor = () => {
  const params = useParams();
  const editor: BlockNoteEditor = useBlockNote({});

  return (
    <div>
      <BlockNoteView editor={editor} />;
    </div>
  );
};

export default Editor;

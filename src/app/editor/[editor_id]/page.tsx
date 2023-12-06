"use client";

import { useParams } from "next/navigation";

const Editor = () => {
  const params = useParams();
  return <div>This is editor page with id {params?.editor_id}</div>;
};

export default Editor;

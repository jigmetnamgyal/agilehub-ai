"use client";

import { Block, BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";
import getUser from "@/app/api/getCurrentUser";

import "@blocknote/core/style.css";
import SideNavigation from "../_component/sideNavigation";
import Diagram from "../_component/diagram";
import { useAuth } from '@clerk/clerk-react';

const Editor = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userStory, setUserStory] = useState(useCreateBlockNote());
  const [blocks, setBlocks] = useState(undefined);
  const [editable, setEditable] = useState(false);
  const editor = useCreateBlockNote();
  const { userId, getToken } = useAuth();
  const [ graph, setGraph ] = useState(undefined);

  function removeBackticks(str: string) {
    if (str.startsWith("```") && str.endsWith("```")) {
      return str.slice(3, -3);
    }
    return str;
  }

  useEffect(() => {
    const getUserDetails = async () => {
      const userString = await getUser();
      const user = JSON.parse(userString);

      setUserDetails(user);
       
      };

    getUserDetails();
  }, [userStory]);


  async function getJaggleAiResponse(childData: any) {
    setUserStory(childData?.jaggleAiResponse);
    const blocks = await editor.tryParseHTMLToBlocks(childData?.jaggleAiResponse);
    await editor?.replaceBlocks((editor as any)?.document, blocks);
    setEditable(true);
  }

  const setContent = async (value: string) => {
    setBlocks(value as any);
    const blocks = await editor.tryParseHTMLToBlocks(value);
    await editor?.replaceBlocks((editor as any)?.document, blocks);
    setEditable(true);
  }

  const generateBpmnDiagram = async () => {
    const token = await getToken({ template: "jaggle_ai_supabase_jwt" });

    const response = await fetch("/api/bpmn-ai", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        prompt: blocks,
      }),
    });

    const data = await response.json();
    console.log(removeBackticks((data.jaggleAiResponse as any)?.replace(`/^mermaid\s+/`, '')), 'newwwwwwwwwwwww');
     setGraph(`
     flowchart LR
     start1(Start ¡!startEvent!¡) --> loginPage[Show Login Page ¡!activity!¡]
     loginPage --> googleLinkedIn[Select Google or LinkedIn ¡!activity!¡]
     googleLinkedIn --> authenticate[Redirect to Authentication Page ¡!activity!¡]
     authenticate --> googleLinkedInCred[Authenticate with Google or LinkedIn ¡!activity!¡]
     googleLinkedInCred --> loggedIn[Logged In ¡!activity!¡]\nloggedIn --> end1(End ¡!endEvent!¡)
     ` as any);
  };

  return (
    <div className="flex max-w-screen w-screen h-screen min-h-auto">
      <SideNavigation getData={getJaggleAiResponse} setContent={setContent}/>
      <div className='flex-col w-screen'>
      <BlockNoteView
          editor={editor}
          className='w-full h-full p-16'
          theme={"light"}
          data-theming-css-variables-demo
          editable={editable}
        />
        <button onClick={ () => generateBpmnDiagram()}>GENERATE BPMN Diagram</button>
      {!!(graph as any)?.length && <div className="text-black w-full h-full">
        <Diagram mermaidCode={removeBackticks((graph as any)?.replace(`/^mermaid\s+/`, ''))} />
      </div>}
      </div>
    </div>
  );
};

export default Editor;

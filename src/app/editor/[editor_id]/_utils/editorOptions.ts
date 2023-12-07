import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { ReactSlashMenuItem } from "@blocknote/react";

export type BlockNoteEditorOptions = Partial<{
  editable: boolean;
  initialContent: PartialBlock[];
  editorDOMAttributes: Record<string, string>;
  onEditorReady: (editor: BlockNoteEditor) => void;
  onEditorContentChange: (editor: BlockNoteEditor) => void;
  onTextCursorPositionChange: (editor: BlockNoteEditor) => void;
  slashMenuItems: ReactSlashMenuItem[];
  defaultStyles: boolean;
  uploadFile: (file: File) => Promise<string>;
}>;

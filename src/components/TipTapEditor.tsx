"use client";
import React, { HTMLAttributes } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { SELL_PRODUCT_FORM_FIELDS } from "@/constants";

interface TipTapEditorProps extends HTMLAttributes<HTMLDivElement> {}

const TipTapEditor = (props: TipTapEditorProps) => {
  const [description, setDescription] = React.useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
      },
    },
    onUpdate({ editor }) {
      setDescription(JSON.stringify(editor.getJSON()));
    },
    immediatelyRender: false,
  });

  return (
    <div {...props}>
      <div className="flex gap-4 flex-wrap">
        <input
          name={SELL_PRODUCT_FORM_FIELDS.DESCRIPTION}
          type="hidden"
          value={description}
        />
        <Button
          type="button"
          variant={
            editor?.isActive("heading", { level: 1 }) ? "default" : "outline"
          }
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          h1
        </Button>
        <Button
          type="button"
          variant={
            editor?.isActive("heading", { level: 2 }) ? "default" : "outline"
          }
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          h2
        </Button>
        <Button
          type="button"
          variant={
            editor?.isActive("heading", { level: 3 }) ? "default" : "outline"
          }
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          h3
        </Button>
        <Button
          type="button"
          variant={editor?.isActive("bold") ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          type="button"
          variant={editor?.isActive("italic") ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          type="button"
          variant={editor?.isActive("strike") ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          Strike
        </Button>
      </div>
      <EditorContent
        editor={editor}
        className="rounded-lg border-2 min-h-[150px] mt-4 p-4"
      />
    </div>
  );
};

export default TipTapEditor;

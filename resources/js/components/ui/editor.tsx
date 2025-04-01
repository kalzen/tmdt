import * as React from "react";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Code,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Toolbar } from "@/components/ui/toolbar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function Editor({ value, onChange, placeholder = "Viết nội dung bài viết của bạn tại đây..." }: EditorProps) {
  const [linkUrl, setLinkUrl] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // FIX: Change from true to false to avoid the conflict with our custom heading extension
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded mx-auto",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-[250px] p-4",
      },
      // Prevent form submission when using Enter in the editor
      handleKeyDown: (view, event) => {
        // Allow Enter key to be handled by the editor
        if (event.key === 'Enter' && !event.shiftKey) {
          return false; // Let TipTap handle it
        }
        
        // Prevent form submission when using keyboard shortcuts
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
          event.preventDefault();
          return true;
        }
        
        return false;
      },
    },
  });

  // Prevent form submission when clicking editor buttons
  const handleButtonClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    callback();
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;

    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);

    fetch(route('api.upload-image'), {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const addLink = () => {
    if (!editor) return;
    if (linkUrl) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
      setLinkUrl("");
    }
  };

  const addImage = () => {
    if (!editor) return;
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  };

  if (!editor) return null;

  return (
    <div className="border rounded-md" onKeyDown={(e) => {
      // Prevent form submission using Enter key
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();
      }
    }}>
      <Toolbar className="border-b p-1">
        <div className="flex flex-wrap items-center gap-1">
          <Button
            size="icon"
            variant={editor.isActive("bold") ? "secondary" : "ghost"}
            onClick={handleButtonClick(() => editor.chain().focus().toggleBold().run())}
            type="button" // Explicitly set type to button to prevent form submission
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("italic") ? "secondary" : "ghost"}
            onClick={handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
            type="button"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
            onClick={handleButtonClick(() => editor.chain().focus().toggleBulletList().run())}
            type="button"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
            onClick={handleButtonClick(() => editor.chain().focus().toggleOrderedList().run())}
            type="button"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
            onClick={handleButtonClick(() => editor.chain().focus().toggleBlockquote().run())}
            type="button"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
            onClick={handleButtonClick(() => editor.chain().focus().toggleCodeBlock().run())}
            type="button"
          >
            <Code className="h-4 w-4" />
          </Button>
          
          <ToggleGroup type="single" aria-label="Headings" onValueChange={(value) => {
            if (!value) return; // Handle undefined
            // FIX: Use type assertion with as to handle the level type correctly
            const level = parseInt(value.replace('h', ''), 10) as 1 | 2 | 3;
            if (level >= 1 && level <= 3) { // Verify level is valid
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}>
            <ToggleGroupItem 
              value="h1" 
              aria-label="Heading 1"
              variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
              type="button"
            >
              <Heading1 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="h2" 
              aria-label="Heading 2"
              variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
              type="button"
            >
              <Heading2 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="h3" 
              aria-label="Heading 3"
              variant={editor.isActive("heading", { level: 3 }) ? "default" : "outline"}
              type="button"
            >
              <Heading3 className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" aria-label="Text alignment">
            <ToggleGroupItem 
              value="left" 
              aria-label="Align left"
              variant={editor.isActive({ textAlign: 'left' }) ? "default" : "outline"}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              type="button"
            >
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="center" 
              aria-label="Align center"
              variant={editor.isActive({ textAlign: 'center' }) ? "default" : "outline"}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              type="button"
            >
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="right" 
              aria-label="Align right"
              variant={editor.isActive({ textAlign: 'right' }) ? "default" : "outline"}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              type="button"
            >
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant={editor.isActive("link") ? "secondary" : "ghost"} type="button">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Nhập URL liên kết"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addLink} type="button">Áp dụng</Button>
              </div>
              {editor.isActive("link") && (
                <Button 
                  variant="destructive" 
                  className="mt-2 w-full"
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  type="button"
                >
                  Xóa liên kết
                </Button>
              )}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" type="button">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập URL hình ảnh"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addImage} type="button">Áp dụng</Button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm">hoặc tải lên từ máy tính</span>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="ml-auto flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              type="button"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              type="button"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Toolbar>
      <EditorContent 
        editor={editor} 
        className="prose max-w-none"
        onKeyDown={(e) => {
          // Prevent forms from submitting when pressing Enter in the editor
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      />
      <style>{`
        .ProseMirror {
          min-height: 300px;
          padding: 1rem;
          outline: none;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: "${placeholder}";
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

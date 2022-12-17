import { useEditor, EditorContent, Editor } from '@tiptap/react'
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaParagraph, FaUndo, FaRedo, FaHeading, FaListUl, FaListOl, FaImage } from 'react-icons/fa'
import { GiSeatedMouse } from 'react-icons/gi'
import StarterKit from '@tiptap/starter-kit'
import "../styles/texteditor.css"
import "../styles/codestyle.css"
import { useCallback } from 'react'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import go from 'highlight.js/lib/languages/go'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import yaml from 'highlight.js/lib/languages/yaml'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import dockerfile from 'highlight.js/lib/languages/dockerfile'


lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)
lowlight.registerLanguage('html', html)
lowlight.registerLanguage('go', go)
lowlight.registerLanguage('python', python)
lowlight.registerLanguage('java', java)
lowlight.registerLanguage('bash', bash)
lowlight.registerLanguage('c', c)
lowlight.registerLanguage('cpp', cpp)
lowlight.registerLanguage('yaml', yaml)
lowlight.registerLanguage('json', json)
lowlight.registerLanguage('markdown', markdown)
lowlight.registerLanguage('rust', rust)
lowlight.registerLanguage('sql', sql)
lowlight.registerLanguage('dockerfile', dockerfile)


interface MenuProps {
    editor: Editor
}


function MenuBar(props: MenuProps) {
    const editor = props.editor

    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    if (!editor) {
        return null
    }

    return (
        <div className="menubar">
            <div className="format-options">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <FaBold />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <FaItalic />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <FaStrikethrough />
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    <FaParagraph />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    <FaHeading />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    <FaHeading />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    <FaHeading />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    <FaHeading />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <FaListUl />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    <FaListOl />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    <FaCode />
                </button>
                <button
                    onClick={addImage}
                >
                    <FaImage />
                </button>

                <button>
                    <GiSeatedMouse />
                </button>
            </div>
            <div className="undo-redo">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    <FaUndo />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    <FaRedo />
                </button>
            </div>
        </div>

    )
}

function TextEditor() {
    Link.configure({
        linkOnPaste: false,
    })

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link,
            CodeBlockLowlight.configure({
                lowlight,
            })
        ],
        content: `<p> Welcome !! </p>`,
    })

    return (
        <div>
            {editor ? <MenuBar editor={editor} /> : null}
            <EditorContent editor={editor} />
        </div>
    )
}

export default TextEditor
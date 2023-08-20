import { React, useEffect, useState, useRef } from "react";
import CodeMirror, { oneDarkTheme } from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { syntaxHighlighting, HighlightStyle, defaultHighlightStyle } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import IconBtn from "../componenet/IconBtn";

function Editor_View(props) {
    const
        { DB, state } = props,
        titleInput = useRef(),
        contentEditor = useRef(),
        [change, setChange] = useState({ ...state.activeNote }),

        basicSyntaxHighlighting = HighlightStyle.define([
            { tag: tags.strong, color: "#fff", fontWeight: 700 },
            { tag: tags.content, color: "#ffffffd7", fontWeight: 300, fontSize: "14px" },
            { tag: tags.heading, fontSize: "40px", fontWeight: "100" },
            { tag: tags.heading1, fontSize: "36px", fontWeight: "100" },
            { tag: tags.heading2, fontSize: "32px", fontWeight: "500" },
            { tag: tags.heading3, fontSize: "28px", fontWeight: "500" },
            { tag: tags.heading4, fontSize: "24px", fontWeight: "700" },
            { tag: tags.heading5, fontSize: "20px", fontWeight: "700" },
            { tag: tags.heading6, fontSize: "16px", fontWeight: "700" },
            { tag: tags.regexp, color: "#000" },
        ]);

    useEffect(() =>{ setChange({ ...state.activeNote })}, [state.activeNote]);
    useEffect(() => {
        let { id, title, content } = { ...state.activeNote, ...change };
        DB.editNote(id, title, content);
        titleInput.current = change.title;
        contentEditor.current = change.content;
    }, [change.content, change.title, change]);

    return (<>
    
        <div className="nav dragable">
            <div className="btnsWrap">
                <span onClick={() => fs.writeFile(`./${state.activeNote.id}.md`,
                    state.activeNote.content, "utf8bom", err => console.log(err))}>
                    <IconBtn iconSrc="../assets/Share.svg" />
                </span>
                <span onClick={() => DB.deleteNote(change.id)}>
                    <IconBtn iconSrc="../assets/Trash.svg" />
                </span>
            </div>
            <span className="editTime">{change.id}</span>
        </div>

        <div className="title">
            <input
                value={change.title} type="text" placeholder="Untitled"
                onInput={v => setChange({ ...change, title: v.target.value })} />
        </div>

        <CodeMirror className="codeMirror"
            value={change.content}
            onChange={v => setChange({ ...change, content: v })}

            placeholder={"Write something"}
            height="100%"
            width="100%"
            theme={[oneDarkTheme]}
            extensions={[
                EditorView.lineWrapping,
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                    addKeymap: true,
                    defaultCodeLanguage: true,
                }),
                syntaxHighlighting(defaultHighlightStyle),
                syntaxHighlighting(basicSyntaxHighlighting),
            ]}
        />
    </>);
};
export default Editor_View;
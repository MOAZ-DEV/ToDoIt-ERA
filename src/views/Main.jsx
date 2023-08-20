import { React, useEffect, useState, useRef } from "react";
import Editor_View from "./Editor_View";
import "../scss/Main.scss";

export default function Main(props) {
    const
        { DB, state } = props;


    return (
        <div className="main">
            {(state.activeNote && state.notes[0]) ?
                <Editor_View
                    DB={DB}
                    state={state} />
                : 
                <div className="blank">
                    Make your first note!
                </div>
                }


        </div>
    );
}

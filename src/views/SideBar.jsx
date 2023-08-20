import { useEffect, useState } from "react";
import IconBtn from "../componenet/IconBtn";
import "../scss/SideBar.scss";

function Side_Bar(props) {
    const { DB, state } = props;

    return (<>
        <div className="sideBar">

            <div className="lable dragable">
                <span>All notes</span>
                <span onClick={DB.addNote}>
                    <IconBtn iconSrc={"../assets/Plus.svg"} className="undragable" />
                </span>
            </div>

            <div className="itemsWrap">
                {state.notes.map(note => <div
                    key={note.id}
                    className={(state.activeNote.id == note.id) ? "noteItem active" : "noteItem"}
                    onClick={() => DB.activeNote(note)}>

                    <div className="Tag">
                        <IconBtn iconSrc="../assets/Tag.svg" />
                    </div>
                    <div className="wraper">
                        <span className="title"> {note.title || "Untitled"} </span>
                        <span className="subTitle"> {note.content || "Empty"} </span>
                    </div>
                </div>)}
            </div>
        </div>

    </>);
};
export default Side_Bar;

/**
 * 
 *  <div className="searchBar">
                <input placeholder="Search.." type="search" dir="auto" id="" />
                <IconBtn iconSrc="../assets/Filter.svg" />
            </div>
 */
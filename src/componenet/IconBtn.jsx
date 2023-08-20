import React from "react";
import "../scss/components.scss";

function IconBtn(props) {
     return (
        
        <button className="iconBtn undragable">
            <img src={props.iconSrc} alt="" />
        </button>
     )
};
export default IconBtn;
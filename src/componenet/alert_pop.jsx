import { useEffect } from "react";

function Alert_Pop(props) {
useEffect(()=> {
    console.log("Sddd")
}, [props.alert])
   return ( <>
        <div className="alertPop">
            {props.alert}
        </div>
    </>);
}
export default Alert_Pop;
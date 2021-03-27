import React from "react";
import ReactDOM from "react-dom";

const info=(props)=>(
    <div>
        <h1>Info</h1>
        <p>The info is {props.info}</p>
    </div>
);


const withAdminWarning =(WrappedComponent)=>{
    return(props)=>(
        <div>
            {props.auth&&<p>This is private info please do not share</p>}
            <WrappedComponent {...props}/>
        </div>
    );
}

const AdminInfo=withAdminWarning(info);

ReactDOM.render(<AdminInfo info={"for authentication"} auth={true} />,document.getElementById("app"));
import React from "react";
import {connect} from "react-redux";;
import {startGithubLogin,startGoogleLogin, startFacebookLogin} from "../actions/auth";

export const LoginPage=({startGithubLogin,startGoogleLogin,startFacebookLogin})=>(
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>It is time to get your expenses under control. </p>
            <button className="button" onClick={startGithubLogin}>Login with GitHub</button>
            <button className="button" onClick={startGoogleLogin}>Login with Google</button>
            <button className="button" onClick={startFacebookLogin}>Login with Facebook</button>
        </div>
    </div>
)

const mapDispatchToProps=(dispatch)=>({
    startGithubLogin:()=>dispatch(startGithubLogin()),
    startGoogleLogin:()=>dispatch(startGoogleLogin()),
    startFacebookLogin:()=>dispatch(startFacebookLogin()),
})

export default connect(undefined,mapDispatchToProps)(LoginPage)
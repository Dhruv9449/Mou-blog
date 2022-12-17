import { GoogleOAuthProvider, GoogleLogin, CredentialResponse, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link } from "react-router-dom";
import credentials from "../.env/oauth2-credentials.json"

const GOOGLE_CLIENT_ID = credentials.web.client_id;

function getUser(resp: CredentialResponse) {
    const URL = "http://localhost:8000/oauth/login";
    let id_token = resp.credential;
    console.log(id_token);

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id_token": id_token
        })
    }
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            for (const item in data) {
                localStorage.setItem(item, data[item]);
            }
        }).then(() => {
            window.location.reload()
        })
}

interface Props {
    type: "standard" | "icon",
    shape: "square" | "pill",
}

function Login(props: Props) {
    return (
        <div className="google-button-container">
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={(resp) => getUser(resp)}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    theme="outline"
                    type={props.type}
                    shape={props.shape}
                />;
            </GoogleOAuthProvider>
        </div>
    )
}

export default Login;

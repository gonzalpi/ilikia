import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";


export default function Pencil(){
    const unityContext = new UnityContext({
        loaderUrl: "webGL/pencil/WebBuild.loader.js",
        dataUrl: "webGL/pencil/WebBuild.data",
        frameworkUrl: "webGL/pencil/WebBuild.framework.js",
        codeUrl: "webGL/pencil/WebBuild.wasm",
    });
    return (

    <div style={{

        width: "100%",
        display: "grid",
        gridTemplateColumns: "auto auto"

    }}>

        <Unity width="100%" height="100%" unityContext={unityContext} />

    </div>
    );
};

export {Pencil}
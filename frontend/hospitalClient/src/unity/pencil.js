import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";


export default function Pencil(){
    const unityContext = new UnityContext({
        loaderUrl: "webGL/pencil/WebBuild.loader.js",
        dataUrl: "webGL/pencil/WebBuild.data",
        frameworkUrl: "webGL/pencil/WebBuild.framework.js",
        codeUrl: "webGL/pencil/WebBuild.wasm",
    });
    return <Unity unityContext={unityContext} />;
};

export {Pencil}
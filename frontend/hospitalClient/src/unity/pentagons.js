
import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";


export default function Pentagons(){
    const unityContext = new UnityContext({
        loaderUrl: "webGL/pentagons/WebBuildPentagon.loader.js",
        dataUrl: "webGL/pentagons/WebBuildPentagon.data",
        frameworkUrl: "webGL/pentagons/WebBuildPentagon.framework.js",
        codeUrl: "webGL/pentagons/WebBuildPentagon.wasm",
    });
    return <Unity unityContext={unityContext} />;
};

export {Pentagons}

import React, {Fragment} from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
    loaderUrl: "webGL/pentagons/WebBuildPentagon.loader.js",
    dataUrl: "webGL/pentagons/WebBuildPentagon.data",
    frameworkUrl: "webGL/pentagons/WebBuildPentagon.framework.js",
    codeUrl: "webGL/pentagons/WebBuildPentagon.wasm",
});

function Pentagons(){
    return(
        <Fragment>
            <div>
                <Unity unityContext={unityContext} style={{height: "80vh", width: "150vh", border: "0px solid black"}}/>
            </div>
        </Fragment>
        );
    }
export default Pentagons;
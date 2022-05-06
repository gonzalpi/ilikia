
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
                <Fragment>
                    <div className="unity-container">
                        <Unity unityContext={unityContext} style={{height: "80vh", width: "150vh", border: "0px solid black"}}/>
                        {/* The Unity app will be rendered here. */}
                    </div>
                </Fragment>
            </div>
        </Fragment>
        );
    }
export {Pentagons};
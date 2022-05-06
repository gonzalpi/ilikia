import React, { Fragment } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
    loaderUrl: "webGL/pencil/WebBuild.loader.js",
    dataUrl: "webGL/pencil/WebBuild.data",
    frameworkUrl: "webGL/pencil/WebBuild.framework.js",
    codeUrl: "webGL/pencil/WebBuild.wasm"
});

function Pencil(){


     // When the component is mounted, we'll register some event listener.
    // useEffect(() => {
    //     unityContext.on("canvas", handleOnUnityCanvas);
    //     unityContext.on("progress", handleOnUnityProgress);
    //     unityContext.on("loaded", handleOnUnityLoaded);
    //     unityContext.on("RotationDidUpdate", handleOnUnityRotationDidUpdate);
    //     unityContext.on("ClickedPosition", handleOnUnityClickedPosition);
    //     unityContext.on("Say", handleOnUnitySayMessage);
    // }, []);
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
export {Pencil};
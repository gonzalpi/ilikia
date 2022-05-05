import React, { Fragment } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
    loaderUrl: "webGL/pencil/WebBuild.loader.js",
    dataUrl: "webGL/pencil/WebBuild.data",
    frameworkUrl: "webGL/pencil/WebBuild.framework.js",
    codeUrl: "webGL/pencil/WebBuild.wasm",
    webglContextAttributes: {
        preserveDrawingBuffer: true,
    },
});

function Pencil(){
     // When the component is mounted, we'll register some event listener.
    useEffect(() => {
        unityContext.on("canvas", handleOnUnityCanvas);
        unityContext.on("progress", handleOnUnityProgress);
        unityContext.on("loaded", handleOnUnityLoaded);
        unityContext.on("RotationDidUpdate", handleOnUnityRotationDidUpdate);
        unityContext.on("ClickedPosition", handleOnUnityClickedPosition);
        unityContext.on("Say", handleOnUnitySayMessage);
    }, []);
    return(
        <Fragment>
            <div className="wrapper">
                <h1>React Unity WebGL Tests</h1>
                <Fragment>
                    <div className="unity-container">
                        {/* The Unity app will be rendered here. */}
                        <Unity className="unity-canvas" unityContext={unityContext} />
                    </div>
                </Fragment>
                <h6>
                    Made with love by Alyx
                </h6>
            </div>
        </Fragment>
        );
    }
export default Pencil;
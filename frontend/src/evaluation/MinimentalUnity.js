import React from "react"
import Unity, { UnityContext } from "react-unity-webgl"

const unityContext = new UnityContext({
  loaderUrl: "unityweb/WebBuild.loader.js",
  dataUrl: "unityweb/WebBuild.data",
  frameworkUrl: "unityweb/WebBuild.framework.js",
  codeUrl: "unityweb/WebBuild.wasm",
})

export default function MinimentalUnity() {
    return (
        <div
            style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
            }}>
            <Unity unityContext={unityContext} width="100%" height="100%" />
        </div>
    )
}
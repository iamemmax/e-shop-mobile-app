import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function Filtericon(props: any) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 50 50"
            fill="none"
            {...props}
        >
            <Circle cx={25} cy={25} r={25} fill="#000" />
            <Path
                opacity={0.4}
                d="M23.275 28.661h-5.918c-.749 0-1.357.598-1.357 1.333s.608 1.334 1.357 1.334h5.918c.749 0 1.357-.599 1.357-1.334 0-.735-.608-1.333-1.357-1.333zM34 20.041c0-.735-.608-1.332-1.356-1.332h-5.918c-.749 0-1.357.597-1.357 1.332 0 .736.608 1.333 1.357 1.333h5.918c.748 0 1.356-.597 1.356-1.333z"
                fill="#fff"
            />
            <Path
                d="M22.19 20.04c0 1.68-1.385 3.042-3.095 3.042-1.709 0-3.095-1.361-3.095-3.041S17.386 17 19.095 17c1.71 0 3.095 1.362 3.095 3.04zM34 29.96c0 1.679-1.385 3.04-3.095 3.04-1.709 0-3.095-1.361-3.095-3.04 0-1.68 1.386-3.042 3.095-3.042 1.71 0 3.095 1.362 3.095 3.042z"
                fill="#fff"
            />
        </Svg>
    )
}

export default Filtericon

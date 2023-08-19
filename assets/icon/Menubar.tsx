import * as React from "react"
import Svg, { Circle, Rect } from "react-native-svg"


function Menubar(props: any) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={35}
            height={35}
            viewBox="0 0 35 35"
            fill="none"
            {...props}
        >
            <Circle cx={17.5} cy={17.5} r={17.5} fill="#000" />
            <Rect
                x={9}
                y={17.1426}
                width={17.1429}
                height={1.71429}
                rx={0.857143}
                fill="#fff"
            />
            <Rect
                x={9}
                y={22.2861}
                width={10.2857}
                height={1.71429}
                rx={0.857143}
                fill="#fff"
            />
            <Rect
                x={15.8569}
                y={12}
                width={10.2857}
                height={1.71429}
                rx={0.857143}
                fill="#fff"
            />
        </Svg>
    )
}

export default Menubar

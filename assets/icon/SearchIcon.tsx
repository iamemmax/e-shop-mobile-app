import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchIcon(props: any) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            {...props}
        >
            <Path
                d="M8.482 15.964A7.482 7.482 0 108.482 1a7.482 7.482 0 000 14.964zM13.685 14.074L16.62 17"
                stroke="#000"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default SearchIcon

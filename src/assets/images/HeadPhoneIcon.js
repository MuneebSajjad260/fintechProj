import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { scale } from "../../shared/utils/scale"

function HeadPhoneIconPending({height, width, color, micColor}) {
  return (
    <Svg
      width={width || scale(32)}
      height={height || scale(32)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M23.875 21.625a1.125 1.125 0 00-1.125 1.125v1.125a3.375 3.375 0 01-2.497 3.244A3.375 3.375 0 0017.125 25h-2.25a3.375 3.375 0 000 6.75h2.25a3.367 3.367 0 003.197-2.346A5.624 5.624 0 0025 23.875V22.75a1.125 1.125 0 00-1.125-1.125zm-6.75 7.875h-2.25a1.125 1.125 0 110-2.25h2.25a1.125 1.125 0 110 2.25z"
        fill={micColor || "#EBB542"}
      />
      <Path
        d="M26.125 10.375H25V9.25a9 9 0 10-18 0v1.125H5.875A5.632 5.632 0 00.25 16v2.25a5.632 5.632 0 005.625 5.625h2.25A1.125 1.125 0 009.25 22.75V9.25a6.75 6.75 0 0113.5 0v13.5a1.125 1.125 0 001.125 1.125h2.25a5.632 5.632 0 005.625-5.625V16a5.632 5.632 0 00-5.625-5.625zM7 21.625H5.875A3.375 3.375 0 012.5 18.25V16a3.375 3.375 0 013.375-3.375H7v9zm22.5-3.375a3.375 3.375 0 01-3.375 3.375H25v-9h1.125A3.375 3.375 0 0129.5 16v2.25z"
        fill={color || "#202020"}
      />
    </Svg>
  )
}

export default HeadPhoneIconPending

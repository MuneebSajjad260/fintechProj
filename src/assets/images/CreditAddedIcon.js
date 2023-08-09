import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { scale } from "../../shared/utils/scale"

function CreditAddedIcon({stroke, width, height}) {
  return (
    <Svg
      width={scale(83, true) || width}
      height={scale(102) || height}
      viewBox="0 0 83 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M75.524 10.785l-11.309-5.98a8.552 8.552 0 00-8.538 0L7.474 32.542a8.552 8.552 0 00-4.287 7.412v44a8.55 8.55 0 004.28 7.406l11.308 6.102a8.558 8.558 0 008.559 0l48.21-27.866a8.558 8.558 0 004.28-7.405V18.197a8.544 8.544 0 00-4.287-7.412"
        fill="#000"
        strokeWidth={1}
        stroke={stroke}
      />
      <Path
        d="M76.216 19.279c0-1.714-1.337-2.338-2.983-1.392L27.011 44.395c-1.645.947-2.983 3.1-2.976 4.814l.041 41.99c0 1.715 1.345 2.339 2.983 1.392l46.222-26.515c1.646-.946 2.976-3.099 2.976-4.813l-.048-41.99.007.006z"
        fill="#fff"
      />
      <Path
        d="M40.797 63.744l7.44 5.815 13.092-24.52"
        stroke="#0129FA"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M52.07 34.514C41.504 40.727 32.952 54.9 32.966 66.18c.014 11.272 8.593 15.38 19.16 9.168 10.568-6.213 19.12-20.386 19.106-31.665-.013-11.273-8.592-15.38-19.16-9.168"
        stroke="#0129FA"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CreditAddedIcon

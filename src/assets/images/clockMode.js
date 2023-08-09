import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function clockMode({stroke}) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
     
    >
      <G clipPath="url(#clip0_8322_26033)">
        <Path
          d="M12.228 2.094c-5.653 0-10.251 4.555-10.251 10.156 0 5.6 4.598 10.156 10.25 10.156 5.654 0 10.252-4.555 10.252-10.156 0-5.6-4.598-10.156-10.251-10.156zm0 1.354c4.915 0 8.884 3.932 8.884 8.802 0 4.87-3.97 8.802-8.884 8.802a8.947 8.947 0 01-3.402-.667 8.878 8.878 0 01-2.884-1.908 8.786 8.786 0 01-1.925-2.857 8.72 8.72 0 01-.674-3.37c0-4.87 3.97-8.802 8.885-8.802zm-.011 2.031a.689.689 0 00-.625.428.673.673 0 00-.048.26v6.083c0 .18.072.352.2.479a.687.687 0 00.484.198h6.14a.686.686 0 00.483-.198.674.674 0 000-.958.686.686 0 00-.483-.198H12.91V6.167a.67.67 0 00-.427-.638.689.689 0 00-.267-.05z"
          fill={stroke}
         fillOpacity={0.7}
         // stroke={stroke}
          //strokeWidth={1}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_8322_26033">
          <Path
            fill="#fff"
            transform="translate(.625 .734)"
            d="M0 0H21.8692V21.6666H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default clockMode
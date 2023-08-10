import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DayPassPaymentProof({stroke}) {
  return (
    <Svg
      width={28}
      height={35}
      viewBox="0 0 28 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      
    >
      <Path
        d="M25.48 3.514l-3.814-2.071a2.819 2.819 0 00-2.88 0l-16.262 9.61a2.98 2.98 0 00-1.446 2.57V28.87c0 1.06.55 2.036 1.444 2.566l3.815 2.115a2.82 2.82 0 002.887 0l16.264-9.657a2.981 2.981 0 001.443-2.566V6.083c0-1.06-.55-2.041-1.446-2.569"
        fill="#000"
        stroke={stroke}
        strokeWidth={1}
      />
      <Path
        d="M25.713 6.456c0-.594-.451-.81-1.007-.483L9.113 15.16c-.555.328-1.006 1.074-1.004 1.668l.014 14.552c0 .594.454.81 1.007.482l15.592-9.188c.556-.328 1.005-1.074 1.005-1.668L25.71 6.453l.003.003z"
        fill="#fff"
      />
      <Path
        d="M22.864 18.773c.213-.126.386-.024.386.228l.005 1.941c0 .601-.386 1.323-.863 1.606l-10.12 6c-.478.283-.867.024-.869-.577l-.005-1.942c0-.252.172-.558.385-.684.212-.126.386-.024.386.228l.005 1.941c0 .107.057.148.097.124l10.119-6c.037-.021.095-.128.095-.237l-.005-1.942a.88.88 0 01.386-.686h-.002z"
        fill="#000"
      />
      <Path
        d="M17.296 13.039c.014-.01.03-.017.047-.024l.275-.007 2.734 1.599c.178.104.178.442 0 .756a.955.955 0 01-.319.346c-.113.07-.231.086-.322.034l-1.959-1.146.023 8.402c0 .297-.201.656-.451.803-.25.148-.454.031-.456-.266l-.023-8.402-1.946 3.46a.936.936 0 01-.319.347c-.116.069-.231.085-.321.033-.178-.104-.178-.442 0-.755l2.716-4.833.034-.057.222-.248a.33.33 0 01.065-.042z"
        fill="#000"
      />
    </Svg>
  )
}

export default DayPassPaymentProof

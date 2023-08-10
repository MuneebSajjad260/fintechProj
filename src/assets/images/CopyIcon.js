import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CopyIcon(props) {
  return (
    <Svg
      width={18}
      height={21}
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.635 3.975v10.692a4.167 4.167 0 003.894 4.158l.273.008h7.357a2.5 2.5 0 01-2.357 1.667H5.97a5 5 0 01-5-5V6.333a2.5 2.5 0 011.666-2.358zM15.135.5a2.5 2.5 0 012.5 2.5v11.667a2.5 2.5 0 01-2.5 2.5H6.802a2.5 2.5 0 01-2.5-2.5V3a2.5 2.5 0 012.5-2.5h8.333z"
        fill="#0129FA"
      />
    </Svg>
  );
}

export default CopyIcon;

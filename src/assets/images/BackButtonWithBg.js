import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {scale} from '../../shared/utils/scale';

function BackButtonWithBg({fill, width, height, bgFill}) {
  return (
    <Svg
      width={width || scale(26, true)}
      height={height || scale(26)}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        opacity={0.2}
        x={0.015625}
        y={0.664062}
        width={25.0039}
        height={25.0039}
        rx={6}
        fill={bgFill}
      />
      <Path
        d="M20.742 12.167H8.12l4.531-4.53-1.42-1.41-6.94 6.94 6.95 6.95 1.41-1.41-4.53-4.54h12.622v-2z"
        fill={fill || "#fff"}
      />
    </Svg>
  );
}

export default BackButtonWithBg;

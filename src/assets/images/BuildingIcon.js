import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BuildingIcon({height, width, color}) {
  return (
    <Svg
      width={width || 18}
      height={height || 16}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.33 15.5c-.458 0-.85-.163-1.176-.49a1.605 1.605 0 01-.49-1.177V2.167c0-.459.163-.851.49-1.177C1.48.663 1.872.5 2.33.5h5c.458 0 .85.163 1.177.49.326.326.49.718.49 1.177v1.666h6.666c.458 0 .85.164 1.177.49.326.326.49.719.49 1.177v8.333c0 .459-.163.851-.49 1.177-.326.327-.719.49-1.177.49H2.331zm0-1.667h5v-1.666h-5v1.666zm0-3.333h5V8.833h-5V10.5zm0-3.333h5V5.5h-5v1.667zm0-3.334h5V2.167h-5v1.666zm6.667 10h6.667V5.5H8.997v8.333zm1.667-5V7.167h3.333v1.666h-3.333zm0 3.334V10.5h3.333v1.667h-3.333z"
        fill={color || '#35D7A1'}
      />
    </Svg>
  );
}

export default BuildingIcon;
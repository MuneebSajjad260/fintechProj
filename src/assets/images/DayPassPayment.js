import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DayPassPayment({stroke}) {
  return (
    <Svg
      width={28}
      height={35}
      viewBox="0 0 28 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    
    >
      <Path
        d="M25.48 3.522L21.667 1.45a2.819 2.819 0 00-2.88 0L2.523 11.062a2.98 2.98 0 00-1.446 2.568v15.248c0 1.06.55 2.036 1.444 2.566l3.815 2.115a2.82 2.82 0 002.887 0l16.264-9.657a2.981 2.981 0 001.443-2.566V6.09c0-1.06-.55-2.041-1.446-2.569"
        fill="#000"
        stroke={stroke}
        strokeWidth={1}
      />
      <Path
        d="M25.713 6.456c0-.594-.451-.81-1.007-.483L9.113 15.16c-.555.328-1.006 1.074-1.004 1.668l.014 14.552c0 .594.454.81 1.007.482l15.592-9.188c.556-.328 1.005-1.074 1.005-1.668L25.71 6.453l.003.003z"
        fill="#fff"
      />
      <Path
        d="M18.46 15.657c-.404-.066-.81-.135-.812-.668 0-.285.084-.596.234-.876.111-.207.257-.395.428-.542v-.252c0-.2.134-.442.303-.542.169-.1.306-.019.308.176v.252c.171-.06.32-.043.433.036.155.1.24.313.242.594 0 .2-.136.444-.305.544-.169.1-.305.019-.308-.178 0-.103-.027-.176-.074-.21-.039-.023-.092-.023-.16.017l-.131.079-.125.073a.486.486 0 00-.167.178.607.607 0 00-.07.283c0 .145.265.185.528.23.41.067.817.136.82.675 0 .286-.084.597-.234.875a1.854 1.854 0 01-.428.537v.252a.685.685 0 01-.303.541c-.17.1-.306.02-.308-.178v-.252c-.174.06-.32.046-.435-.028-.153-.1-.24-.309-.24-.592a.7.7 0 01.302-.544c.17-.1.306-.019.308.18 0 .096.026.17.072.2.04.024.1.017.169-.023l.125-.074.125-.074a.448.448 0 00.17-.178.607.607 0 00.07-.276c0-.147-.268-.192-.537-.235zM19.946 21.46c.21-.125.384-.025.384.224 0 .25-.168.551-.38.677l-5.394 3.22c-.21.126-.384.026-.384-.223 0-.25.169-.552.38-.68l5.394-3.217zM16.168 21.176c-.213.126-.384.026-.387-.221 0-.25.171-.554.38-.677l3.78-2.255c.21-.126.384-.024.384.223 0 .25-.169.551-.38.677l-3.78 2.253h.003zM14.556 23.862c-.21.124-.384.024-.384-.223a.88.88 0 01.38-.68l5.394-3.217c.213-.126.384-.026.384.223a.872.872 0 01-.38.677l-5.394 3.22z"
        fill="#000"
      />
      <Path
        d="M22.201 10.275l.058 10.92c.003.497-.169 1.051-.446 1.545-.273.492-.657.927-1.078 1.179l-6.927 4.13c-.423.252-.807.275-1.087.114-.28-.162-.454-.511-.456-1.008l-.046-8.867c0-.138.05-.29.13-.419l2.84-5.092 5.47-3.395c.423-.252.807-.278 1.084-.116.28.161.456.513.458 1.01zm-.93 12.152c.137-.247.225-.528.223-.777l-.058-10.92c0-.25-.093-.424-.23-.507-.14-.083-.335-.066-.545.057l-4.82 2.875.017 2.958a.872.872 0 01-.38.678l-2.496 1.49.044 8.418c0 .247.088.425.23.506.14.076.335.067.545-.06l6.927-4.131c.21-.126.402-.345.543-.592m-6.188-8.179l-1.569 2.814 1.58-.944-.009-1.87"
        fill="#000"
      />
    </Svg>
  );
}

export default DayPassPayment;

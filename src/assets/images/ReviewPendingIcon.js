import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ReviewPendingIcon(props) {
  return (
    <Svg
      width={122}
      height={148}
      viewBox="0 0 122 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // {...props}
    >
      <Path
        d="M110.128 14.8l-16.49-8.72a12.47 12.47 0 00-12.45 0l-70.29 40.45a12.474 12.474 0 00-6.25 10.81v64.169c0 4.46 2.38 8.57 6.24 10.8l16.49 8.9c3.86 2.23 8.62 2.23 12.48 0l70.3-40.64a12.48 12.48 0 006.24-10.8V25.61c0-4.46-2.38-8.59-6.25-10.81"
        fill="#000"
        stroke={props.stroke}
        strokeWidth={2}
      />
      <Path
        d="M111.137 27.182c0-2.5-1.95-3.41-4.35-2.03l-67.4 38.66c-2.4 1.38-4.35 4.52-4.34 7.02l.06 61.24c0 2.5 1.96 3.41 4.35 2.03l67.4-38.67c2.4-1.38 4.34-4.52 4.34-7.02l-.07-61.24.01.01z"
        fill="#fff"
      />
      <Path
        d="M87.306 97.551c-.26.15-.47.51-.47.81v2.33c0 .3.22.42.48.27.26-.15.48-.52.48-.82v-2.33c0-.3-.22-.42-.49-.27v.01zm-.21 3.24s.06.02.1.02c-.04 0-.07 0-.1-.02zm.22-.02zM92.553 71.715c.08 0 .16-.02.24-.07.16-.09.32-.28.41-.51l1.01-2.61c.06-.16.08-.31.04-.44a.265.265 0 00-.22-.21c-.07 0-.16.02-.24.06-.16.09-.32.29-.41.51l-1.01 2.6c-.06.16-.08.32-.04.44.03.13.11.2.22.21v.02zm1.51-3.19l-1 2.6c-.03.07-.07.14-.11.19.05-.06.09-.12.11-.19l1-2.6c.04-.1.05-.2.04-.29.02.09 0 .19-.04.29zm-1.57 2.84s.03.07.05.1c.02.02.05.03.09.03.05 0 .1 0 .16-.04-.05.03-.11.05-.16.04-.04 0-.07-.01-.09-.03a.187.187 0 01-.05-.1zM96.745 74.016l.13-.05c.08-.04.16-.12.23-.21l1.75-2.18c.11-.13.19-.3.22-.46.04-.16.02-.3-.05-.38-.08-.13-.24-.13-.41-.04-.08.05-.16.12-.24.21l-1.75 2.18c-.23.28-.3.66-.17.84.06.09.17.12.29.09zM98.894 85.713l-1.76-.15c-.07 0-.15.01-.23.06a.77.77 0 00-.13.09c-.12.11-.23.26-.29.42-.13.34-.05.62.18.64l1.76.15c.08 0 .16-.01.24-.06.16-.09.32-.28.41-.51.07-.16.08-.32.05-.44s-.11-.2-.22-.2h-.01zm-1.84.06l-.15.04.15-.04zm-.3.79c-.11 0-.17-.12-.15-.26-.01.14.04.25.15.26l1.76.15-1.76-.15zm2.1-.07s.06-.1.08-.15v-.03.03c-.02.05-.04.1-.08.15zM77.804 96.666s-.09.03-.13.06c-.08.05-.16.12-.23.21l-1.76 2.18c-.11.13-.18.3-.21.45-.04.16-.02.3.04.39.07.09.17.12.29.08l.12-.05a.93.93 0 00.24-.21l1.75-2.18c.11-.13.19-.3.22-.46.03-.16.02-.3-.05-.38a.279.279 0 00-.29-.09h.01zm-1.72 2.99l1.75-2.18s.02-.04.04-.06a.21.21 0 01-.04.06l-1.75 2.18zm1.89-2.47s0 .03-.01.04c0-.01.01-.03.01-.04a.33.33 0 000-.14v.14zM87.23 73.133c.26-.15.48-.52.48-.82v-2.33c0-.3-.22-.42-.49-.27-.26.15-.47.51-.47.81v2.33c0 .3.22.42.48.27v.01zm-.31-2.7v2.33c0 .19.14.27.31.17-.17.1-.3.02-.31-.17v-2.33zM100.391 77.22l-2.02 1.17c-.26.15-.48.52-.48.82 0 .3.22.42.48.27l2.02-1.17c.26-.15.48-.52.48-.82 0-.3-.22-.42-.48-.27zm-2.02 2.06c-.13.07-.24.05-.29-.05.05.1.16.12.29.05l2.02-1.17-2.02 1.17zM75.65 84.976l1.76.15c.07 0 .16-.01.23-.06l.13-.09c.12-.1.22-.26.29-.42.07-.16.08-.32.05-.44s-.11-.2-.22-.2l-1.76-.15c-.07 0-.15.02-.23.06a.47.47 0 00-.12.09c-.13.11-.23.26-.29.42-.06.16-.08.32-.04.44.03.12.11.2.22.2h-.02zm2.08-.16s-.05.05-.08.06c.03-.02.05-.04.08-.06zm-2.14-.18c.02.08.07.12.14.13-.07 0-.12-.05-.14-.13zM93.264 92.665c-.09-.12-.25-.12-.42-.03-.08.05-.16.11-.23.2-.11.14-.18.3-.21.46-.04.16-.02.29.04.39l1.02 1.43c.09.12.25.13.41.04.08-.05.16-.12.24-.21.11-.14.18-.3.21-.45.04-.16.02-.3-.04-.39l-1.02-1.44zm.34 2.28l-1.01-1.43c-.04-.06-.05-.15-.04-.25-.02.1 0 .19.04.25l1.01 1.43c.06.08.16.08.27.02-.11.06-.21.06-.27-.02zM81.997 98.977c-.07 0-.15.02-.23.06-.04.02-.09.06-.13.1-.12.1-.22.25-.29.41l-1.01 2.61c-.06.16-.08.31-.05.44.04.12.11.19.22.2.08 0 .16-.01.24-.06.16-.09.32-.29.41-.51l1.01-2.6c.06-.16.08-.32.04-.44-.03-.13-.11-.2-.22-.21h.01zm-.5.58c.02-.06.07-.11.11-.16-.04.05-.09.1-.11.16l-1.01 2.61 1.01-2.61zm.56-.07s0-.03.01-.04c0 .01 0 .03-.01.04zM76.652 91.475c0-.3-.22-.42-.48-.27l-2.03 1.17c-.26.15-.47.51-.47.81 0 .3.22.42.47.27l2.03-1.17c.26-.15.48-.52.48-.82v.01zm-2.72 1.82s.06.02.1.02c-.04 0-.07 0-.1-.02zm.22-.02s-.05.02-.08.03c.03 0 .05-.01.08-.03l2.03-1.17-2.03 1.17zM81.575 78.097l.13-.05c.08-.05.16-.11.23-.2.11-.14.19-.3.22-.46.04-.16.02-.29-.04-.39l-1.02-1.43c-.09-.12-.25-.13-.41-.03-.08.05-.16.12-.24.21-.11.14-.18.3-.22.46-.03.16-.01.29.05.38l1.02 1.44c.07.09.17.12.29.08l-.01-.01zm-.89-2.38c.05-.03.11-.05.15-.04-.05 0-.1.01-.15.04l-.07.06.07-.06zm-.3.43c-.02.11 0 .2.03.25l1.02 1.44-1.02-1.44c-.04-.05-.05-.14-.03-.25z"
        fill="#0129FA"
      />
      <Path
        d="M102.242 71.326c-1.97-6.06-7.67-7.87-14.2-4.5-.28.15-.56.3-.84.46-.2.11-.4.23-.59.35-6.65 4.12-12.43 12.57-14.39 21.04-1.32 5.72-.78 10.59 1.54 13.7.29.4.62.77.97 1.09 2.81 2.65 7.07 2.81 11.69.43.07-.03.41-.21.88-.48.3-.17.6-.35.89-.54 4.86-3.11 9.23-8.46 12.01-14.68 2.76-6.19 3.51-12.3 2.06-16.87h-.02zm-1.88 16.08c2.45-5.86 3.1-11.61 1.72-15.94v.01c1.39 4.28.74 10.05-1.72 15.93zm-24.85 13.97a8.402 8.402 0 01-1.47-2.29c.39.87.88 1.64 1.47 2.29.35.38.73.71 1.13 1-.4-.28-.78-.62-1.13-1zm11.78.16c-.11.06-.21.12-.32.18-3.94 2.17-7.57 2.34-10.21.46-.4-.29-.77-.62-1.11-.99-2.35-2.57-3.08-7.03-2-12.24 1.6-7.75 6.81-15.55 12.97-19.42.21-.13.41-.25.63-.38.25-.14.52-.29.79-.43 2.23-1.14 4.36-1.62 6.31-1.42 4.29.44 6.96 4.25 6.97 9.94.03 8.92-6.27 19.83-14.03 24.31v-.01zm-12.86-16c.52-1.52 1.16-3.02 1.9-4.47-.75 1.45-1.39 2.95-1.9 4.47zm18.5-18.48c-.26.02-.53.04-.8.08.27-.04.54-.07.8-.08zm-5.7 1.89c.26-.15.53-.29.8-.43-.27.14-.54.29-.81.44l.01-.01zm.8-1.93c.52-.27 1.04-.49 1.54-.7-.51.2-1.02.43-1.54.7zm-15.66 21.6l.03-.14-.03.14zm14.42 14.88c-.11.06-.21.11-.28.15.06-.03.16-.09.28-.15z"
        fill="#0129FA"
      />
      <Path
        d="M93.415 81.791c0-.56-.4-.78-.88-.5l-4.38 2.53-.02-8.27c0-.56-.4-.78-.89-.5-.48.28-.88.96-.87 1.51l.03 10.29 6.14-3.54c.48-.28.88-.96.87-1.51v-.01zm-.6-.41c-.09 0-.18.04-.28.1.1-.06.19-.09.28-.1zm-5.57-6.14c.1-.06.19-.09.28-.1-.09 0-.18.04-.28.1zm-.27.22s-.04.05-.06.08c.02-.03.04-.06.06-.08zm-.4 11.1l-.03-10.1.03 10.1 5.97-3.45c.2-.11.37-.31.5-.53-.13.22-.31.42-.5.53l-5.97 3.45zM58.913 100.057c.16.09.36.06.57-.06.2-.12.41-.32.56-.59l3.94-6.82c.31-.54.31-1.12 0-1.3-.16-.09-.36-.06-.56.06-.2.12-.41.33-.56.59l-2.93 5.08c-.12.21-.29.38-.45.47-.16.09-.32.12-.45.05l-.67-.38c-.15-.09-.36-.05-.57.06-.21.12-.41.33-.56.59-.31.54-.31 1.12 0 1.3l1.68.96v-.01zm.12-.21l-1.68-.96 1.68.96c.06.04.13.05.21.04-.08 0-.15 0-.21-.04zm5.01-7.91v-.04.04zm-4.27 5.5c-.1.1-.2.18-.3.24-.03.02-.05.02-.08.03.03-.01.05-.01.08-.03.1-.06.2-.14.3-.24zm-1.98-.03a.59.59 0 01.24-.09c-.08 0-.16.04-.24.09zM81.165 70.33V68.5l-12.11 6.99v1.83l12.11-6.99zm-.17-1.54l-11.77 6.8 11.77-6.8zM81.157 66.752v-1.83l-12.11 6.99.01 1.83 12.1-6.99zM81.141 63.166v-1.83l-12.11 6.99v1.83l12.11-6.99zm-11.95 5.26v1.45-1.45zM69.023 64.74v1.83l12.11-6.99v-1.83l-12.11 6.99zm.17 1.54l11.77-6.8-11.77 6.8zM55.753 85.307l9.63-5.56c.56-.32 1.02-1.12 1.02-1.76l-.03-11.07c0-.64-.46-.91-1.02-.58l-9.63 5.56c-.56.32-1.02 1.12-1.02 1.76l.03 11.07c0 .64.46.91 1.02.58zm.54-11.24c0-.37.26-.82.58-1.01l7.32-4.22c.32-.19.59-.04.59.33l.02 8.41c0 .37-.26.82-.58 1.01l-7.32 4.22c-.32.19-.59.04-.59-.33l-.02-8.41z"
        fill="#0129FA"
      />
      <Path
        d="M72.694 103.243c-.12-.17-.34-.19-.58-.05l-19.24 11.11c-.62.36-1.12.07-1.13-.64l-.13-45.29c0-.76.53-1.69 1.2-2.07l23.77-13.72c1.32-.76 2.56-.88 3.48-.36l5.26 3c.75.43 1.18 1.34 1.18 2.57l.02 7.96c0 .42.3.58.67.37.08-.05.17-.1.26-.14.17-.1.34-.28.46-.49.12-.22.2-.45.2-.66l-.02-8.02c0-1.67-.58-2.92-1.61-3.51l-5.09-2.9c-1.36-.78-3.18-.59-5.1.52l-24.25 14c-1.12.65-2.03 2.22-2.02 3.5l.13 46.47c0 1.56 1.11 2.18 2.45 1.41l19.66-11.35c.24-.14.46-.41.58-.72.12-.31.11-.59 0-.76-.05-.07-.1-.14-.15-.22v-.01zm-.33.07zm-19.99 11.35h.04-.04zm26.61-62.98c.44.02.84.13 1.2.33-.36-.21-.77-.32-1.2-.33zm7.75 14.16a.397.397 0 01-.04-.2l-.02-7.96.02 7.96c0 .08.01.14.04.2.05.11.15.16.26.15-.12 0-.21-.05-.26-.15zm-36.41 48.94c0 .36.07.67.18.92-.12-.25-.18-.56-.18-.92zm.4 1.24c.32.35.8.46 1.36.29-.56.17-1.04.06-1.36-.29z"
        fill="#0129FA"
      />
      <Path
        d="M55.816 105.347l9.63-5.56c.56-.32 1.02-1.11 1.02-1.75l-.03-11.07c0-.64-.46-.9-1.02-.58l-9.63 5.56c-.56.32-1.02 1.11-1.02 1.75l.03 11.07c0 .64.46.9 1.02.58zm.54-11.24c0-.37.26-.82.58-1l7.32-4.22c.32-.19.59-.04.59.33l.02 8.41c0 .37-.26.82-.58 1.01l-7.32 4.22c-.32.19-.59.04-.59-.33l-.02-8.41v-.01zM58.85 80.01c.16.09.36.06.57-.06.2-.12.41-.32.56-.59l3.94-6.82c.31-.54.31-1.12 0-1.3-.16-.09-.36-.06-.56.06-.2.12-.41.33-.56.59l-2.93 5.08c-.12.21-.29.38-.45.47-.16.09-.32.12-.45.05l-.67-.38c-.15-.09-.36-.05-.57.06-.21.12-.41.33-.56.59-.31.54-.31 1.11 0 1.29l1.68.97v-.01zm-1.57-2.19c.03-.06.08-.1.12-.16-.04.05-.08.1-.12.16-.12.21-.19.43-.19.62s.06.34.19.41l1.68.96c.06.03.13.05.21.04-.08 0-.15 0-.21-.04l-1.68-.96c-.13-.07-.19-.22-.19-.41 0-.19.06-.41.19-.62z"
        fill="#0129FA"
      />
    </Svg>
  )
}

export default ReviewPendingIcon

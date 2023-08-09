import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function ExploreScreenLogo({stroke}) {
  return (
    <Svg
      width={160}
      height={92}
      viewBox="0 0 160 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
     
    >
      <G clipPath="url(#clip0_7755_104331)">
        <Path
          d="M93.132 50.539c-.046-5.677-2.094-8.083-6.145-5.767-.501.272-1.275.817-2.003 1.362l-.046-6.221c0-.409-.228-.59-.5-.454l-2.914 1.68c-.273.136-.5.59-.5.999l.227 25.248c0 .59.091.772.774.636 1.365-.273 3.277-.954 5.143-1.999 3.915-2.225 6.055-6.856 5.963-12.669V50.54zm-6.009 10.716c-.82.454-1.502.772-2.003.909l-.136-11.262c.591-.454 1.41-.954 2.003-1.317 1.73-.999 2.184.636 2.184 3.179l.046 2.815c.045 2.543-.364 4.677-2.094 5.676z"
          fill="#000"
          stroke={stroke}
          strokeWidth={1}
        />
        <Path
          d="M94.5 25.564L51.848 1.088a5.98 5.98 0 00-5.917 0L3.279 25.564A5.91 5.91 0 00.32 30.695v30.47a5.91 5.91 0 002.96 5.131l42.65 24.567c1.821 1.044 4.097 1.044 5.964 0l42.651-24.567a5.91 5.91 0 002.959-5.131v-30.47a6.168 6.168 0 00-3.004-5.131z"
          stroke={stroke}
          strokeWidth={1.329}
          strokeMiterlimit={10}
      
        
        />
        <Path
          d="M78.884 61.574c.091 8.446-4.142 11.58-5.69 12.442l-.318.181c-1.502.863-5.781 2.634-5.872-5.857l-.137-11.08c0-.409.182-.863.455-1.045l2.96-1.68c.272-.136.5.091.5.5l.136 11.08c.046 3.405.774 3.814 1.912 3.133l.319-.182c1.138-.636 1.866-1.862 1.82-5.267l-.136-11.035c0-.409.228-.863.5-1.044l2.96-1.68c.273-.137.455.09.455.5l.136 11.034zM64.776 77.739c0 .408-.228.863-.5.999l-2.96 1.68c-.273.136-.5-.045-.5-.454l-.137-12.579c-.045-2.043-.592-2.543-2.14-1.68-.727.409-1.456.954-1.956 1.408l.136 15.121c0 .41-.228.863-.5 1.045l-2.914 1.68c-.273.136-.5-.09-.5-.454l-.274-26.156c0-.409.228-.863.501-1l2.959-1.68c.273-.136.5.046.5.455l.046 6.448c.637-.59 1.502-1.317 2.458-1.862 3.733-2.134 5.553-.363 5.599 4.45l.182 12.579zM110.341 29.15c.774-1.045 1.183-2.362 1.183-3.724V25.2c0-1.226-.318-2.043-1.001-2.452-.774-.454-1.912-.318-3.505.545-.865.454-1.73.999-2.094 1.226-.273.181-.455.545-.455.908v13.487c0 .318.091.5.273.636.045.045.182.09.319.09.091 0 .182 0 .273-.045.637-.227 1.411-.59 2.139-.954 2.686-1.407 4.097-3.633 4.097-6.493v-.318c0-1.135-.273-1.953-.774-2.452-.137-.091-.273-.182-.455-.227zm-.364-3.406c0 1.68-.729 2.86-2.14 3.633l-1.775.953v-4.54a.952.952 0 00.273-.182c.364-.227.774-.454 1.184-.681 1.092-.545 1.775-.772 2.139-.545.228.136.364.545.364 1.18l-.045.182zm-3.961 6.448l2.231-1.18c.637-.318 1.092-.41 1.365-.273.274.136.41.681.41 1.408v.318c0 2.633-1.502 3.769-3.004 4.54-.41.228-.683.364-1.002.5v-5.313zM115.296 33.509c.82.5 1.73.09 2.367-.227.273-.136.683-.409 1.047-.636-.091 1.68-.546 2.18-1.638 2.77-.82.454-1.73.727-2.003.817l-.137.046c-.318.181-.501.454-.501.817v.091c0 .09 0 .409.228.59.091.091.228.136.364.136.091 0 .137 0 .228-.045.273-.09 1.229-.409 2.23-.908 1.684-.908 2.731-2.134 2.731-5.45v-9.944c0-.272-.136-.545-.318-.636a.55.55 0 00-.638 0l-.045.046a1.105 1.105 0 00-.546.953v8.764c-.455.364-1.184.818-1.502 1-.501.272-.865.363-1.002.226-.136-.09-.501-.544-.501-2.497v-5.404c0-.272-.136-.545-.318-.636a.548.548 0 00-.637 0l-.046.046a1.105 1.105 0 00-.546.953v5.404c-.046 2.044.364 3.224 1.183 3.724zM110.927 44.685c-.182-.136-.41-.182-.592-.09h-.045c-.637.272-2.049.953-2.731 1.316-2.231 1.18-3.278 2.952-3.278 5.63v10.445c0 .318.137.59.41.772.136.09.273.09.41.09a.86.86 0 00.364-.09l.683-.363c.364-.182.591-.636.591-1.045v-5.903l3.915-2.043c.364-.182.592-.636.592-1.045v-.726a.892.892 0 00-.41-.772c-.228-.137-.501-.137-.774 0l-3.323 1.77v-1.68c0-1.316.182-1.725 1.366-2.36l2.64-1.409c.273-.136.455-.454.455-.862v-.954a.691.691 0 00-.273-.681zM114.207 45.498c.136.09.273.09.409.09a.857.857 0 00.364-.09l.683-.364c.364-.181.592-.635.592-1.044v-1.544a.892.892 0 00-.41-.772c-.227-.136-.5-.136-.774 0l-.682.363c-.365.182-.592.636-.592 1.045v1.544c0 .318.136.635.41.772zM114.207 57.762c.136.091.273.091.409.091a.857.857 0 00.364-.09l.683-.364c.364-.182.592-.636.592-1.044v-9.809a.892.892 0 00-.41-.772c-.227-.136-.5-.136-.774 0l-.682.363c-.365.182-.592.636-.592 1.045v9.808c0 .318.136.59.41.772zM123.493 44.05c.046.137.092.41.092.954v6.857c0 .364.136.636.409.772a.701.701 0 00.729 0l.728-.363c.364-.182.592-.59.592-1.045V44.37c0-1.499-.365-2.453-1.047-2.861-.592-.364-1.366-.318-2.231.136l-.956.5c-1.001.544-2.731 1.952-2.731 5.267v6.857c0 .363.137.636.41.772.136.09.227.09.364.09a.857.857 0 00.364-.09l.728-.363c.365-.182.592-.59.592-1.045v-6.857c0-1.407.273-1.77.865-2.088l.956-.5c0-.09.091-.136.136-.136zM132.87 48.312c.364-.227.501-.59.501-.954v-.635a.758.758 0 00-.365-.681c-.182-.091-.455-.182-.819.045l-1.092.59c-.046.046-.091.046-.137.046v-6.585l1.821-.953c.364-.182.592-.59.592-1v-.635c0-.318-.137-.59-.365-.727-.227-.136-.5-.136-.773 0l-1.275.681V36.46c0-.318-.137-.636-.41-.772-.227-.136-.5-.136-.773 0l-.774.59c-.319.227-.501.636-.501 1v9.899c0 .817.091 1.907.819 2.361.228.136.456.182.729.182.5 0 1.001-.227 1.365-.409.638-.409 1.184-.817 1.457-.999zM141.106 33.101c-.5-.272-1.32-.5-2.503.137-2.049 1.09-3.369 3.769-3.369 6.902v1.362c0 1.998.456 3.224 1.366 3.77.273.135.592.272 1.092.272.456 0 1.002-.137 1.685-.454a15.404 15.404 0 002.458-1.635c.455-.363.5-.772.5-1.045v-.635c0-.409-.227-.636-.364-.681a.7.7 0 00-.728 0l-.137.09a17.777 17.777 0 01-2.276 1.454c-.318.181-.591.227-.728.136-.045-.046-.41-.318-.41-1.635l4.279-2.27c.364-.182.592-.59.592-1.09v-.818c-.046-1.998-.546-3.315-1.457-3.86zm-1.957 2.68c.228-.137.364-.137.455-.137h.091c.046 0 .319.227.364 1.499l-2.367 1.271c.137-1.271.683-2.225 1.457-2.633zM150.444 27.747c-.182-.136-.456-.181-.729-.09-.591.136-1.229.408-1.82.726-2.049 1.09-3.278 3.588-3.278 6.766v1.499c0 1.907.455 3.224 1.366 3.769.227.136.592.272 1.001.272.41 0 .865-.09 1.411-.408a9.667 9.667 0 001.821-1.181c.364-.273.501-.59.501-1.045v-.68c0-.319-.137-.546-.364-.682-.228-.136-.501-.136-.774 0l-.137.046c-.637.408-1.001.68-1.638.999-.274.136-.41.136-.456.09 0 0-.364-.227-.364-1.861v-1.499c0-1.862.455-3.088 1.411-3.542.638-.318 1.002-.5 1.639-.726l.137-.046c.318-.181.546-.545.546-.953v-.682c0-.181 0-.544-.273-.772zM158.819 23.794c-.683-.41-1.594-.364-2.686.227l-.683.408v-2.406a.891.891 0 00-.409-.772c-.228-.137-.501-.137-.774 0l-.683.363c-.41.227-.592.681-.592 1.044v13.669c0 .318.137.59.41.772.136.09.273.09.41.09a.86.86 0 00.364-.09l.682-.364c.365-.181.592-.635.592-1.044v-8.31c.364-.318.865-.636 1.275-.863.409-.227.637-.227.683-.181 0 0 .227.136.227 1.135v6.448c0 .318.137.59.41.772.227.136.501.136.774 0l.682-.363c.365-.182.592-.636.592-1.045v-6.448c-.091-1.544-.501-2.588-1.274-3.042zM108.06 72.928l-.864-.273c-1.23-.408-1.503-.68-1.503-1.498 0-1.408.683-2.407 2.322-3.27.41-.227.91-.408 1.365-.59.319-.136.547-.227.683-.272.319-.182.501-.455.501-.818v-.227c0-.318-.182-.5-.273-.545-.091-.09-.319-.181-.637-.045l-.274.09c-.546.228-1.183.455-1.82.818-2.322 1.226-3.46 2.997-3.505 5.222 0 2.044 1.183 2.588 2.503 3.043l.911.317c1.502.5 1.729.59 1.729 1.635 0 1.18-.273 2.725-2.321 3.77-.501.272-.911.408-1.366.59l-.682.272-.046.045.228.409-.274-.409c-.318.182-.5.454-.5.818v.227c0 .318.182.5.273.545.091.09.227.09.364.09.091 0 .182 0 .273-.045.091-.045.182-.09.319-.136.5-.182 1.092-.409 1.866-.817 2.276-1.227 3.46-3.134 3.46-5.767 0-2.135-1.229-2.68-2.732-3.18zM118.668 64.712c-.318.091-1.411.364-2.412.909-1.912.999-2.959 3.314-2.959 6.493v1.18c0 2.044.41 3.316 1.229 3.815.273.136.546.227.865.227.409 0 .819-.136 1.274-.363 1.002-.545 2.094-1.408 2.413-1.635.273-.227.364-.454.364-.817v-9.082c0-.136 0-.409-.228-.59-.136-.137-.318-.182-.546-.137zm-.774 9.582c-.364.272-1.047.772-1.638 1.09-.273.136-.638.272-.82.136-.227-.136-.546-.636-.546-2.543v-1.18c0-2.498.592-3.906 1.821-4.587a5.372 5.372 0 011.229-.5l-.046 7.584zM128.184 59.758c-.182-.091-.409-.136-.591 0l-.137.09c-.318.182-.501.591-.501.909v6.221c0 1.816-.546 3.088-1.638 3.633l-.273.136c-.182.09-.547.272-.729.136-.091-.045-.455-.363-.455-1.77V62.89c0-.272-.136-.545-.318-.636-.183-.09-.41-.136-.592 0l-.137.091c-.318.182-.501.59-.501.908v6.221c0 1.59.365 2.589 1.138 3.043.274.136.547.227.865.227.364 0 .774-.09 1.184-.318l.273-.136c1.32-.681 2.731-2.543 2.731-5.585v-6.222c0-.363-.136-.635-.319-.726zM136.967 51.13a.677.677 0 00-.592 0l-.136.091c-.319.182-.501.59-.501.909v3.405a9.378 9.378 0 00-1.639.682c-1.957 1.044-2.958 3.178-2.958 6.448v1.271c0 2.044.409 3.315 1.229 3.815.273.136.546.227.865.227.409 0 .819-.137 1.274-.364 1.001-.545 2.094-1.407 2.413-1.634.273-.228.364-.455.364-.818V51.857c0-.363-.091-.59-.319-.726zm-1.229 13.76c-.364.272-1.047.772-1.639 1.09-.273.136-.637.272-.819.136-.228-.136-.546-.636-.546-2.543V62.3c0-2.452.592-3.86 1.821-4.54.318-.182.773-.364 1.229-.546l-.046 7.675zM141.565 52.672c-.182-.136-.41-.136-.637 0l-.091.046c-.319.181-.501.59-.501.908v9.718c0 .272.137.5.319.636.091.045.227.09.318.09a.847.847 0 00.319-.09l.091-.046c.319-.182.501-.59.501-.908v-9.718c0-.227-.091-.5-.319-.636zM141.565 48.633c-.182-.136-.41-.136-.637 0l-.091.046c-.319.181-.501.59-.501.908v1.408c0 .272.137.5.319.636.091.045.227.09.318.09a.847.847 0 00.319-.09l.091-.046c.319-.182.501-.545.501-.908v-1.408c0-.272-.091-.5-.319-.636z"
          fill="#000"
          stroke={stroke}
          strokeWidth={1}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7755_104331">
          <Path fill="#fff" d="M0 0H160V92H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ExploreScreenLogo;

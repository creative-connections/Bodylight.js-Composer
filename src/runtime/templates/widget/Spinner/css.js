export default function css() {
  return `
    #spinner-blur {
      filter: blur(10px);
      transition: filter 0.3s ease-out;
    }

    #spinner {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(255, 255, 255, 0.5);
      transition: display 0.3s linear;
    }

    .lds-ring {
      display: inline-block;
      position: relative;
      width: 2vw;
      height: 2vh;
      position: absolute;
      left: 49vw;
      top: 49vh;
      z-index: 10;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 51px;
      height: 51px;
      margin: 6px;
      border: 6px solid #00b2ff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #00b2ff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
}
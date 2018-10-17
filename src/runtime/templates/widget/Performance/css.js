export default function css (output = true) {
  if (!output) {
    return ''
  }

  return `
    #performance {
      display: none;
    }
    #performance-btn {
      width: 10px;
      height: 10px;
      background-color: red;
    }
  `
}

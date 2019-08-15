export default function css (enabled) {
  if (!enabled) { return '' }

  return `
    #performance {
      display: none;
      min-width: 15em;
      min-height: 5em;
      position: absolute;
      top:1em;
      left:1em;

      background: #fff;
      box-shadow: 0 4px 16px rgba(0,0,0,.2);
      border: 1px solid rgba(0,0,0,.333);
    }

    #performance-btn {

      background-color: #eee;
      border: 1px solid rgba(0,0,0,.2);

      position:absolute;
      bottom:0;
      left:0;
      cursor: pointer;
    }

    #performance-header {
      transition: border-color 0.2s ease;
      box-sizing: border-box;
      background-color: #eee;
      border-bottom: 1px solid rgba(0,0,0,.2);
      height: 2em;
      line-height: 2em;
      margin: 0;
      vertical-align: middle;
      cursor: grab;
      padding-left: 1em;
    }

    #performance-header p {
      margin: 0;
      padding: 0;
      line-height: 2em;
      font-weight: 400;
    }

    #performance table {
      margin-top: 0.5em;
      width: 100%;
    }

    #performance td {
      padding: 0.1em;
    }

    #performance td.pwtd-name {

    }

    #performance td.pwtd-action {
      padding-left: 1em;
    }

    #performance td.pwtd-duration {
      text-align: right;
    }
  `
}

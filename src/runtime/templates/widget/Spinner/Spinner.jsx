export default class Spinner {
  hide() {
    document.getElementById('spinner-blur').style.filter = 'none'
    document.getElementById('spinner').style.display = 'none'
  }
}
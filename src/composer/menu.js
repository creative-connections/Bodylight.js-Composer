import {saveAs} from 'file-saver';
import {Bodylightapi} from './bodylightapi';
import {inject} from 'aurelia-framework';
@inject(Bodylightapi)

export class Menu {
  constructor(api) {
    this.api = api;
    this.opendialog = false;
  }

  new() {
    if (confirm('This will clear the entire design, continue?')) this.api.editor.runCommand('core:canvas-clear');
    //this.api.editor.runCommand('core:canvas-clear');
  }

  open() {
    this.opendialog = ! this.opendialog;
  }

  dragNdrop(event) {
    //const self = this;
    //let fileName = URL.createObjectURL(event.target.files[0]);
    const reader = new FileReader();
    //console.log('dragndrop() this', this);
    //set global variable so it is operable from handleFileLoad
    window.editor1 = this.api.editor;
    //console.log('dragndrop() that', window.editor1);
    reader.onload = this.handleFileLoad;
    reader.readAsText(event.target.files[0]);
    this.opendialog = false;
  }

  handleFileLoad(event) {
    //if (this) window.that = this;
    //console.log('handle editor1', window.editor1);
    let data = JSON.parse(event.target.result);
    console.log('handlefile data:', data);
    window.editor1.setComponents(data.components);
    window.editor1.setStyle(data.style);
  }

  drag(event) {
    console.log('drag', event);
    const self = this;
    self.isDragging = true;
    event.preventDefault();
  }


  drop(event) {
    console.log('drop', event);
    const self = this;
    self.isDragging = false;
    self.dragNdrop(event);
  }
  save() {
    let filename = prompt('File name (*.bjp):', 'Application.bjp');
    if (filename) {
      if (!filename.endsWith('.bjp')) filename = filename.concat('.bjp');
      //let FileSaver = new
      let blob = new Blob([
        JSON.stringify({components: this.api.editor.getComponents(), style: this.api.editor.getStyle() })],
      {type: 'application/json;charset=utf-8'});
      saveAs(blob, filename);
    }
  }
  export() {
    let filename = prompt('File name (*.html):', 'Application.html');
    if (filename) {
      if (!filename.endsWith('.html')) filename = filename.concat('.html');
      //let FileSaver = new
      let content = `<html>
<head>
<meta charset="utf-8">
<style>
${this.api.editor.getCss()}
</style>
<script type="text/javascript">${this.api.bundlefilecontent}</script>
</head>
<body aurelia-app="mainwebcomponent">
${this.api.editor.getHtml()}       
</body>
</html>`;
      let blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, filename);
    }
  }
  preview() {
    this.api.editor.runCommand('preview');
  }
}

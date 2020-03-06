import {saveAs} from 'file-saver';
import {Bodylightapi} from './bodylightapi';
import {inject} from 'aurelia-framework';
@inject(Bodylightapi)

export class Menu {
  constructor(api) {
    this.api = api;
    this.opendialog = false;
    this.showmenu = false;
    this.fmis = [{name: 'testFMI', definition: '//testfmi'}, {name: 'testFMI2', definition: '//testfmi2'}];
    this.anims = [{name: 'testAnim', definition: '//testanim'}, {name: 'testAnim2', definition: '//testanim2'}];
  }

  openmenu() {
    this.showmenu = ! this.showmenu;
  }
  new() {
    if (confirm('This will clear the entire design, continue?')) this.api.editor.runCommand('core:canvas-clear');
    //this.api.editor.runCommand('core:canvas-clear');
  }

  open() {
    this.opendialog = ! this.opendialog;
  }
  openfmi() {
    this.openfmidialog = ! this.openfmidialog;
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
    console.log('dragndrop event',event)
    let files = event.target.files || event.dataTransfer.files;
    this.appname = files[0].name;
    reader.readAsText(this.appname);
    this.opendialog = false;
    //event.preventDefault();
  }

  handleFileLoad(event) {
    //if (this) window.that = this;
    //console.log('handle editor1', window.editor1);
    let data = JSON.parse(event.target.result);
    //console.log('handlefile data:', data);
    window.editor1.setComponents(data.components);
    window.editor1.setStyle(data.style);
  }

  drag(event) {
    //console.log('drag', event);
    const self = this;
    self.isDragging = true;
    event.preventDefault();
  }


  drop(event) {
    //console.log('drop', event);
    const self = this;
    self.isDragging = false;
    event.preventDefault();
    self.dragNdrop(event);
  }

  dragNdropfmi(event) {
    //const self = this;
    //let fileName = URL.createObjectURL(event.target.files[0]);
    const reader = new FileReader();
    //console.log('dragndrop() this', this);
    //set global variable so it is operable from handleFileLoad
    window.menu1 = this;
    //console.log('dragndrop() that', window.editor1);
    reader.onload = this.handleFileLoadfmi;
    let files = event.target.files || event.dataTransfer.files;
    console.log(files);
    this.fminame = files[0].name;
    reader.readAsText(files[0]);
    this.openfmidialog = false;
    //event.preventDefault();
  }

  handleFileLoadfmi(event) {
    let data = event.target.result;
    //doesn't know this - goes via global menu1
    window.menu1.fmis.push({name: window.menu1.fminame, definition: data});
  }

  dragfmi(event) {
    const self = this;
    self.isDragging = true;
    event.preventDefault();
  }


  dropfmi(event) {
    const self = this;
    self.isDragging = false;
    event.preventDefault();
    self.dragNdropfmi(event);
  }

  dragNdropanim(event) {
    const reader = new FileReader();
    window.menu1 = this;
    reader.onload = this.handleFileLoadanim;
    let files = event.target.files || event.dataTransfer.files;
    this.animname = files[0].name;
    reader.readAsText(files[0]);
    this.openfmidialog = false;
  }

  handleFileLoadanim(event) {
    let data = event.target.result;
    //doesn't know this - goes via global menu1
    window.menu1.anims.push({name: window.menu1.animname, definition: data});
  }

  draganim(event) {
    //console.log('drag', event);
    const self = this;
    self.isDragging = true;
    event.preventDefault();
  }


  dropanim(event) {
    //console.log('drop', event);
    const self = this;
    self.isDragging = false;
    event.preventDefault();
    self.dragNdropanim(event);
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
      this.api.getBundleFileContent().then(jsbundle =>{
        console.log('file bundle:', jsbundle.substring(0, 100));
        let content = this.htmlexport(jsbundle);
        let blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, filename);
      });
    }
  }

  htmlexport(jsbundle) {
    let fmidefinitions = '';
    for (let fmi of this.fmis) {
      fmidefinitions += '\n<script type="module">' + fmi.definition + '</script>';
    }
    let animdefinitions = '';
    for (let anim of this.anims) {
      animdefinitions += '\n<script type="module">' + anim.definition + '</script>';
    }

    let content = `<html>
<head>
<meta charset="utf-8">
<style>
${this.api.editor.getCss()}
</style>
<script type="module">${jsbundle}</script>
${fmidefinitions}
${animdefinitions}
</head>
<body aurelia-app="mainwebcomponent">
${this.api.editor.getHtml()}       
</body>
</html>`;
    return content;
  }
  htmlcssscriptexport(jsbundle) {
    return {html: this.api.editor.getHtml(), css: this.api.editor.getCss(), script: jsbundle};
  }

  preview() {
    this.api.getBundleFileContent().then(jsbundle => {
      //let content = this.htmlexport(jsbundle);
      let content2 = this.htmlcssscriptexport(jsbundle);

      //create popup
      this.popup = window.open('', 'BodylightPreview', 'width=800,height=600');
      //in order to parse webcomponent, css,scripts,body needs to be loaded this way


      //add css and script
      let head = this.popup.document.getElementsByTagName('head')[0];
      let s = this.popup.document.createElement('style');
      s.setAttribute('type', 'text/css');
      s.appendChild(this.popup.document.createTextNode(content2.css));
      this.popup.console.log('adding css:', s);
      while (head.firstChild) {
        head.removeChild(head.lastChild);
      }
      head.appendChild(s);
      //add script
      let script = this.popup.document.createElement('script');
      script.type = 'module';
      script.innerHTML = content2.script;
      this.popup.console.log('adding script', script);
      head.appendChild(script);

      //add html
      //this.popup.console.log('adding html', content2.html);
      //let b = this.popup.document.getElementsByTagName('body')[0];
      //b.setAttribute('aurelia-app', 'mainwebcomponent');
      //b.innerHTML = content2.html;
      //let that = this;


      this.popup.document.body.setAttribute('aurelia-app', 'mainwebcomponent');
      this.popup.document.body.innerHTML = content2.html;
    });
  }

  preview2() {
    //this works for firefox
    this.api.getBundleFileContent().then(jsbundle =>{
      console.log('file bundle:', jsbundle.substring(0, 100));
      let content = this.htmlexport(jsbundle);
      let blob = new Blob([content], {type: 'text/html;charset=utf-8'});
      let url = URL.createObjectURL(blob);
      this.popup = window.open(url, 'BodylightPreview2', 'width=800,height=600,menubar=no,status=no,titlebar=no,toolbar=no');
    });
    //
  }

  removefmu(fmi) {
    const index = this.fmis.indexOf(fmi);
    if (index > -1) this.fmis.splice(index, 1);
  }

  removeanim(anim) {
    const index = this.anims.indexOf(anim);
    if (index > -1) this.anims.splice(index, 1);
  }
}

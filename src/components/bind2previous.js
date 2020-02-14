import {bindable} from 'aurelia-framework';

export class Bind2previous {
  @bindable fromid;
  @bindable toid;

  constructor() {
    //document.getElementById("id${window.ids - 2}").addEventListener("change", myfun${window.ids});
    /*function myfun${window.ids}(event){
        document.getElementById("id${window.ids - 1}").value = event.target.value;
   }*/
    this.handleValueChange = e => {
      console.log('handleValueChange, e:', e);
      document.getElementById(this.toid).value = e.target.value;
    };
  }

  attached(){
    document.getElementById(this.fromid).addEventListener('change', this.handleValueChange);
  }
  detached(){
    document.getElementById(this.fromid).removeEventListener('change', this.handleValueChange);
  }
}

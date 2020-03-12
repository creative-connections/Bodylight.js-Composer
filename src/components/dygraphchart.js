import Dygraph from 'dygraphs';
import {bindable} from 'aurelia-framework';


export class Dygraphchart {
  @bindable inputs;
  @bindable fromid;
  @bindable maxdata=1000;

  constructor() {
    this.data = [[0, 0]];
    //this.data=[[1, 5], [2, 5], [3, 4.9], [4, 4.8], [5, 5.2]];
    //create lambda function which is added as listener later
    this.handleValueChange = e => {
      //e.detail may not reallocate - using same buffer, thus slicing to append to data array
      this.data.push(e.detail.slice());
      //shift - remove first element if data is too big
      if (this.data.length > this.maxdata) this.data.shift();
      //console.log('Dygraphchar data', this.data);
      this.dygraph.updateOptions( { 'file': this.data } );
    };
  }


  attached() {
    //listening to custom event fmidata
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);
    //labels are separated by , in attribute inputs
    console.log('Dygraphchart attached inputs', this.inputs);
    let labels = this.inputs.split(',');
    console.log('Dygraphchart attached labels', labels);
    //create dygraph
    this.dygraph = new Dygraph(this.dygraphcanvas, this.data,
      {
        //Draw a small dot at each point
        drawPoints: true,
        //rolling average period text box to be show
        //showRoller: true,
        //customBars if series is low;middle;high where range between low and high is visualised
        //customBars: true,
        //range selector
        showRangeSelector: true,
        labels: labels
      });
    /*data.push([x, y]);
    g.updateOptions( { 'file': data } );*/
  }

  detached() {
    document.getElementById(this.fromid).removeEventListener('input', this.handleValueChange);
  }
}

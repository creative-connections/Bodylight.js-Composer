import Chart from 'chart.js';
import {bindable} from 'aurelia-framework';

export class Chartjs {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type='doughnut';

  constructor() {
    this.handleValueChange = e => {
      //let datapoint = [e.detail.time];
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();
      //for (let i = 0; i < edata.length; i++) datapoint.push(edata[i]);
      //this.data.push(datapoint);
      //shift - remove first element if data is too big
      //if (this.data.length > this.maxdata) this.data.shift();
      //console.log('Dygraphchar data', this.data);
      //this.dygraph.updateOptions( { 'file': this.data } );
      this.chart.data.datasets[0].data = e.detail.data.slice(this.refindex, this.refindex + this.refvalues);
      this.chart.update();
    };
  }

  selectColor(number) {
    const hue = number * 137.508; // use golden angle approximation
    return `hsl(${hue},60%,60%)`;
  }

  attached() {
    //listening to custom event fmidata
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);

    //this.chartcanvas; - reference to the DOM canvas
    let mylabels = this.labels.split(',');

    let ctx = this.chartcanvas.getContext('2d');
    this.colors = [];
    for (let i = 0; i < this.refvalues; i++) this.colors.push(this.selectColor(i));

    this.data = {
      labels: mylabels,
      datasets: [{
        data: [240, 3280, 35, 215, 60, 90],
        backgroundColor: this.colors
      }]
    };
    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: {
        responsive: true,
        legend: {
          display: false,
          position: 'top'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }
}

import {bindable} from 'aurelia-templating';
import Gifffer from 'gifffer';

export class Animatedheart1 {
  @bindable fromid;

  constructor() {
    this.isstopped = true;
    this.handleStart = e => {
      console.log('AnimatedHeart start event');
      this.start();
    };
    this.handleStop = e => {
      console.log('AnimatedHeart stop event');
      this.stop();
    };
  }

  attached() {
    // eslint-disable-next-line new-cap
    this.gifs = Gifffer();/*{playButtonStyles: {
      'width': '0px',
      'height': '0px',
      'border-radius': '0px',
      'background': 'rgba(0, 0, 0, 0.3)',
      'position': 'absolute',
      'top': '0%',
      'left': '0%',
      'margin': '-30px 0 0 -30px'
    },
    playButtonIconStyles: {
      'width': '0',
      'height': '0',
      'border-top': '0px',
      'border-bottom': '0px',
      'border-left': '0px',
      'position': 'absolute',
      'left': '0px',
      'top': '0px'
    }});*/
    console.log('animated heart gifs:', this.gifs);
    document.getElementById(this.fromid).addEventListener('fmistart', this.handleStart);
    document.getElementById(this.fromid).addEventListener('fmistop', this.handleStop);
  }

  stop() {
    this.isstopped = true;
    this.gifs[0].click();
  }
  start() {
    this.isstopped = false;
    this.gifs[0].click();
  }
}

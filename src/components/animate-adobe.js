import {bindable} from 'aurelia-templating';

export class AnimateAdobe {
  @bindable src;
  @bindable width;
  @bindable height;
  @bindable name;
  @bindable fromid;
  @bindable fps = 30;
  @bindable autoplay = false;

  constructor() {
    this.isstopped = true;
    this.stage = null;
    this.animation = null;
    this.ticker = null;
    
    this.handleStart = e => {
      console.log('AnimateAdobe start event');
      this.start();
    };
    this.handleStop = e => {
      console.log('AnimateAdobe stop event');
      this.stop();
    };
    this.handleUpdate = e => {
      if (e.detail && e.detail.values && !this.isstopped) {
        this.updateAnimation(e.detail.values);
      }
    };
  }

  attached() {
    console.log('animate-adobe attached() with src:', this.src);
    
    // Make sure the canvas is ready
    if (this.canvas) {
      // Set canvas dimensions if provided
      if (this.width) this.canvas.width = parseInt(this.width);
      if (this.height) this.canvas.height = parseInt(this.height);
      console.log(`Canvas initialized with dimensions ${this.canvas.width}x${this.canvas.height}`);
    } else {
      console.error('Canvas element not found in the DOM');
    }
    
    // Add event listeners for FMI control
    if (this.fromid) {
      const fmiElement = document.getElementById(this.fromid);
      if (fmiElement) {
        fmiElement.addEventListener('fmistart', this.handleStart);
        fmiElement.addEventListener('fmistop', this.handleStop);
        fmiElement.addEventListener('fmidata', this.handleUpdate);
        console.log(`Event listeners attached to FMI element with id ${this.fromid}`);
      } else {
        console.warn(`FMI element with id ${this.fromid} not found`);
        // The FMI element might be created after this component
        setTimeout(() => {
          const retryFmiElement = document.getElementById(this.fromid);
          if (retryFmiElement) {
            retryFmiElement.addEventListener('fmistart', this.handleStart);
            retryFmiElement.addEventListener('fmistop', this.handleStop);
            retryFmiElement.addEventListener('fmidata', this.handleUpdate);
            console.log(`Event listeners attached on retry to FMI element with id ${this.fromid}`);
          }
        }, 1000);
      }
    }
    
    // Load the animation script
    this.loadAnimScript();
  }

  loadAnimScript() {
    console.log(`Starting animation load process for ${this.name} (${this.src})`);
    this.checkAndLoadDependencies()
      .then(() => this.loadAnimationFile())
      .catch(error => {
        console.error('Error in animation loading chain:', error);
        // Try alternative loading paths
        this.tryAlternativePaths();
      });
  }
  
  /**
   * Check and load necessary dependencies like CreateJS
   */
  checkAndLoadDependencies() {
    return new Promise((resolve, reject) => {
      // Check if CreateJS is already loaded
      if (window.createjs) {
        console.log('CreateJS already loaded');
        resolve();
        return;
      }
      
      console.log('Loading CreateJS library');
      const createjsScript = document.createElement('script');
      createjsScript.src = 'createjs.min.js';
      createjsScript.type = 'text/javascript';
      createjsScript.onload = () => {
        console.log('CreateJS loaded successfully');
        resolve();
      };
      createjsScript.onerror = (error) => {
        console.error('Error loading CreateJS:', error);
        reject(error);
      };
      document.head.appendChild(createjsScript);
    });
  }

  /**
   * Load the actual animation file
   */
  loadAnimationFile() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `editor/${this.src}`;
      script.type = 'text/javascript';
      script.onload = () => {
        console.log(`Script ${this.src} loaded successfully`);
        this.initAnimation();
        resolve();
      };
      script.onerror = (error) => {
        console.error(`Error loading script ${this.src}:`, error);
        reject(error);
      };
      document.head.appendChild(script);
    });
  }
  
  /**
   * Try alternative paths if initial loading fails
   * This handles different environments and folder structures
   */
  tryAlternativePaths() {
    console.log('Trying alternative paths for animation files');
    const alternativePaths = [
      `animations/${this.src}`,
      `${this.src}`,
      `../uploads/animations/${this.src}`,
      `../static/editor/${this.src}`
    ];
    
    let loaded = false;
    
    for (const path of alternativePaths) {
      if (loaded) break;
      
      const script = document.createElement('script');
      script.src = path;
      script.type = 'text/javascript';
      script.onload = () => {
        console.log(`Script loaded successfully from alternative path: ${path}`);
        loaded = true;
        this.initAnimation();
      };
      script.onerror = () => {
        console.log(`Failed to load from ${path}`);
      };
      document.head.appendChild(script);
    }
  }

  initAnimation() {
    // Make sure CreateJS is available
    if (!window.createjs) {
      console.error('CreateJS library not loaded. Cannot initialize animation.');
      setTimeout(() => this.initAnimation(), 500); // Retry after a delay
      return;
    }

    // Make sure the canvas is available
    if (!this.canvas) {
      console.error('Canvas element not available. Cannot initialize animation.');
      return;
    }

    // Initialize the stage first
    this.stage = new createjs.Stage(this.canvas);
    
    // Check for animation in window.ani.comp
    if (window.ani && window.ani.comp && window.ani.comp[this.name]) {
      this.animation = window.ani.comp[this.name];
      console.log(`Animation ${this.name} initialized from window.ani.comp`);
      this.stage.addChild(this.animation);
      this.stage.update();
      
      // Start animation if autoplay is enabled
      if (this.autoplay) {
        this.start();
      }
      return;
    }
    
    // Alternative: Check if it's in CreateJS lib structure
    if (window.lib && window.lib[this.name]) {
      try {
        // Create a new instance of the animation
        this.animation = new window.lib[this.name]();
        
        // Store it in the global ani.comp object for future use
        window.ani = window.ani || {};
        window.ani.comp = window.ani.comp || {};
        window.ani.comp[this.name] = this.animation;
        
        console.log(`Animation ${this.name} initialized from window.lib`);
        
        // Add to stage
        this.stage.addChild(this.animation);
        this.stage.update();
        
        // Set up ticker for animation updates
        this.setupTicker();
        
        // Start animation if autoplay is enabled
        if (this.autoplay) {
          this.start();
        }
        return;
      } catch (error) {
        console.error(`Error initializing animation ${this.name}:`, error);
      }
    }
    
    // If we get here, we couldn't initialize the animation
    console.error(`Animation component ${this.name} not found in window.ani.comp or window.lib`);
    console.log('Available lib components:', window.lib);
    console.log('Available ani.comp components:', window.ani?.comp);
  }

  start() {
    if (this.animation && this.animation.gotoAndPlay) {
      this.animation.gotoAndPlay(0);
      this.isstopped = false;
      console.log('Animation started');
      
      // Start the ticker if it's not running
      if (this.stage && !this.ticker) {
        this.setupTicker();
      }
    } else {
      console.warn('Animation not properly initialized for start');
    }
  }

  stop() {
    if (this.animation && this.animation.gotoAndStop) {
      this.animation.gotoAndStop(0);
      this.isstopped = true;
      console.log('Animation stopped');
      
      // Stop the ticker
      if (this.ticker) {
        createjs.Ticker.removeEventListener("tick", this.ticker);
        this.ticker = null;
      }
    } else {
      console.warn('Animation not properly initialized for stop');
    }
  }
  
  setupTicker() {
    if (!window.createjs || !window.createjs.Ticker) {
      console.error('CreateJS Ticker not available');
      return;
    }
    
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    this.ticker = () => {
      if (this.stage && !this.isstopped) {
        this.stage.update();
      }
    };
    createjs.Ticker.addEventListener("tick", this.ticker);
    console.log('Animation ticker setup completed');
  }
  
  updateAnimation(values) {
    // If animation has update method, call it with simulation values
    if (this.animation && typeof this.animation.update === 'function') {
      this.animation.update(values);
    }
    // Update the stage
    if (this.stage) {
      this.stage.update();
    }
  }

  detached() {
    // Clean up event listeners
    if (this.fromid) {
      const fmiElement = document.getElementById(this.fromid);
      if (fmiElement) {
        fmiElement.removeEventListener('fmistart', this.handleStart);
        fmiElement.removeEventListener('fmistop', this.handleStop);
        fmiElement.removeEventListener('fmidata', this.handleUpdate);
        console.log(`Event listeners removed from FMI element with id ${this.fromid}`);
      }
    }
    
    // Stop animation and clean up ticker
    if (this.ticker) {
      createjs.Ticker.removeEventListener("tick", this.ticker);
      this.ticker = null;
    }
    
    // Clear stage references
    this.stage = null;
    this.animation = null;
    
    console.log('animate-adobe component detached and cleaned up');
  }
}

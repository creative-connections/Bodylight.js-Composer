/**
 * Main function for registering Bodylight components as Webcomponents
 *
 * @author Tomas Kulhanek <https://github.com/TomasKulhanek>
 * @since v2.0
 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { CustomElementRegistry } from 'aurelia-web-components';
import {PLATFORM} from 'aurelia-pal';
import * as environment from '../config/environment.json';

export function configure(aurelia) {
  console.log('mainwebcomponent configure');
  aurelia.use
    .basicConfiguration()
    //.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'))
    .plugin(PLATFORM.moduleName('aurelia-history-browser'))
    .plugin(PLATFORM.moduleName('aurelia-templating-resources'))
    .plugin(PLATFORM.moduleName('aurelia-templating-router'))
    .feature(PLATFORM.moduleName('resources/index'))
    //use this routine to register component as web component
    .globalResources(PLATFORM.moduleName('components/range.html'))
    .globalResources(PLATFORM.moduleName('components/receptacle.html'))
    .globalResources(PLATFORM.moduleName('components/bind2previous'))
    .globalResources(PLATFORM.moduleName('components/dygraphchart'))
    .globalResources(PLATFORM.moduleName('components/fmi'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  aurelia.start().then(() => {
    const registry = aurelia.container.get(CustomElementRegistry);
    registry.fallbackPrefix = 'bdl-';
    registry.useGlobalElements();
  });
}

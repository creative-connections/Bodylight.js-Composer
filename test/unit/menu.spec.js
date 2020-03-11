import 'isomorphic-fetch';  //required if tested component use fetch api
import {Menu} from '../../src/composer/menu';
//import FileSaver from 'file-saver';
jest.mock('file-saver', ()=>({saveAs: jest.fn()}))
import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';


describe('Stage Menu Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('composer/menu'))
      .inView('<menu></menu>');
  });

  afterEach(() => component.dispose());

  it('should render menu', done => {
    component.create(bootstrap).then(() => {
      let nameElement = document.getElementsByTagName('button')[0];
      expect(nameElement.innerHTML).toContain('Menu');
      nameElement = document.getElementsByTagName('button')[1];
      expect(nameElement.innerHTML).toContain('New');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});

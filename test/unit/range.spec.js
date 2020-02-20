import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';


describe('Stage Menu Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('components/range.html'))
      .inView('<range min="0" max="200" step="2" default="50"></range>');
  });

  afterEach(() => component.dispose());

  it('should render menu', done => {
    component.create(bootstrap).then(() => {
      let nameElement = document.getElementsByTagName('input')[0];
      expect(nameElement.innerHTML).toContain('');
      nameElement = document.getElementsByTagName('input')[1];
      expect(nameElement.innerHTML).toContain('');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});

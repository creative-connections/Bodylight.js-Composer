import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';


describe('Stage Menu Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('components/bind2previous'))
      .inView('<div id="id1"></div><div id="id2"></div><bind2previous fromid="id1" toid="id2"></bind2previousenu>');
  });

  afterEach(() => component.dispose());

  it('should render menu', done => {
    component.create(bootstrap).then(() => {
      //TODO add some checks

      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});

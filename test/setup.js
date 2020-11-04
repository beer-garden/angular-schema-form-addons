
import 'tv4';
import 'angular';
import 'angular-mocks/angular-mocks';

import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

global.jestExpect = global.expect;
global.expect = chai.expect;
global.sinon = sinon;

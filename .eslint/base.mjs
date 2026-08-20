import common from './configs/common.mjs';
import dependencyCheck from './configs/dependency-check.mjs';
import moduleBoundries from './configs/module-boundries.mjs';
import noUndefined from './configs/no-undefined.mjs';
import nodeProtocol from './configs/node-protocol.mjs';
import strictEquation from './configs/strict-equation.mjs';
import typeImport from './configs/type-import.mjs';
import unboundMethod from './configs/unbound-method.mjs';

export default [
  ...common,
  ...dependencyCheck,
  ...moduleBoundries,
  ...noUndefined,
  ...nodeProtocol,
  ...typeImport,
  ...strictEquation,
  ...unboundMethod,
];

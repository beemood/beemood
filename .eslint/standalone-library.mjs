import noNode from './configs/no-node.mjs';
import { default as library } from './library.mjs';

/**
 * Library with no node dependencies
 */
export default [...library, ...noNode];

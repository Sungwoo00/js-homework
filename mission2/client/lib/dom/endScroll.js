import { isString } from '../utils/type.js';

export function endScroll(node) {
  if (isString(node)) node = getNode(node);

  node.scrollTop = node.scrollHeight;
}

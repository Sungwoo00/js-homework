
import {isString} from '../utils/type.js';
import { getNode } from "./getNode.js";


export default function clearContents(node){
  if(isString(node)) node = getNode(node);

  if(node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA'){
    node.value = ''
    return;
  }

  node.textContent = '';
}











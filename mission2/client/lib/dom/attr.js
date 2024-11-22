import { isString, isUndefined } from '../utils/type.js';
import { getNode } from "./getNode.js";
import { typeError } from "../error/typeError.js";

function getAttr(node,prop){

  if(isString(node)) node = getNode(node);

  if(!isString(prop)) throw typeError('getAttr 함수에 전달된 두 번째 인수는 문자 타입 이어야 합니다.')


  return node.getAttribute(prop)

}


function setAttr(node,prop,value){
  
  if(isString(node)) node = getNode(node);
  if(!isString(prop)) throw typeError('setAttr 함수의 두 번째 인수는 문자 타입 이어야 합니다.');
  if(isUndefined(value) || value === ''){
    
    node.removeAttribute(prop);
    return;
  }

  if( prop.startsWith('data') ) {
    prop = prop.slice(5);
    node.dataset[prop] = value;
    return;
  }

  node.setAttribute(prop,value);

}


// function attr(node,prop,value){
  
//   if(!value){
//     return getAttr(node,prop)
//   }else{
//     setAttr(node,prop,value)
//   }
// }

export  const attr = (node,prop,value) => !value ? getAttr(node,prop) : setAttr(node,prop,value)

// attr('.about','id') // getter
// attr('.about','id','star') // setter



















import { isString, isObject, isArray } from '../utils/type.js';
import { getNode } from "./getNode.js";
import { syntaxError } from "../error/syntaxError.js";


/* -------------------------------------------- */
/*                   css class                  */
/* -------------------------------------------- */


/**
 * @function DOM Element에 클래스를 추가하는 함수
 * @author kindtiger 
 * @type {HTMLElement | string} node 
 * @type  {string | array | object} className 
 * @return {void} 
 */

export function addClass(node,...className){

  if(isString(node)) node = getNode(node);
  
  className.forEach((c)=>{
    
    if(isObject(c)) c = Object.values(c);

    if(c.includes(',')){
      c = c.replace(/\s*/g,'').split(',');
    }

    if(isArray(c)){
      c.forEach(c => node.classList.add(c))
    }else{
      node.classList.add(c);
    }
  })
}
export function removeClass(node,className){
  if(isString(node)) node = getNode(node);
  if(!className){
    node.className = '';
  }
  node.classList.remove(className);
}
export function toggleClass(node,className){
  if(isString(node)) node = getNode(node);
  return node.classList.toggle(className);
}







/* -------------------------------------------- */
/*                     style                    */
/* -------------------------------------------- */

function getCss(node,prop){

  if(isString(node)) node = getNode(node);
  if(!(prop in document.body.style)) throw syntaxError('getCss 함수의 두 번째 인수는 유효한 css 속성 이어야 합니다.');
  return getComputedStyle(node)[prop]

}

function setCss(node,prop,value){
  if(isString(node)) node = getNode(node);
  if(!(prop in document.body.style)) throw syntaxError('setCss 함수의 두 번째 인수는 유효한 css 속성 이어야 합니다.');
  if(!value) throw syntaxError('setCss 함수의 세 번째 인수는 필수 입력값 입니다.');
  node.style[prop] = value;
}

export const css = (node,prop,value) => !value ? getCss(node,prop) : setCss(node,prop,value);




import { getNode } from '../dom/getNode.js';
import { isNumber, isObject } from './type.js';
import { xhrPromise } from './xhr.js';
import { insertLast } from '../dom/insert.js';

function delay(callback, timeout = 1000) {
  setTimeout(callback, timeout);
}

const first = getNode('.first');
const second = getNode('.second');

// delay(()=>{
//   first.style.top = '-100px';

//   delay(()=>{
//     first.style.transform = 'rotate(360deg)'

//     delay(()=>{
//       first.style.top = '0px';
//       second.style.top = '0px';
//     })

//     second.style.transform = 'rotate(360deg)'
//   })
//   second.style.top = '100px';
// })

const shouldRejected = false;

const p = new Promise((성공, 실패) => {
  if (!shouldRejected) {
    성공('성공입니다~');
  } else {
    실패('실패입니다~');
  }
});

p.then((res) => {
  // console.log( res );
});

// promise 객체를 반환하는 함수 => 재사용

const defaultOptions = {
  shouldRejected: false,
  data: '성공',
  errorMessage: '알 수 없는 오류',
  timeout: 1000,
};

export function delayP(options) {
  let config = { ...defaultOptions };

  if (isNumber(options)) {
    config.timeout = options;
  }

  if (isObject(options)) {
    config = { ...defaultOptions, ...options };
  }

  const { shouldRejected, data, errorMessage, timeout } = config;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!shouldRejected) {
        resolve(data);
      } else {
        reject(errorMessage);
      }
    }, timeout);
  });
}

// delayP(2000)

// delayP(false)
// .then((res)=>{

//   return delayP(false)
// })
// .then((res)=>{

//   console.log( res );

// })

// delayP(false)
//   .then((res) => {

//     first.style.top = '-100px';
//     return delayP(false);
//   })
//   .then((res) => {

//     first.style.transform = 'rotate(360deg)';
//     return delayP(false);
//   })
//   .then((res) => {

//     first.style.top = '0px';
//     return delayP(false);
//   });

// Promise를 사용하는 이유 ?
// - 콜백의 한계
// - 콜백 지옥 탈출
// - 가독성을 위해
// - 비동기 작업을 순차적으로 처리 (일을 차례대로 처리) ⭐️⭐️⭐️

// id가 서버에 있는지 확인
const promise = new Promise((resolve, reject) => {
  // 서버와의 통신
  setTimeout(() => {
    resolve({ idValid: true });
  }, 1000);
});

// promise.then((res)=>{

//   if(res.idValid){
//     alert('너 있어')
//     // 비밀번호 찾기 페이지로 이동
//   }else{
//     alert('회원가입해')
//   }

// })

// user의 데이터를 서버에서 가져온 다음
// user의 이름을 배열에 담고
// 담긴 배열의 정보를 화면에 출력

// 비밀번호 찾기
// id를 받기 => id가 서버에 있는지 확인 => ㅇㅇ 있음
// 비밀번호 변경할 수 있는 이메일 발송

// 아이디찾기
// 서버 통신
// 있는지 확인 (조건문)

async function d() {
  return 1;
}

const _d = d();

// _d.then(console.log)

// async 함수는 무.조.건. Promise Object를 반환!!!!!!!!!!!
// await 2가지 기능 수행
//        1. 코드 실행 흐름 제어
//        2. result 꺼내오기

async function delayA() {
  const p = new Promise((resolve) => {
    setTimeout(() => {
      resolve('성공');
    }, 2000);
  });

  const result = await p;

  console.log(result);

  return result;
}

// console.log( delayA() );

// function _라면끓이기() {
//   delayP({ data: '물' })
//     .then((res) => {
//       console.log(res);

//       return delayP({ data: '스프' });
//     })
//     .then((res) => {
//       console.log(res);

//       return delayP({ data: '면' });
//     })
//     .then((res) => {
//       console.log(res);

//       return delayP({ data: '계란' });
//     })
//     .then((res) => {
//       console.log(res);

//       return delayP({ data: '그릇' });
//     })
//     .then((res) => {
//       console.log(res);
//     });
// }

// async function 라면끓이기() {
//   const a = await delayP({ data: '물' });
//   console.log(a);

//   const b = await delayP({ data: '스프' });
//   console.log(b);

//   // const c = await delayP({data:'면'})
//   console.log('면');

//   // const d = await delayP({data:'계란'})
//   console.log('계란');

//   const e = await delayP({ data: '그릇' });w
//   console.log(e);
// }

// 라면끓이기();

function getData() {
  xhrPromise.get('https://pokeapi.co/api/v2/pokemon/808').then((res) => {
    // console.log(res);

    insertLast(
      document.body,
      `<img src="${res.sprites.other.showdown['front_default']}" alt="" />`
    );
  });
}

async function _getData() {
  const url = await xhrPromise.get('https://pokeapi.co/api/v2/pokemon/808');

  insertLast(
    document.body,
    `<img src="${url.sprites.other.showdown['front_default']}" alt="" />`
  );
}

// _getData();

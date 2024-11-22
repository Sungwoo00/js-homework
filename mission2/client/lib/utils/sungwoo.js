const END_POINT = 'https://jsonplaceholder.typicode.com/users';

const defaultOptions = {
  method: 'GET',
  body: null,
  headers: {
    'Content-Type': 'application/json',
    'Acccess-Control-Allow-Origin': '*',
  },
};

// 일반 함수 async
// async function sungwoo(options) {

// 화살표 함수 async
export const sungwoo = async (options) => {
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // let data
  const response = await fetch(url, restOptions);

  if (response.ok) {
    // const data = await response.json();
    response.data = await response.json();
  }

  // return data
  return response;
};

// const response = await sungwoo({ url: END_POINT });

// sungwoo({
//   // method: 'POST',
//   url: END_POINT,
//   // body: { name: 'sungwoo', age: 25 },
// });

// 컴파운드 패턴

sungwoo.get = (url, options) => {
  return sungwoo({
    url,
    ...options,
  });
};

sungwoo.post = (url, body, options) => {
  return sungwoo({
    method: 'POST',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};
// sungwoo.post(END_POINT, { name: 'sungwoo' });

sungwoo.put = (url, body, options) => {
  return sungwoo({
    method: 'PUT',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

sungwoo.patch = (url, body, options) => {
  return sungwoo({
    method: 'PATCH',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

sungwoo.delete = (url, options) => {
  return sungwoo({
    method: 'DELETE',
    url,
    ...options,
  });
};

// async/await를 최상위 레벨에서 사용해야 할 때 빌드 오류 방지 (즉시 실행함수 - IIFE)

// (async function () {
//   const response = await sungwoo.get(END_POINT);

//   console.log(response.data);
// })();

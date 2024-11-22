const END_POINT = 'https://jsonplaceholder.typicode.com/users';

// [readyState]
// 0 : uninitialized
// 1 : loading
// 2 : loaded
// 3 : interactive
// 4 : complete  => 성공 | 실패

/* -------------------------------------------- */
/*                   callback                   */
/* -------------------------------------------- */

function xhr({
  method = 'GET',
  url = '',
  success = null,
  fail = null,
  body = null,
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
} = {}) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  if (!(method === 'DELETE')) {
    Object.entries(headers).forEach(([k, v]) => {
      xhr.setRequestHeader(k, v);
    });
  }

  xhr.addEventListener('readystatechange', () => {
    const { status, response, readyState } = xhr;

    if (readyState === 4) {
      if (status >= 200 && status < 400) {
        const data = JSON.parse(response);
        success(data);
      } else {
        fail({ message: '알 수 없는 오류가 발생했습니다.' });
      }
    }
  });
  xhr.send(JSON.stringify(body));
}

const obj = {
  name: 'tiger',
  age: 38,
};

// xhr({
//   method:"DELETE",
//   url: END_POINT,
//   success: (data)=>{
//     console.log( data );
//   },
//   fail: ()=>{},
// })

xhr.get = (url, success, fail) => {
  xhr({ url, success, fail });
};

xhr.post = (url, body, success, fail) => {
  xhr({
    method: 'POST',
    url,
    body,
    success,
    fail,
  });
};

xhr.put = (url, body, success, fail) => {
  xhr({
    method: 'PUT',
    url,
    body,
    success,
    fail,
  });
};

xhr.delete = (url, success, fail) => {
  xhr({
    method: 'DELETE',
    url,
    success,
    fail,
  });
};

// xhr.delete(
//   END_POINT,
//   (data)=>{
//     console.log( data );
//   },
//   ()=>{

//   }
// )

/* -------------------------------------------- */
/*                    promise                   */
/* -------------------------------------------- */

// mixin

const defaultOptions = {
  method: 'GET',
  url: '',
  body: null,
  errorMessage: '서버와의 통신이 원활하지 않습니다.',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export function xhrPromise(options = {}) {
  const { method, url, errorMessage, body, headers } = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  if (!(method === 'DELETE')) {
    Object.entries(headers).forEach(([k, v]) => {
      xhr.setRequestHeader(k, v);
    });
  }

  // xhr.send(body ? JSON.stringify(body) : null);

  return new Promise((resolve, reject) => {
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        // complete
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({ message: '데이터 통신이 원활하지 않습니다.' });
        }
      }
    });
  });
}

// xhrPromise({
//   method:'GET',
//   url:END_POINT
// })
// .then((res)=>{
//   console.log( res );

// })
// .catch((err)=>{
//   console.log( err );

// })

xhrPromise.get = (url) => xhrPromise({ url });
xhrPromise.post = (url, body) => xhrPromise({ url, body, method: 'POST' });
xhrPromise.put = (url, body) => xhrPromise({ url, body, method: 'PUT' });
xhrPromise.delete = (url) => xhrPromise({ url, method: 'DELETE' });

xhrPromise
  .get(END_POINT)
  .then((res) => {
    // console.log(res);

    res.forEach(({ website }) => {
      const tag = `
      <div>site : ${website}</div>
    `;

      document.body.insertAdjacentHTML('beforeend');
    });
  })
  .then(() => {})
  .catch(() => {});

// xhrPromise.put()
// xhrPromise.delete()

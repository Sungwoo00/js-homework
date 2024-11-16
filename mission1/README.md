# 네이버 로그인 페이지 구현

> 이 과제는 이메일과 비밀번호를 정확하게 입력 했을 때 유효성 검증을 통해 welcome 페이지로 넘어갈 수 있도록 재사용 가능한 함수 분리 및 함수 중심 설계 구현한 코드 설명 리드미 입니다.

## 목차
- [실행 화면](#실행-화면)
- [코드 로직](#코드-로직)
  - [변수 선언](#변수-선언)
  - [정규식 함수](#정규식-함수)
  - [입력값 유효성 검증](#입력값-유효성-검증)
  - [로그인 처리](#로그인-처리)
  - [이벤트 바인딩](#이벤트-바인딩)
- [회고](#회고)

## 실행 화면

[실행 화면](https://github.com/user-attachments/assets/5e08bc8c-6aab-4bda-a50a-b2cc239b3d6d)

## 코드 로직

### 변수 선언
- 여러번 사용할 id, password 입력창과 에러 메시지, 로그인 폼을 찾아서 변수 선언
- 이메일과 비밀번호가 유효한지 확인하는 **상태 변수** `false`로 초기화

```javascript

const idInput = document.querySelector('.user-email-input');
const pwInput = document.querySelector('.user-password-input');
const idError = document.querySelector('#userEmailError');
const pwError = document.querySelector('#userPasswordError');
const loginForm = document.querySelector('.login-form'); 

let isEmailValid = false;
let isPwValid = false;

```

### 정규식 함수

- 이메일 정규표현식 함수 `emailReg()` 선언 
  - 입력받은 텍스트가 이메일 형식인지 확인
  - @를 포함한 이메일 형식이면 true, 아니면 false 반환
    
- 비밀번호 정규표현식 함수 `pwReg()` 선언
  - 입력받은 텍스트가 비밀번호 조건에 맞는지 확인
  - 영문, 숫자, 특수문자 모두 포함 6~16자이면 true, 아니면 false 반환

```javascript

function emailReg(text) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

```

### 입력값 유효성 검증

- 이메일 검증 함수 `handleIdValid(e)` 선언
  - `isEmailValid` 변수에 `emailReg`로 입력 되고 있는 값에 대한 유효성 실시간 검사하여 true, false로 반환
  - 삼항 연산자 사용하여 `isEmalivalid`의 상태에 따라서 에러 메세지 표시 및 숨김 처리
    
- 비밀번호 유효성 검증 함수 `handlePwValid(e)` 선언
  - `isPwValid` 변수에 `pwReg`로 입력 되고 있는 값에 대한 유효성 실시간 검사하여 true, false로 반환
  - 삼항 연산자 사용하여 `isPwValid`의 상태에 따라서 에러 메세지 표시 및 숨김 처리
    
```javascript

function handleIdValid(e) {
  isEmailValid = emailReg(e.target.value);
  isEmailValid ? e.target.classList.remove('is--invalid') : e.target.classList.add('is--invalid');
}

function handlePwValid(e) {
  isPwValid = pwReg(e.target.value);
  isPwValid ? e.target.classList.remove('is--invalid') : e.target.classList.add('is--invalid');
}

```

### 로그인 처리

- `e.preventDefault()`로 `form`의 `submit`이벤트 기본 동작인 페이지 새로고침 방지 
- `isEmailValid`와 `isPwValid`의 유효성 검증 조건을 모두 만족했을 때,
  - 입력된 `이메일`과 `user.id`가 일치하고, `비밀번호`와 `user.pw`까지 일치한다면,
    - `welcome` 페이지로 이동~~~~!
- 조건을 만족하지 못 할 때는 `alert`로 입력 정보 재확인 요청

```javascript

function handleLogin(e) {
  e.preventDefault();

  if (isEmailValid && isPwValid) {
    if (idInput.value === user.id && pwInput.value === user.pw) {
      window.location.href = './welcome.html'
    } else {
      alert('아이디 또는 비밀번호를 잘못 입력하셨습니다.')
    }
  } else {
    alert('이메일 또는 비밀번호 형식을 확인해주세요.')
  }
}

```

### 이벤트 바인딩

- `idInput` 요소에서 `input` 이벤트가 발생하면 `handleIdValid` 함수 실행
- `pwInput` 요소에서 `input` 이벤트가 발생하면 `handlePwValid` 함수 실행
- `loginForm` 요소에서 `submit` 이벤트가 발생하면 `handleLogin` 함수 실행

```javascript

idInput.addEventListener('input', handleIdValid);
pwInput.addEventListener('input', handlePwValid);
loginForm.addEventListener('submit', handleLogin);

```

## 회고
> 로그인 처리 함수에서 로그인 실패 시 `alert` 대신 비밀번호 에러 메세지 표시 위치에 문구를 바꿔서 넣어줘도 됐을 거 같다는 생각이 들었다.






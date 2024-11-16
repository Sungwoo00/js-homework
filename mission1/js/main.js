const user = {
  id: 'asd@naver.com',
  pw: 'spdlqj123!@',
};

const idInput = document.querySelector('.user-email-input');
const pwInput = document.querySelector('.user-password-input');
const idError = document.querySelector('#userEmailError');
const pwError = document.querySelector('#userPasswordError');
const loginForm = document.querySelector('.login-form'); 

let isEmailValid = false;
let isPwValid = false;


function emailReg(text) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

function handleIdValid(e) {
  isEmailValid = emailReg(e.target.value);
  isEmailValid ? e.target.classList.remove('is--invalid') : e.target.classList.add('is--invalid');
}

function handlePwValid(e) {
  isPwValid = pwReg(e.target.value);
  isPwValid ? e.target.classList.remove('is--invalid') : e.target.classList.add('is--invalid');
}

function handleLogin(e) {
  e.preventDefault();

  if (isEmailValid && isPwValid) {
    if (idInput.value === user.id && pwInput.value === user.pw) {
      window.location.href = './welcome.html'
    } else {
      alert('아이디 또는 비밀번호를 잘못 입력했습니다.')
    }
  } else {
    alert('이메일과 비밀번호 형식을 확인해주세요.')
  }
}

idInput.addEventListener('input', handleIdValid);
pwInput.addEventListener('input', handlePwValid);
loginForm.addEventListener('submit', handleLogin);

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

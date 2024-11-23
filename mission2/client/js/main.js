import { data } from './data.js';
import { fadeUpImage } from '../lib/animation/index.js';
import { getNode, getNodes, css } from '../lib/dom/index.js';

const nav = getNode('.nav');
let currentAudio;

function handleActiveStatus(target) {
  const isActive = getNodes('.is-active');
  isActive.forEach((item) => item.classList.remove('is-active'));
  target.classList.add('is-active');
}

async function setImage(elemental) {
  const imgElement = getNode('.visual img');

  try {
    imgElement.src = `./assets/${elemental.name.toLowerCase()}.jpeg`;
    imgElement.alt = elemental.alt;

    fadeUpImage(imgElement);
  } catch (error) {
    console.error('이미지를 가져오지 못 했습니다! 오류 사유:', error);
  }
}

function setNameText(elemental) {
  const nameElement = getNode('.nickName');
  nameElement.textContent = elemental.name;
}

function setBgColor(elemental) {
  const colorB = elemental.color[1] || '#000';
  css(document.body, 'background', `linear-gradient(to bottom, ${elemental.color[0]}, ${colorB})`);
}

function stopAllAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

function playAudio(elemental) {
  stopAllAudio();
  currentAudio = new Audio(`./assets/audio/${elemental.name.toLowerCase()}.m4a`);
  currentAudio.play();
}

function handleNavClick(e) {
  e.preventDefault();

  const target = e.target.closest('li');
  if (!target) return;

  const index = target.dataset.index;
  const elemental = data[index - 1];

  handleActiveStatus(target);
  setBgColor(elemental);
  setImage(elemental);
  setNameText(elemental);
  playAudio(elemental);
}

nav.addEventListener('click', handleNavClick);

/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

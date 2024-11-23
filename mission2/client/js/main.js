import { data } from './data.js';
import { getNode, getNodes, css } from '../lib/dom/index.js';

const nav = getNode('.nav');
let currentAudio;

function handleActiveStatus(target) {
  const isActive = getNodes('.is-active');
  isActive.forEach((item) => item.classList.remove('is-active'));
  target.classList.add('is-active');
}

function updateImage(elemental) {
  const imgElement = getNode('.visual img');
  imgElement.src = `./assets/${elemental.name.toLowerCase()}.jpeg`;
  imgElement.alt = elemental.alt;
}

function updateBackground(elemental) {
  css(document.body, 'background', `linear-gradient(to bottom, ${elemental.color[0]}, ${elemental.color[1]})`);
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
  e.preventDefault;

  const target = e.target.closest('li');
  if (!target) return;

  const index = target.dataset.index;
  const elemental = data[index - 1];

  handleActiveStatus(target);
  updateImage(elemental);
  updateBackground(elemental);
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

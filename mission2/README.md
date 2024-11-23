# 엘리멘탈 영화 포스터 페이지

> 이 과제는 이미지를 클릭해서 배경색, 이미지를 변경하고 닉네임을 표시할 수 있습니다. <br/>
 그리고 이미지 별 적절한 오디오를 재생하며, GSAP을 사용해서 부드러운 이미지 전환 애니메이션을 보여줍니다.

## 목차
- [실행 화면 확인](#실행-화면-확인)
- [사용 함수](#사용-함수)
- [코드 흐름](#코드-흐름)
- [회고](#회고)

## 실행 화면 확인
[배포 사이트에서 확인하기](https://sungwoo00.github.io/js-homework/mission2/client/index.html)

## 사용 함수

### 1. `handleActiveStatus(target)`
> 클릭된 메뉴 항목에 `is-active` 클래스를 추가하여 활성화 상태를 표시합니다.

``` javascript 
function handleActiveStatus(target) {
  const isActive = getNodes('.is-active');
  isActive.forEach((item) => item.classList.remove('is-active'));
  target.classList.add('is-active');
}
```
- 기존에 활성화 됐던 항목의 `is-active` 클래스를 모두 제거합니다.
- 클릭된 항목에만 다시 `is-active` 클래스를 추가하여 활성화 상태를 표시합니다.

### 2. `setImage(elemental)`
> 클릭된 메뉴 항목에 맞는 이미지를 가져오고, 해당 이미지를 페이드업 애니메이션을 적용해서 표시해줍니다.

``` javascript
async function setImage(elemental) {
  const imgElement = getNode('.visual img');

  try {
    imgElement.src = `./assets/${elemental.name.toLowerCase()}.jpeg`;
    imgElement.alt = elemental.alt;

    fadeUpImage(imgElement);
  } catch (error) {
    console.error('이미지 로드 중 오류가 발생했습니다:', error);
  }
}

```
- try-catch로 이미지를 불러오지 못하면 오류를 보여줍니다.
- `elemental` 객체의 `name` 속성을 사용해 이미지 파일 경로를 만들어줍니다.
- 가져온 이미지에 `fadeUpImage` 애니메이션을 적용합니다.

### 3. `setNameText(elemental)`
> 클릭된 메뉴 항목에 맞는 이름을 페이지 상단에 표시합니다.

``` javascript 
function setNameText(elemental) {
  const nameElement = getNode('.nickName');
  nameElement.textContent = elemental.name;
}
```
- `elemental` 객체의 `name` 속성을 가져와서 `.nickName` 요소에 텍스트로 바꿔줍니다.

### 4. `setBgColor(elemental)`
> 선택된 메뉴 항목에 맞는 배경색을 변경합니다. `linear-gradient`를 사용하여 그라데이션 배경을 설정합니다.

``` javascript 
function setBgColor(elemental) {
  const colorB = elemental.color[1] || '#000';
  css(document.body, 'background', `linear-gradient(to bottom, ${elemental.color[0]}, ${colorB})`);
}
```
- `elemental` 객체의 `color` 배열에서 첫 번째와 두 번째 색을 사용해 배경 그라데이션을 설정합니다.
- 만약 두 번째 색(`color[1]`)이 제공되지 않으면 기본값인 `#000`을 사용합니다.

### 5. `stopAllAudio()`
> 현재 재생 중인 오디오를 멈추고 초기화 해줍니다.

``` javascript 
function stopAllAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}
```
- 현재 재생 중인 오디오가 있으면 멈추고 `currentTime`을 0으로 설정합니다.

### 6. `playAudio(elemental)`
> 클릭된 메뉴 항목에 맞는 오디오를 재생합니다.
``` javascript 

```
- `elemental` 객체의 `name` 속성을 사용해 오디오 파일 경로를 생성합니다.
- 새로운 오디오가 재생되기 전에 현재 재생 중인 오디오를 멈춥니다.

### 7. `handleNavClick(e)`
> 네비게이션 메뉴 항목을 클릭했을 때 발생하는 이벤트 핸들러입니다. 클릭된 항목에 맞는 배경색, 이미지, 이름, 오디오를 업데이트합니다.
``` javascript
function playAudio(elemental) {
  stopAllAudio();
  currentAudio = new Audio(`./assets/audio/${elemental.name.toLowerCase()}.m4a`);
  currentAudio.play();
}
```
#### 기능
- 클릭된 `li` 항목의 인덱스를 찾습니다.
- 인덱스를 사용하여 `data` 배열에서 해당 `data(elemental)` 객체를 찾습니다.
- `handleActiveStatus()`, `setBgColor()`, `setImage()`, `setNameText()`, `playAudio()`를 호출하여 UI를 업데이트하고 오디오를 재생합니다.

## 코드 흐름

1. **클릭 이벤트 처리**: 사용자가 이미지를 클릭하면 `handleNavClick()` 함수가 실행
2. **활성화 상태 업데이트**: `handleActiveStatus()` 함수가 클릭된 항목에 `is-active` 클래스를 추가
3. **배경색 업데이트**: `setBgColor()` 함수가 호출되어 배경색이 변경
4. **이미지 업데이트**: `setImage()` 함수는 이미지를 가져오고 애니메이션을 적용
5. **텍스트 업데이트**: `setNameText()` 함수는 이미지 상단의 텍스트를 업데이트
6. **오디오 재생**: `playAudio()` 함수가 오디오를 재생하고, `stopAllAudio()` 함수는 오디오 정지


## 회고
- 리드미 작성을 하며 다시 요구 사항들을 확인해봤는데 빼 먹은 것이 하나 있었다.
- 요구사항을 먼저 정리하지 않아서 코드를 조금 수정했다.
- 쓰다보니 자꾸 알려주셨던 것들이 기억나서 추가하다 보니까 시간이 조금 더 걸렸다.
- 에러 처리 부분에 error 페이지를 띄워주는 기능을 추가 하고 싶었지만 ~~시간 관계상 더이상은 무리일 것 같다...~~

- 앞으로는 **요구사항 먼저 정리**할것...⭐️💫





# Mission-0

> 이 글은 이번 과제에서 `Object.hasOwn`, `console.error`, 배열 범위 검사를 통해 조건을 만족한 값은 출력하고, 조건을 만족하지 못하는 경우 에러 메시지를 출력하는 코드를 구현하는데 사용한 메서드 및 코드 설명 글입니다.

---

## 🔎사용 가능 메서드

| 방법 | 설명 | 주의사항 |
|------|------|------|
| `hasOwnProperty` | 객체가 가진 속성이 있는지 확인 (상속받은 것은 제외) | 오래된 방식이라서 최신 환경에서는 Object.hasOwn() 사용을 권장함 |
| `in` | 객체가 가진 속성과 상속받은 속성까지 모두 확인  | 상속받은 속성도 true로 나와서 원하는 결과가 안나올 수 있음 |
| `Object.hasOwn`| **object.prototype.hasOwnProperty()을 대체**하기 위해 나온 최신 방식<br/> 객체가 가진 속성만 확인 (상속받은 것은 제외) | 최신 자바스크립트 환경에서 권장되는 방법이라서 레거시 코드를 사용하는 경우에는 `hasOwnProperty`를 사용해야할 수 있음  |
| `Object.keys().includes` | 객체의 키 목록을 배열로 변환하여 키 존재 여부 확인 | 큰 객체에서는 성능이 저하될 수 있음  |

> `프로토타입`은 자바스크립트의 모든 객체가 가지고 있는 내부 속성입니다. 다른 객체에게 속성과 메서드를 상속받을 수 있게 해주는 구조입니다. <br/>
`프로토타입 체인`은 객체가 찾으려고 하는 속성이 자신에게 없을 때 상위의 프로토타입들을 따라 올라가면서 찾는 것입니다.
---

## 📝 함수 설명

### 1. `getValueAtObject`

> 이 함수는 **`Object.hasOwn`**을 통해 객체에 해당 키가 있는지 확인하고, 있을 경우 그 값을 반환합니다. 키가 없는 경우 콘솔에 에러 메시지를 출력합니다.

```javascript
const person = {
  name: 'Sungwoo',
  age: 25,
  city: 'Daejeon',
};

function getValueAtObject(obj, key) {
  if (Object.hasOwn(obj, key)) {
    return obj[key];
  } else {
    console.error('해당 정보가 존재하지 않습니다!!!!!!!');
  }
}

// 출력 예상

console.log(getValueAtObject(person, 'name')); // "Sungwoo"
console.log(getValueAtObject(person, 'age'));  // 25
console.log(getValueAtObject(person, 'city')); // "Daejeon"
console.log(getValueAtObject(person, 'country')); // "해당 정보가 존재하지 않습니다!!!!!!!"

```
#### 출력 결과
![getValueAtObject 함수 출력 결과물](https://github.com/user-attachments/assets/e9f5ff98-1691-458b-bd7e-117c9d26c846)

### 2. `getNumberAtArray`

> 이 함수 **Object.hasOwn**과 배열의 길이를 사용하여 인덱스가 배열의 제한된 범위 안에 있는지 확인합니다. 인덱스가 유효하다면 해당 인덱스 값을 반환합니다. 인덱스가 제한된 범위를 벗어나면 콘솔에 에러 메시지가 출력됩니다.

```javascript
const numbers = [10, 20, 30, 40, 50];

function getNumberAtArray(arr, index) {
  if (Object.hasOwn(arr, index) && index >= 0 && index < arr.length) {
    return arr[index];
  } else {
    console.error('해당 값은 존재하지 않습니다!!!!!!!!!!!!!!!!');
  }
}

// 출력 예상 

console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
console.log(getNumberAtArray(numbers, 5)); // 해당 값은 존재하지 않습니다!!!!!!!!!!!!!!!!
console.log(getNumberAtArray(numbers, -1)); // 해당 값은 존재하지 않습니다!!!!!!!!!!!!!!!!

```

#### 출력 결과
![getNumberAtArray 함수 출력 결과물](https://github.com/user-attachments/assets/1dfb4a81-3173-475b-a8cf-df6f301fc257)

## 🌟 회고

- 과제를 보자마자 `includes`가 생각나서 사용하려고 했지만 다른 함수를 사용할 수 있는지 궁금해져서 찾아보다가 여러가지 방법을 통해 코드 구현이 가능한 것을 알게 되었다.
- `Object.hasOwn`은 객체 속성의 존재 여부를 검사하기 위해 만들어진 메서드라서 객체가 특정 키를 직접 소유하고 있는지 여부를 확인 가능합니다.
 - `includes`는 배열이나 문자열에서 특정 값이 포함되어 있는지 확인하기 위해 만들어졌습니다. 배열의 요소나 문자열의 하위 문자열을 찾는 데 최적화되어 있습니다. 또한 객체의 모든 키를 배열로 반환한 후 원하는 키를 찾기 때문에 객체에 키가 많다면 성능이 저하될 우려가 있습니다. 
- 해당 과제 같은 특정 키의 값을 안전하게 가져오기에는 `Object.hasOwn`이 의미와 목적에 맞고, 가독성도 확실하며 성능 측면에서도 includes보다 조금 더 낫다는 것을 알게 되었습니다~~



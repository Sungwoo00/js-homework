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

console.log(getValueAtObject(person, 'name')); // Sungwoo
console.log(getValueAtObject(person, 'age')); // 25
console.log(getValueAtObject(person, 'city')); // Daejeon
console.log(getValueAtObject(person, 'country')); // 해당 정보가 존재하지 않습니다!!!!!!!

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

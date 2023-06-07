const { createStore } = require("redux");

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

// reducer(state, action) -> data(state) 처리 담당 함수
// return data는 store에 저장
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// createStore -> data(state) 저장소
const countStore = createStore(countModifier);

const onChange = () => {
  // getState -> store에서 current state get
  number.innerText = countStore.getState();
};

// subscribe -> store(state)의 변화 감지시 callback
countStore.subscribe(onChange);

// dispatch -> action을 object(type 필수) 형태로 전달, reducer 실행
// action -> data에 상태(행동) 부여, reducer와 data(state)가 소통하는 매개
const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

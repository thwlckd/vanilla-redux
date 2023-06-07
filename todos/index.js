const { createStore } = require("redux");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = (text) => {
  // return action
  return { type: ADD_TODO, text };
};

const deleteTodo = (id) => {
  // return action
  return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // state 직접 수정 x -> 새로운 state return
      const newObj = { text: action.text, id: Date.now() };
      return [...state, newObj];
    case DELETE_TODO:
      const deleteObj = state.filter((toDo) => toDo.id !== action.id);
      return deleteObj;
    default:
      return state;
  }
};

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

const onSubmit = (event) => {
  event.preventDefault();

  const toDo = input.value;
  input.value = "";
  dispatchAddTodo(toDo);
};

const dispatchDeleteToDo = (event) => {
  event.preventDefault();

  const id = parseInt(event.target.parentNode.id); // id of li
  store.dispatch(deleteTodo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", onSubmit);

const store = createStore(reducer);
store.subscribe(paintToDos);

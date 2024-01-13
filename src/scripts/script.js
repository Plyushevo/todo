const userInput = document.getElementById("form__input_todo")
const todoList = document.getElementById('todo_ul_list')

let list = JSON.parse(localStorage.getItem("todoList"))

if (list) {
  list.forEach(element => {
    todoText = element;
    const todoItem = createTodoItem(todoText);
    todoList.appendChild(todoItem)

  });
} else {
  list = [];
}

function addTodo() {
  todoText = userInput.value.trim()
  if (todoText === ''){
    return
  }
  const todoItem = createTodoItem(todoText);
  todoList.appendChild(todoItem)
  pushToLocalstorage(todoText)
  userInput.value = ""
}

function pushToLocalstorage (todoText) {
  list.push(todoText)
  localStorage.setItem("todoList", JSON.stringify(list))
}


function createTodoItem(todoText) {
  const todoItem = document.createElement('li');
  todoItem.innerHTML = `
    <div class="todoItemForm">
      <div class="todoItem__submit_button"></div>
      <span class="todoItem-text">${todoText}</span>
      <div class="todoItem__delete_button"></div>
    </div>
  `
  return todoItem
}
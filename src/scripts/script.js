//consts
const addBtn = document.getElementById("form__submit_button")
const userInput = document.getElementById("form__input_todo")
const todoList = document.getElementById('todo_ul_list')
const footerCenter = document.querySelector('.footer__center')
const clearCompletedBtn = document.getElementById("clear_completed")
const clearFormBtn = document.getElementById("form__delete_button")

// Objects

function Task(text, completed) {
  this.text = text
  this.completed = false;
}

//eventlisteners
addBtn.addEventListener('click', addTodo)
userInput.addEventListener('keypress', addTodoOnEnter)
document.addEventListener('DOMContentLoaded', buildTodoOnLoad);
footerCenter.addEventListener('click', handleFilterClick)
clearCompletedBtn.addEventListener('click', deleteCompleted)
clearFormBtn.addEventListener('click', clearForm)

// functions
function buildTodoOnLoad () {
  let list = JSON.parse(localStorage.getItem("todoList"))
  if (list && list.length !== 0) {
    list.forEach(element => {
      let todoText = element.text;
      const task = new Task(todoText)
      const todoItem = createTodoItem(task);
      todoList.appendChild(todoItem)

    });
  } else {
    hideFooter()
    list = [];
    
  }
}

function hideFooter() {
  document.querySelector(".ul_list__footer").classList.add("hidden")
}
function showFooter() {
  document.querySelector(".ul_list__footer").classList.remove("hidden")
}

function addTodo() {
  
  let todoText = userInput.value.trim()
  if (todoText === ''){
    return
  }
  let task = new Task(todoText)
  const todoItem = createTodoItem(task);
  todoList.appendChild(todoItem)
  pushToLocalstorage(task)
  userInput.value = ""
  showFooter()
  counterChange()
}

function createTodoItem(task) {
  const todoItem = document.createElement('li');
  todoItem.innerHTML = `
    <div class="todoItemForm">
      <div class="todoItem__submit_button"></div>
      <span contentEditable="true" class="todoItem-text">${task.text}</span>
      <div class="todoItem__delete_button"></div>
    </div>
  `
  const todoForm = todoItem.querySelector(".todoItemForm")
  todoForm.classList.add("show")
  const deleteBtn = todoItem.querySelector(".todoItem__delete_button")
  deleteBtn.addEventListener('click', deleteTask)
  const endBtn = todoItem.querySelector(".todoItem__submit_button")
  endBtn.addEventListener('click', endTask)
  const todoItemText = todoItem.querySelector(".todoItem-text")
  // todoItemText.addEventListener('input', )
  return todoItem
}

function pushToLocalstorage (task) {
  let storage = JSON.parse(localStorage.getItem("todoList"))
  if (!storage) {
    storage = []
  }
  console.log(task)
  storage.push(task)
  localStorage.setItem("todoList", JSON.stringify(storage))
  console.log(storage)
}

function endTask(e) {
  const item = e.target;
  const todo = item.parentElement;
  const submitBtn = todo.querySelector('.todoItem__submit_button')
  todo.classList.toggle('completed')
  submitBtn.classList.toggle('completed-btn');
  counterChange()
}

function counterChange() {
  try {
    const storage = JSON.parse(localStorage.getItem("todoList"));
    let active = document.querySelectorAll(".completed")
    let counter = storage.length - active.length
    let counterElement = document.getElementById("todo__counter");
    if (counter < 0) {
      return
    } else if (counter === 1){
      counterElement.innerText = `${counter} task left`
    } else {
      counterElement.innerText = `${counter} tasks left`
    }
  } catch (e) {
    return
  }

}

function deleteTodoDiv(todo) {
  const todoTextElement = todo.querySelector('.todoItem-text')
  let todoText = todoTextElement ? todoTextElement.innerText : null;
  console.log(todoText)
  deleteTaskFromLocalstorage(todoText)
  todo.classList.remove("show")
  todo.classList.add("fade")
  setTimeout(() => {
    todo.remove();
  }, 1000);
  const storage = JSON.parse(localStorage.getItem("todoList"));
  if (storage.length === 0) {
    localStorage.clear()
    hideFooter()
  }
  counterChange()
}

function deleteTask(e) {
  const item = e.target;
  const todo = item.parentElement;
  deleteTodoDiv(todo)
}



function editTaskInLocalstorage (task) {
  let storage = JSON.parse(localStorage.getItem("todoList")) || [];
  let index = storage.indexOf(task)
  // if (index !== -1) {
  //   storage[i] = 
  // }

  localStorage.setItem("todoList", JSON.stringify(storage))
}

function deleteTaskFromLocalstorage (todoText) {
  let storage = JSON.parse(localStorage.getItem("todoList")) || [];

  let index = storage.findIndex(item => item.text === todoText);
  console.log(index)
  if (index !== -1) {
    storage.splice(index, 1)
  }
  localStorage.setItem("todoList", JSON.stringify(storage))
}

function showCompleted() {
  changeFontColor(document.getElementById("completed"))
  const todos = document.querySelectorAll(".todoItemForm")

  todos.forEach(todo => {
    const isCompleted = todo.classList.contains("completed")
    todo.classList.toggle("hidden", !isCompleted)
  })
}

function showAll() {
  changeFontColor(document.getElementById("all"))
  const todos = document.querySelectorAll(".todoItemForm")
  todos.forEach(todo => {
      todo.classList.remove("hidden")
  })
}

function showActive() {
  changeFontColor(document.getElementById("active"))
  const todos = document.querySelectorAll(".todoItemForm")
  todos.forEach(todo => {
    if(todo.classList.contains("completed")) {
      todo.classList.add("hidden")
    } else {
      todo.classList.remove("hidden")
    }
  })
}

function changeFontColor(currentFilter) {
  const filters = document.querySelectorAll('.footer__center div')
  filters.forEach(filter => {

    filter.classList.remove("currentFilterFont");
  });

  // Добавим класс выбранному фильтру
  currentFilter.classList.add("currentFilterFont");
}

function addTodoOnEnter (e) {
  if (e.key === 'Enter') {
    addTodo()
  }
}

function deleteCompleted() {
  completedTodos = document.querySelectorAll(".completed");
  completedTodos.forEach(todo => {
    deleteTodoDiv(todo)
  })
}

function handleFilterClick (e) {
  const clickedFilter = e.target;
  if (clickedFilter.tagName === 'DIV') {
    changeFontColor(clickedFilter)
    const filterType = clickedFilter.id
    switch(filterType) {
      case "all":
        showAll();
        break
      case 'active':
        showActive();
        break
      case "completed":
        showCompleted()
        break;
    }
  }
}

function clearForm () {
  document.getElementById("form__input_todo").value = ""
}
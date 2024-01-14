document.addEventListener('DOMContentLoaded', function () {
  //button that adds a new task
  const addBtn = document.getElementById("form__submit_button")
  // input
  const userInput = document.getElementById("form__input_todo")
  //ul where we put li
  const todoList = document.getElementById('todo_ul_list')
  // array of existing tasks from local storage
  let list = JSON.parse(localStorage.getItem("todoList"))

  // if array is'n empty - create a todo list from it
  if (list) {
    list.forEach(element => {
      todoText = element;
      const todoItem = createTodoItem(todoText);
      todoList.appendChild(todoItem)

    });
  // if empty - or undefined - create a new
  } else {
    list = [];
  }

  //eventlisteners

  addBtn.addEventListener('click', addTodo)
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTodo()
    }
  })


  // functions


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
    // look for just added del button 
    const deleteBtn = todoItem.querySelector(".todoItem__delete_button")
    // add an event listener to delete button
    deleteBtn.addEventListener('click', deleteTask)

    const endBtn = todoItem.querySelector(".todoItem__submit_button")

    endBtn.addEventListener('click', endTask)

    return todoItem
  }

  function endTask(e) {
    const item = e.target;
    const todo = item.parentElement;
    const submitBtn = todo.querySelector('.todoItem__submit_button')
    todo.classList.toggle('completed')
    submitBtn.classList.toggle('completed-btn');
  }

  function deleteTask(e) {
    const item = e.target;
    const todo = item.parentElement;
    const todoTextElement = todo.querySelector('.todoItem-text')
    todoText = todoTextElement.innerText;
    deleteTaskFromLocalstorage(todoText)
    todo.remove()
    
  }

  function deleteTaskFromLocalstorage (todoText) {
    const list = JSON.parse(localStorage.getItem("todoList"))
    const index = list.indexOf(todoText)

    if (index !== -1) {
      list.splice(index, 1)
    }
    localStorage.setItem("todoList", JSON.stringify(list))
  }


});
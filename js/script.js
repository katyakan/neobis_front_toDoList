let todos = [];
let username = '';

// DOM
const nameInput = document.querySelector('#name');
const newTodoForm = document.querySelector('#task-form');
const todoList = document.querySelector('#list-item');

//  localStorage
function loadLocalStorage() {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  username = localStorage.getItem('username') || '';
}
function saveLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('username', username);
}

// show todos
function displayTodos() {
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo);

    todoList.appendChild(todoItem);
  });
}

// todo item
function createTodoItem(todo) {
  const todoItem = document.createElement('div');
  todoItem.classList.add('item');

  const label = document.createElement('label');
  const input = document.createElement('input');
  const span = document.createElement('span');
  const content = document.createElement('div');
  const actions = document.createElement('div');
  const edit = document.createElement('button');
  const deleteButton = document.createElement('button');

  input.type = 'checkbox';
  input.checked = todo.done;
  span.classList.add('circle');
  span.classList.add(todo.category === 'personal' ? 'personal' : 'business');
  content.classList.add('all-todos');
  actions.classList.add('actions');
  edit.classList.add('edit');
  deleteButton.classList.add('delete');

  content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
  edit.innerHTML = 'Edit';
  deleteButton.innerHTML = 'Delete';

  label.appendChild(input);
  label.appendChild(span);
  actions.appendChild(edit);
  actions.appendChild(deleteButton);
  todoItem.appendChild(label);
  todoItem.appendChild(content);
  todoItem.appendChild(actions);

  if (todo.done) {
    todoItem.classList.add('done');
  }

  // Event listeners
  input.addEventListener('change', () => {
    todo.done = input.checked;
    saveLocalStorage();
    displayTodos();
  });

  edit.addEventListener('click', () => {
    content.querySelector('input').removeAttribute('readonly');
    content.querySelector('input').focus();
  });

  content.querySelector('input').addEventListener('blur', () => {
    content.querySelector('input').setAttribute('readonly', true);
    todo.content = content.querySelector('input').value;
    saveLocalStorage();
    displayTodos();
  });

  deleteButton.addEventListener('click', () => {
    todos = todos.filter((t) => t !== todo);
    saveLocalStorage();
    displayTodos();
  });

  return todoItem;
}

// Event listeners
window.addEventListener('load', () => {
  loadLocalStorage();

  nameInput.value = username;

  nameInput.addEventListener('change', () => {
    username = nameInput.value;
    saveLocalStorage();
  });

  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    saveLocalStorage();
    displayTodos();

    // Reset
    e.target.reset();
  });

  displayTodos();
});

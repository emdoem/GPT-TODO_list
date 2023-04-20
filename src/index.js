const taskForm = document.querySelector('form');
const taskInput = document.querySelector('input');
const taskList = document.querySelector('ul');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement('li');
    li.textContent = task;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    /*checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      renderTasks();
    });*/
    li.appendChild(checkbox);
    taskList.appendChild(li);
    // const deleteButton =
    }
};

function newRenderTasks() {

};

function addTask(event) {
  event.preventDefault();
  tasks.push(taskInput.value);
  taskInput.innerHTML = '';
  renderTasks();
}

taskForm.addEventListener('submit', addTask); 

renderTasks();

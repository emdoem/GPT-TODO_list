const taskForm = document.querySelector('form');
const taskInput = document.querySelector('input');
const taskList = document.querySelector('ul');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    // const task = tasks[i]; - replace a variable with an HTML node for styling purposes
    const task = document.createElement('a');
    task.textContent = tasks[i];
    const li = document.createElement('li');
    // 

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    /*checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      renderTasks();
    });*/
    li.appendChild(checkbox);
    li.appendChild(task);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      console.log('Delete this motherfucker!');
      tasks.splice(i, 1);
      renderTasks();
    });
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  }
};

function newRenderTasks() {

};

function addTask(event) {
  event.preventDefault();
  tasks.push(taskInput.value);
  taskInput.value = '';
  renderTasks();
}

taskForm.addEventListener('submit', addTask); 

renderTasks();

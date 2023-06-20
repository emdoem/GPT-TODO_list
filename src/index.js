const taskForm = document.querySelector('form');
const taskInput = document.querySelector('input');
const taskList = document.querySelector('ul');

const BASE_URL = "http://localhost:5000/tasks/";
const TasksAPI = {
  getAllTasks: async function() {
    const response = await makeRequest(BASE_URL, "GET");
    const tasks = await response.json();
    return tasks;
  }
}

async function makeRequest(url, method, body) {
  const jsonBody = body ? JSON.stringify(body) : undefined;
  const response = await window.fetch(url, {
          method: method,
          headers: {
              "Content-Type": "application/json"
          },
          body: jsonBody
      });
  if (!response.ok) {
      throw new Error("Sumting wong!");
  }
  return response;
}

let tasks;
 
function renderTasks() {
  taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
    // const task = tasks[i]; - replace a variable with an HTML node for styling purposes
    const task = document.createElement('a');
    task.textContent = tasks[i].title;
    console.log(tasks);
    const li = document.createElement('li');
    li.className = 'task';
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
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', () => {
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
  tasks.push({
    "title": taskInput.value,
    "checked": false
  });
  taskInput.value = '';
  renderTasks();
}

taskForm.addEventListener('submit', addTask); 

TasksAPI.getAllTasks()
  .then((tasksFromAPI) => {
    tasks = tasksFromAPI;
    renderTasks();
  });
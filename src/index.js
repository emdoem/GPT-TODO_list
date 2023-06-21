const taskForm = document.querySelector('form');
const taskInput = document.querySelector('input');
const taskList = document.querySelector('ul');

const BASE_URL = "http://localhost:5000/tasks/";
const tasksAPI = {
  getAllTasks: async function() {
    const response = await makeRequest(BASE_URL, "GET");
    const tasks = await response.json();
    return tasks;
  },
  addTask: async function(taskToAdd) {
    const response = await makeRequest(BASE_URL, "POST", taskToAdd);
    const addedTask = response.json();
    return addedTask;
  },
  checkTask: async function(idOfTaskToCheck) {
    const taskToCheck = await this.getTaskById(idOfTaskToCheck);
    console.log(taskToCheck);
    const updatedTask = {
      "checked": !taskToCheck.checked,
      // "title": "Checking this task!"
    };
    await makeRequest(
      BASE_URL + idOfTaskToCheck, 
      "PATCH",
      updatedTask
    );
    // console.log("Check it!");
  },
  removeTask: async function(idOfTaskToRemove) {
    await makeRequest(
        BASE_URL + idOfTaskToRemove, 
        "DELETE"
    )
  },
  getTaskById: async function(idOfTaskToGet) {
    const response = await makeRequest(BASE_URL + idOfTaskToGet, "GET");
    const task = await response.json();
    return task;
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
      const task = document.createElement('a');
      task.textContent = tasks[i].title;
      // console.log(tasks);
      const li = document.createElement('li');
      li.className = 'task';
      li.id = tasks[i].id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = tasks[i].checked;
      checkbox.addEventListener('change', () => {
        tasksAPI.checkTask(li.id);
        renderTasks();
      });
      li.appendChild(checkbox);
      li.appendChild(task);
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteButton';
      deleteButton.addEventListener('click', () => {
        tasksAPI.removeTask(li.id);
        renderTasks();
      });
      li.appendChild(deleteButton);

      taskList.appendChild(li);
    }
};


function addTask(event) {
  event.preventDefault();
  tasksAPI.addTask({
    "title": taskInput.value,
    "checked": false
  })
  taskInput.value = '';
  renderTasks();
}

taskForm.addEventListener('submit', addTask); 

tasksAPI.getAllTasks()
  .then((tasksFromAPI) => {
    tasks = tasksFromAPI;
    renderTasks();
    // console.log(getTaskById(4));
  });

  
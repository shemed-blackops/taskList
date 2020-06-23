const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

//event listeners

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", loadTasks);
  //add form
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTask);
}

function loadTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    let text;
    const li = document.createElement("li");
    li.classList.add("collection-item");
    text = document.createTextNode(task);
    li.appendChild(text);

    const link = document.createElement("a");
    link.classList.add("delete-item", "secondary-content");
    link.innerHTML = `<i class='fa fa-remove'></i>`;

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Cannot add empty task");
  } else {
    //create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");
    link.style.cursor = "pointer";
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class='fa fa-remove'></i>`;
    li.appendChild(link);

    taskList.appendChild(li);

    //save to local storage
    saveToLocalStorage(taskInput.value);

    taskInput.value = "";

    e.preventDefault();
  }
}

function saveToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
  let taskItem;
  taskItem = e.target.parentElement;
  if (taskItem.classList.contains("delete-item")) {
    const confirmDialog = confirm("Do you want to delete this Task");
    if (confirmDialog) {
      taskItem.parentElement.remove();

      //remove from localstorage
      removeTaskItemFromLocalStorage(taskItem.parentElement);
    }
  }
}
function removeTaskItemFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(e) {
  const confirmDialog = confirm("Delete all tasks? ");
  if (confirmDialog) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    clearFromLocalStorage();
  }
}

function clearFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    localStorage.removeItem("tasks");
  }
}
function filterTask(e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

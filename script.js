const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("superTasks")) || [];

function saveTasks() {
  localStorage.setItem("superTasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task${task.completed ? " completed" : ""}`;

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    const span = document.createElement("span");
    span.textContent = task.text;
    const time = document.createElement("time");
    time.textContent = task.timestamp;
    taskInfo.append(span, time);

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    buttonGroup.append(editBtn, deleteBtn);
    li.append(taskInfo, buttonGroup);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    const timestamp = new Date().toLocaleString();
    tasks.push({ text, completed: false, timestamp });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

renderTasks();
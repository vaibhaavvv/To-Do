document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){
    let taskInput = document.getElementById("taskInput");
    let dueDate = document.getElementById("dueDate").value;
    let category = document.getElementById("category").value;
    let taskText = taskInput.value.trim();

    if (taskText === ""){
        alert("Task cannot be empty!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = {text: taskText, dueDate, category, completed: false};
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    document.getElementById("dueDate").value = "";
    loadTasks();
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) =>{
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
            <span class="${task.completed ? "completed" : ""}">${task.text} (${task.category}) - <small>${task.dueDate || "No Due Date"}</small></span>
            <button class="edit" onclick="editTask(${index})">✏️</button>
            <button class="delete" onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(index){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let newText = prompt("Edit task:", tasks[index].text);
    let newDate = prompt("Enter new due date:", tasks[index].dueDate);
    let newCategory = prompt("Enter new category (Work/Personal/Shopping):", tasks[index].category);

    if (newText !== null && newText.trim() !== ""){
        tasks[index].text = newText.trim();
        tasks[index].dueDate = newDate || tasks[index].dueDate;
        tasks[index].category = newCategory || tasks[index].category;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
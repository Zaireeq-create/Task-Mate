// ================= Common Data =================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// ================= Dashboard Data =================
function updateDashboardData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("totalTasks", tasks.length + completedTasks.length);
    localStorage.setItem("completedTasksCount", completedTasks.length);
}

// ================= Tasks Page =================
const taskListElement = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");

if (taskListElement && addTaskBtn && taskInput) {

    function renderTasks() {
        taskListElement.innerHTML = "";
        tasks.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task}</td>
                <td>
                    <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            taskListElement.appendChild(row);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", deleteTask);
        });
    }

    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            taskInput.value = "";
            updateDashboardData();
            renderTasks();
        } else {
            alert("Please enter a valid task!");
        }
    }

    function deleteTask(event) {
        const index = event.target.getAttribute("data-index");
        tasks.splice(index, 1);
        updateDashboardData();
        renderTasks();
    }

    addTaskBtn.addEventListener("click", addTask);
    renderTasks();
}

// ================= Completed Page =================
const completedTaskList = document.getElementById("taskListCompleted");

if (completedTaskList) {

    function renderCompletedTasks() {
        completedTaskList.innerHTML = "";
        [...tasks, ...completedTasks].forEach((task, index) => {
            const isCompleted = completedTasks.includes(task);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task}</td>
                <td>
                    ${isCompleted 
                        ? `<button class="btn btn-danger undo-btn" data-task="${task}">Mark as Incomplete</button>` 
                        : `<button class="btn btn-success complete-btn" data-task="${task}">Mark as Completed</button>`
                    }
                </td>
            `;
            completedTaskList.appendChild(row);
        });

        document.querySelectorAll(".complete-btn").forEach(btn => btn.addEventListener("click", markAsCompleted));
        document.querySelectorAll(".undo-btn").forEach(btn => btn.addEventListener("click", markAsIncomplete));
    }

    function markAsCompleted(event) {
        const task = event.target.getAttribute("data-task");
        tasks = tasks.filter(t => t !== task);
        completedTasks.push(task);
        updateDashboardData();
        renderCompletedTasks();
    }

    function markAsIncomplete(event) {
        const task = event.target.getAttribute("data-task");
        completedTasks = completedTasks.filter(t => t !== task);
        tasks.push(task);
        updateDashboardData();
        renderCompletedTasks();
    }

    renderCompletedTasks();
}

// ================= Initial Dashboard Update =================
updateDashboardData();










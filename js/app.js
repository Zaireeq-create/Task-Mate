// ================= Global Data =================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// ================= Utility =================
function updateDashboardData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("totalTasks", tasks.length + completedTasks.length);
    localStorage.setItem("completedTasksCount", completedTasks.length);
}

// ================= Login =================
if (window.location.pathname.includes('index.html')) {
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "user" && password === "user123") {
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    });
}

// ================= Dashboard =================
if (window.location.pathname.includes('dashboard.html')) {
    let totalTasks = parseInt(localStorage.getItem("totalTasks")) || 0;
    let completedCount = parseInt(localStorage.getItem("completedTasksCount")) || 0;

    document.getElementById("totalTasks").innerText = totalTasks;
    document.getElementById("completedTasks").innerText = completedCount;

    var ctx = document.getElementById('taskChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Completed', 'Pending'],
            datasets: [{
                label: 'Tasks',
                data: [completedCount, totalTasks - completedCount],
                backgroundColor: ['#28a745', '#0056b3'],
                borderColor: ['#28a745', '#0056b3'],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// ================= Tasks Page =================
if (window.location.pathname.includes('tasks.html')) {
    const taskListElement = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");

    function renderTasks() {
        taskListElement.innerHTML = "";
        tasks.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task}</td>
                <td><button class="btn btn-danger delete-btn" data-index="${index}">Delete</button></td>
            `;
            taskListElement.appendChild(row);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => btn.addEventListener("click", deleteTask));
    }

    function addTask() {
        const newTask = taskInput.value.trim();
        if (!newTask) return alert("Please enter a valid task!");

        tasks.push(newTask);
        taskInput.value = "";
        updateDashboardData();
        renderTasks();
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
if (window.location.pathname.includes('completed.html')) {
   const completedTaskList = document.getElementById("completedTaskList");
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












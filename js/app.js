document.addEventListener("DOMContentLoaded", function() {

    // ===== LOGIN =====
    if (window.location.pathname.includes("index.html")) {
        const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", function(e) {
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

    // ===== DASHBOARD =====
    if (window.location.pathname.includes("dashboard.html")) {
        const totalTasks = parseInt(localStorage.getItem("totalTasks")) || 0;
        const completedTasks = parseInt(localStorage.getItem("completedTasksCount")) || 0;

        document.getElementById("totalTasks").innerText = totalTasks;
        document.getElementById("completedTasks").innerText = completedTasks;

        const ctx = document.getElementById("taskChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Completed", "Pending"],
                datasets: [{
                    label: "Tasks",
                    data: [completedTasks, totalTasks - completedTasks],
                    backgroundColor: ["#28a745", "#0056b3"],
                    borderColor: ["#28a745", "#0056b3"],
                    borderWidth: 1
                }]
            }
        });
    }

    // ===== TASKS PAGE =====
    if (window.location.pathname.includes("tasks.html")) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskList = document.getElementById("taskList");
        const taskInput = document.getElementById("taskInput");
        const addTaskBtn = document.getElementById("addTaskBtn");

        function updateDashboardData() {
            const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
            localStorage.setItem("totalTasks", tasks.length + completedTasks.length);
            localStorage.setItem("completedTasksCount", completedTasks.length);
        }

        function renderTasks() {
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${task}</td>
                    <td><button class="btn btn-danger delete-btn" data-index="${index}">Delete</button></td>
                `;
                taskList.appendChild(row);
            });

            document.querySelectorAll(".delete-btn").forEach(btn => {
                btn.addEventListener("click", deleteTask);
            });
        }

        function addTask() {
            const newTask = taskInput.value.trim();
            if (!newTask) return;
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
            updateDashboardData();
        }

        function deleteTask(e) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            updateDashboardData();
        }

        addTaskBtn.addEventListener("click", addTask);
        renderTasks();
    }

    // ===== COMPLETED PAGE =====
    if (window.location.pathname.includes("completed.html")) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        const completedTaskList = document.getElementById("completedTaskList");

        function updateDashboardData() {
            localStorage.setItem("totalTasks", tasks.length + completedTasks.length);
            localStorage.setItem("completedTasksCount", completedTasks.length);
        }

        function renderTasks() {
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
                            : `<button class="btn btn-success complete-btn" data-task="${task}">Mark as Completed</button>`}
                    </td>
                `;
                completedTaskList.appendChild(row);
            });

            document.querySelectorAll(".complete-btn").forEach(btn => btn.addEventListener("click", markAsCompleted));
            document.querySelectorAll(".undo-btn").forEach(btn => btn.addEventListener("click", markAsIncomplete));
        }

        function markAsCompleted(e) {
            const task = e.target.getAttribute("data-task");
            tasks = tasks.filter(t => t !== task);
            completedTasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
            renderTasks();
            updateDashboardData();
        }

        function markAsIncomplete(e) {
            const task = e.target.getAttribute("data-task");
            completedTasks = completedTasks.filter(t => t !== task);
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
            renderTasks();
            updateDashboardData();
        }

        renderTasks();
    }

});

















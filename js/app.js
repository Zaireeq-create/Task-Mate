document.addEventListener("DOMContentLoaded", function() {

  // -------- LOGIN PAGE --------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const validUsername = "user";
      const validPassword = "user123";

      if (username === validUsername && password === validPassword) {
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("error-message").style.display = "block";
      }
    });
  }

  // -------- DASHBOARD PAGE --------
  const totalTasksElem = document.getElementById("totalTasks");
  const completedTasksElem = document.getElementById("completedTasks");
  const taskChartElem = document.getElementById("taskChart");

  if (totalTasksElem && completedTasksElem && taskChartElem) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    totalTasksElem.innerText = tasks.length + completedTasks.length;
    completedTasksElem.innerText = completedTasks.length;

    // Chart
    const ctx = taskChartElem.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Tasks', 'Completed Tasks'],
        datasets: [{
          label: 'Tasks',
          data: [tasks.length + completedTasks.length, completedTasks.length],
          backgroundColor: ['#007bff', '#28a745'],
          borderColor: ['#007bff', '#28a745'],
          borderWidth: 1
        }]
      }
    });
  }

  // -------- TASKS PAGE --------
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskListElement = document.getElementById("taskList");

  if (taskInput && addTaskBtn && taskListElement) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
      taskListElement.innerHTML = "";
      tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${task}</td>
          <td>
            <button class="btn btn-success complete-btn" data-task="${task}">Complete</button>
            <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
          </td>
        `;
        taskListElement.appendChild(row);
      });

      // Attach delete listeners
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
          const index = e.target.getAttribute("data-index");
          tasks.splice(index, 1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderTasks();
        });
      });

      // Attach complete listeners
      document.querySelectorAll(".complete-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
          const taskName = e.target.getAttribute("data-task");
          tasks = tasks.filter(t => t !== taskName);
          let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
          completedTasks.push(taskName);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
          renderTasks();
        });
      });
    }

    addTaskBtn.addEventListener("click", function() {
      const newTask = taskInput.value.trim();
      if (newTask) {
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks();
      } else {
        alert("Please enter a valid task!");
      }
    });

    renderTasks();
  }

  // -------- COMPLETED PAGE --------
  const completedTaskList = document.getElementById("taskList");
  if (completedTaskList) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    function renderCompletedTasks() {
      completedTaskList.innerHTML = "";
      [...tasks, ...completedTasks].forEach((task, index) => {
        const isCompleted = completedTasks.includes(task);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${task}</td>
          <td>
            ${isCompleted ? 
              `<button class="btn btn-danger undo-btn" data-task="${task}">Mark as Incomplete</button>` :
              `<button class="btn btn-success complete-btn" data-task="${task}">Mark as Completed</button>`}
          </td>
        `;
        completedTaskList.appendChild(row);
      });

      document.querySelectorAll(".complete-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
          const taskName = e.target.getAttribute("data-task");
          tasks = tasks.filter(t => t !== taskName);
          completedTasks.push(taskName);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
          renderCompletedTasks();
        });
      });

      document.querySelectorAll(".undo-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
          const taskName = e.target.getAttribute("data-task");
          completedTasks = completedTasks.filter(t => t !== taskName);
          tasks.push(taskName);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
          renderCompletedTasks();
        });
      });
    }

    renderCompletedTasks();
  }

});









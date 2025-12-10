// Login Page 
if (window.location.pathname.includes('index.html')) {
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    // Get the username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Hardcoded password and username
    const validUsername = "user";
    const validPassword = "user123";

    // Check if the entered code is match with the password that i already set
    if (username === validUsername && password === validPassword) {
      //move to dashboard page on successful login
      window.location.href = "dashboard.html"; // Redirect to the actual dashboard
    } else {
      // Show the error message if the password are incorrect
      document.getElementById("error-message").style.display = "block";
    }
  });
}


//for dashboard.html
if (window.location.pathname.includes('dashboard.html')) {
  // Retrieve total tasks and completed tasks count from localStorage
  let totalTasks = localStorage.getItem("totalTasks") || 0;
  let completedTasks = localStorage.getItem("completedTasksCount") || 0;

  // Update the text content for total tasks and completed tasks
  document.getElementById("totalTasks").innerText = totalTasks;
  document.getElementById("completedTasks").innerText = completedTasks;

  //this is a bar chart using Chart.js
  var ctx = document.getElementById('taskChart').getContext('2d');
  var taskChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Completed', 'Pending'],
      datasets: [{
        label: 'Tasks',
        data: [completedTasks, totalTasks - completedTasks],  // Completed vs total tasks
        backgroundColor: ['#28a745', '#0056b3;'], // Green for completed anf red for total
        borderColor: ['#28a745', '#0056b3;'],
        borderWidth: 1
      }]
    }
  });
}


//for tasks.html
if (window.location.pathname.includes('tasks.html')) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to render tasks in the table
  function renderTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // Clear existing tasks

    // Log the tasks to see if it's being populated correctly
    console.log('Tasks: ', tasks); 

    tasks.forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${task}</td>
        <td><button class="btn btn-danger delete-btn" data-index="${index}">Delete</button></td>
      `;
      taskListElement.appendChild(row);
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
      button.addEventListener("click", deleteTask);
    });
  }

  // to add a new task
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const newTask = taskInput.value.trim();

    if (newTask) {
      tasks.push(newTask); // Add the new task to the tasks array
      localStorage.setItem("tasks", JSON.stringify(tasks)); // keep the tasks array in localStorage
      taskInput.value = ""; 
      renderTasks(); 
    } else 

    {
      console.log("Please enter a valid task!"); 
    }
  }

  // Function to delete a task
  function deleteTask(event) {
  const index = event.target.getAttribute("data-index");
  tasks.splice(index, 1); //remove tasks
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
  renderTasks();
  }

  document.getElementById("addTaskBtn").addEventListener("click", addTask);
  renderTasks();
}



//for completed.html
if (window.location.pathname.includes('completed.html')) {
  // Retrieve the data about tasks and completed tasks from the localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

  // Function to render both total and completed tasks in the same table
  function renderTasks() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // this wll clear the existing list
    
    [...tasks, ...completedTasks].forEach((task, index) => 
      {
      // this will Check if the task is completed
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
      taskListElement.appendChild(row);
    });

    document.querySelectorAll(".complete-btn").forEach(button => 
    {
      button.addEventListener("click", markAsCompleted);
    });

    document.querySelectorAll(".undo-btn").forEach(button =>
    {
      button.addEventListener("click", markAsIncomplete);
    });
  }

  //  mark a tasks that i add as completed
  function markAsCompleted(event) {
    const task = event.target.getAttribute("data-task");
    tasks = tasks.filter(t => t !== task); // Remove from tasks
    completedTasks.push(task); // and it will add to completed tasks
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks)); 
    renderTasks(); 
    updateDashboardData(); 
  }

  // Function to mark a task as incomplete in the table
  function markAsIncomplete(event) {
    const task = event.target.getAttribute("data-task");
    completedTasks = completedTasks.filter(t => t !== task); // Remove from completed tasks
    tasks.push(task); s
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));  
    renderTasks(); 
    updateDashboardData();
  }

  // Function to update dashboard data
  function updateDashboardData() {
    const totalTasks = tasks.length + completedTasks.length;
    const completedTaskCount = completedTasks.length;

    localStorage.setItem("totalTasks", totalTasks);
    localStorage.setItem("completedTasksCount", completedTaskCount);
    
  }
  renderTasks();
}



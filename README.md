# TaskMate – Task Manager Web Application

## Project Title
**TaskMate – Task Manager System**

---

## Project Description
TaskMate is a front-end web-based task management system that helps users organize, track, and complete tasks efficiently. The system uses a clean, modern interface with video backgrounds, tables for tasks, and visual charts to make task management easier and engaging.  

The system is entirely client-side, using **localStorage** to save task data without requiring a backend or database.

The project includes four main pages:
1. **Login Page** (`index.html`)
2. **Dashboard Page** (`dashboard.html`)
3. **Tasks Page** (`tasks.html`)
4. **Completed Tasks Page** (`completed.html`)

---

## Features Included

### 1. Login Page
- The login page contains:
  - Video background (`tmbckg.mp4`)
  - Logo image (`tmlogo.webp`)
  - Demo credentials displayed for testing:
    - Username: `user`
    - Password: `user123`
- JavaScript checks credentials on submit:
  - Correct credentials → redirects to **Dashboard**
  - Incorrect credentials → displays an error message `"Invalid username or password."`

### 2. Dashboard Page
- Displays task statistics and visualization:
  - **Total Tasks** – loaded from `localStorage`
  - **Completed Tasks** – loaded from `localStorage`
- Uses a **bar chart** via Chart.js to visualize the number of tasks vs. completed tasks
- Contains an **information section** explaining why task management matters, with icons using Lineicons
- Includes scrollable images with quotes (`q1.png` to `q4.png`) for motivational purposes
- Navigation bar links to Dashboard, Tasks, Completed Tasks, and Logout
- Video background (`tmbckg2.mp4`) for a visually engaging interface

### 3. Tasks Page
- Users can:
  - **Add new tasks** through an input field
  - View all tasks in a **table** with columns: number, task, actions
  - Tasks are saved in **localStorage** to persist across pages
- Tasks can later be marked as completed, updating the Completed Tasks page and dashboard counts
- Navigation bar and video background consistent with the dashboard

### 4. Completed Tasks Page
- Displays tasks that were marked as completed
- Table format: number, task, actions
- Data is dynamically loaded from **localStorage**
- Navigation bar and video background consistent with other pages

### 5. Visual and Interactive Features
- **Video backgrounds** for all main pages
- **Responsive layout** using Bootstrap grid system
- **Charts** using Chart.js to visualize tasks
- **Icons** using Lineicons for information and aesthetics
- **Footer** with copyright

---

## Instructions to Test the Application

### Login
1. Open `index.html`.
2. Enter demo credentials:
   - Username: `user`
   - Password: `user123`
3. Click **Login**.
4. Results:
   - Correct → Redirects to `dashboard.html`
   - Incorrect → Shows error message

### Dashboard
- Check **Total Tasks** and **Completed Tasks** counts
- Observe the **bar chart** reflecting these numbers
- Scroll to see motivational images and quotes

### Tasks Page
- Open `tasks.html`.
- Add a new task using the input field and “Add Task” button.
- The task appears in the table with a row number.
- Check that tasks are stored in **localStorage**, so they persist when you refresh the page.

### Completed Tasks Page
- Open `completed.html`.
- Tasks marked as completed from the Tasks page appear here.
- Tasks table dynamically updates based on `localStorage`.

---

## Frameworks and Libraries Used
- **HTML5 & CSS3** – structure and styling
- **JavaScript (Vanilla JS)** – dynamic functionality (`js/app.js`)
- **Bootstrap 5.3** – responsive layout and UI components
- **Chart.js** – bar chart visualization
- **Lineicons 5.0** – icons in the dashboard
- **LocalStorage API** – persist tasks and completed tasks across pages

---

## File Structure Overview

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');

  // Load tasks from local storage
  loadTasks();

  // Add task on button click
  addTaskButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
      addTask(task);
      taskInput.value = '';
    }
  });

  // Add task on Enter key press
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (task) {
        addTask(task);
        taskInput.value = '';
      }
    }
  });

  // Function to add a task
  function addTask(task) {
    const li = document.createElement('li');
    li.textContent = task;

    // Create edit and delete buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', () => editTask(li, task));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => deleteTask(li));

    // Append buttons to the list item
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Add list item to the list
    taskList.appendChild(li);
    saveTasks();
  }

  // Function to edit a task
  function editTask(li, oldTask) {
    const newTask = prompt('Edit task:', oldTask);
    if (newTask !== null && newTask.trim() !== '') {
      li.firstChild.textContent = newTask.trim();
      saveTasks();
    }
  }

  // Function to delete a task
  function deleteTask(li) {
    if (confirm('Are you sure you want to delete this task?')) {
      li.remove();
      saveTasks();
    }
  }

  // Function to save tasks to local storage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      addTask(task);
    });
  }
});

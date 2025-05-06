const addButton  = document.getElementById('addTask');
const exportBtn  = document.getElementById('export-btn');
const taskInput  = document.getElementById('taskInput');
const taskList   = document.getElementById('taskList');
const fileInput  = document.getElementById('myFileInput');
const imgPreview = document.getElementById('imgPreview');

// On page load
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadImage();
});

// Add suggestion
addButton.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (!task) {
    return alert('Please enter a suggestion below');
  }
  createTaskElement(task);
  taskInput.value = '';
  saveTasks();
});

function createTaskElement(task) {
  const li = document.createElement('li');
  li.textContent = task;

  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.className = 'deleteTask';
  del.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(del);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll('li'))
                     .map(li => li.firstChild.textContent.trim());
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(createTaskElement);
}

// Export as JSON
function exportJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

exportBtn.addEventListener('click', () => {
  const tasks = Array.from(taskList.querySelectorAll('li'))
                     .map(li => li.firstChild.textContent.trim());
  exportJSON(tasks, 'suggestions.json');
});

// Image upload + preview
fileInput.addEventListener('change', () => {
  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem('recent-image', reader.result);
    imgPreview.src = reader.result;
  };
  if (fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]);
  }
});

function loadImage() {
  const dataUrl = localStorage.getItem('recent-image');
  if (dataUrl) imgPreview.src = dataUrl;
}

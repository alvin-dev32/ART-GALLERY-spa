const addButton = document.getElementById('addTask'); 
const taskInput = document.getElementById('taskInput'); 
const taskList = document.getElementById('taskList');

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const task = taskInput.value.trim(); 

    if (task) { 
        createTaskElement(task); 
        taskInput.value = ''; // Clears input after adding
        saveTasks();
    } else {
        alert('Please enter a suggestion below');
    } 
}

// Listen for button clicks
addButton.addEventListener('click', addTask);

function createTaskElement(task) {
    const li = document.createElement('li'); 
    li.textContent = task; 

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteTask';

    // Delete button functionality
    deleteButton.addEventListener('click', function() {
        li.remove(); // Remove from UI
        saveTasks(); // Update localStorage
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item) {
        // Exclude the "Delete" text
        tasks.push(item.firstChild.textContent.trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

// Load tasks from localStorage when the page loads
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(createTaskElement);
}


document.querySelector("#myFileInput").addEventListener("change", function () { 
    const reader = new FileReader(); 

    reader.addEventListener("load", () => { 
        localStorage.setItem("recent-image", reader.result); 
        document.querySelector("#imgPreview").setAttribute("src", reader.result); // Show image immediately
    }); 

    reader.readAsDataURL(this.files[0]); 
});

document.addEventListener("DOMContentLoaded", () => { 
    const recentImageDataUrl = localStorage.getItem("recent-image"); 

    if (recentImageDataUrl) { // Fixed typo
        document.querySelector("#imgPreview").setAttribute("src", recentImageDataUrl);
    }
});

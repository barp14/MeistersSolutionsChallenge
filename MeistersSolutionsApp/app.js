const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');

const API_URL = 'http://localhost:8080/task';

function refreshTaskList() {
    // Fetch tasks from the backend and display them in the taskList element
    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = ''; // Clear the task list
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `${task.title} - ${task.description} (${task.status})`;

                // Add event listener to mark a task as completed or pending
                li.addEventListener('click', () => {
                    const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';
                    updateTaskStatus(task.id, updatedStatus);
                });

                // Add a delete button for each task
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteTask(task.id);
                });

                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        });
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const newTask = {
        title,
        description,
        status: 'pending'
    };

    createTask(newTask);
});

function createTask(task) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(response => {
        if (response.status === 200) {
            refreshTaskList();
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
        }
    });
}

function updateTaskStatus(taskId, status) {
    fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    })
    .then(response => {
        if (response.status === 204) {
            refreshTaskList();
        }
    });
}

function deleteTask(taskId) {
    fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 204) {
            refreshTaskList();
        }
    });
}

// Initial task list refresh
refreshTaskList();

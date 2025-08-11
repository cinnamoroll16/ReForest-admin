// Sample task data
let tasks = [
    {
        task_id: "TASK-1001",
        task_assignedTo: "John Doe",
        task_location: "North Sector (45.5017° N, 73.5673° W)",
        task_status: "in-progress",
        task_date: "2023-06-16"
    },
    {
        task_id: "TASK-1002",
        task_assignedTo: "Jane Smith",
        task_location: "East Valley (45.5112° N, 73.5541° W)",
        task_status: "pending",
        task_date: "2023-06-17"
    },
    {
        task_id: "TASK-1003",
        task_assignedTo: "Robert Chen",
        task_location: "West Ridge (45.4976° N, 73.5792° W)",
        task_status: "completed",
        task_date: "2023-06-15"
    },
    {
        task_id: "TASK-1004",
        task_assignedTo: "Maria Garcia",
        task_location: "South Slope (45.4893° N, 73.5628° W)",
        task_status: "in-progress",
        task_date: "2023-06-16"
    },
    {
        task_id: "TASK-1005",
        task_assignedTo: "John Doe",
        task_location: "Central Grove (45.5039° N, 73.5701° W)",
        task_status: "pending",
        task_date: "2023-06-18"
    }
];

// DOM Elements
const taskContainer = document.getElementById('taskContainer');
const statusFilter = document.getElementById('statusFilter');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const totalTasks = document.getElementById('totalTasks');
const pendingTasks = document.getElementById('pendingTasks');
const progressTasks = document.getElementById('progressTasks');
const completedTasks = document.getElementById('completedTasks');
const taskModal = document.getElementById('taskModal');
const closeBtn = document.querySelector('.close-btn');
const cancelBtn = document.getElementById('cancelBtn');
const taskForm = document.getElementById('taskForm');
const modalTitle = document.getElementById('modalTitle');
const taskIdInput = document.getElementById('taskId');
const assignedToInput = document.getElementById('assignedTo');
const taskLocationInput = document.getElementById('taskLocation');
const taskStatusInput = document.getElementById('taskStatus');
const taskDateInput = document.getElementById('taskDate');

// Set default dates
const today = new Date().toISOString().split('T')[0];
startDate.value = today;
endDate.value = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
taskDateInput.value = today;

// Display tasks
function displayTasks(data) {
    taskContainer.innerHTML = '';
    
    data.forEach(task => {
        const row = document.createElement('div');
        row.className = 'task-row';
        
        // Determine status class
        let statusClass = '';
        let statusText = '';
        switch(task.task_status) {
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'Pending';
                break;
            case 'in-progress':
                statusClass = 'status-in-progress';
                statusText = 'In Progress';
                break;
            case 'completed':
                statusClass = 'status-completed';
                statusText = 'Completed';
                break;
            case 'overdue':
                statusClass = 'status-overdue';
                statusText = 'Overdue';
                break;
        }
        
        // Check if task is overdue
        const taskDate = new Date(task.task_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (task.task_status !== 'completed' && taskDate < today) {
            statusClass = 'status-overdue';
            statusText = 'Overdue';
        }
        
        row.innerHTML = `
            <div>${task.task_id}</div>
            <div>${task.task_assignedTo}</div>
            <div>${task.task_location}</div>
            <div><span class="status-badge ${statusClass}">${statusText}</span></div>
            <div>${task.task_date}</div>
            <div class="task-actions">
                <button class="task-btn" onclick="editTask('${task.task_id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-btn" onclick="deleteTask('${task.task_id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="task-btn" onclick="viewTask('${task.task_id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        `;
        
        taskContainer.appendChild(row);
    });
    
    updateTaskStats(data);
}

// Update task statistics
function updateTaskStats(data) {
    totalTasks.textContent = data.length;
    
    const pendingCount = data.filter(task => {
        const taskDate = new Date(task.task_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (task.task_status === 'completed') return false;
        if (taskDate < today) return false;
        return task.task_status === 'pending';
    }).length;
    
    const progressCount = data.filter(task => task.task_status === 'in-progress').length;
    const completedCount = data.filter(task => task.task_status === 'completed').length;
    
    pendingTasks.textContent = pendingCount;
    progressTasks.textContent = progressCount;
    completedTasks.textContent = completedCount;
}

// Filter tasks
function filterTasks() {
    const statusValue = statusFilter.value;
    const startDateValue = startDate.value;
    const endDateValue = endDate.value;
    
    let filteredData = tasks;
    
    // Apply status filter
    if (statusValue !== 'all') {
        filteredData = filteredData.filter(task => {
            if (statusValue === 'overdue') {
                const taskDate = new Date(task.task_date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return task.task_status !== 'completed' && taskDate < today;
            }
            return task.task_status === statusValue;
        });
    }
    
    // Apply date filter
    if (startDateValue && endDateValue) {
        filteredData = filteredData.filter(task => {
            const taskDate = new Date(task.task_date);
            const start = new Date(startDateValue);
            const end = new Date(endDateValue);
            return taskDate >= start && taskDate <= end;
        });
    }
    
    displayTasks(filteredData);
}

// Open modal for adding new task
function openAddModal() {
    modalTitle.textContent = "Add New Planting Task";
    taskForm.reset();
    taskIdInput.value = '';
    taskModal.style.display = "block";
}

// Edit task
function editTask(taskId) {
    const task = tasks.find(t => t.task_id === taskId);
    if (task) {
        modalTitle.textContent = "Edit Planting Task";
        taskIdInput.value = task.task_id;
        assignedToInput.value = task.task_assignedTo;
        taskLocationInput.value = task.task_location;
        taskStatusInput.value = task.task_status;
        taskDateInput.value = task.task_date;
        taskModal.style.display = "block";
    }
}

// Delete task
function deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(task => task.task_id !== taskId);
        filterTasks();
    }
}

// View task details
function viewTask(taskId) {
    const task = tasks.find(t => t.task_id === taskId);
    if (task) {
        alert(`Task Details:\n\nID: ${task.task_id}\nAssigned To: ${task.task_assignedTo}\nLocation: ${task.task_location}\nStatus: ${task.task_status}\nDate: ${task.task_date}`);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const taskData = {
        task_id: taskIdInput.value || `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
        task_assignedTo: assignedToInput.value,
        task_location: taskLocationInput.value,
        task_status: taskStatusInput.value,
        task_date: taskDateInput.value
    };
    
    if (taskIdInput.value) {
        // Update existing task
        tasks = tasks.map(task => 
            task.task_id === taskIdInput.value ? taskData : task
        );
    } else {
        // Add new task
        tasks.unshift(taskData);
    }
    
    taskModal.style.display = "none";
    filterTasks();
}

// Event Listeners
statusFilter.addEventListener('change', filterTasks);
startDate.addEventListener('change', filterTasks);
endDate.addEventListener('change', filterTasks);
addTaskBtn.addEventListener('click', openAddModal);
closeBtn.addEventListener('click', () => taskModal.style.display = "none");
cancelBtn.addEventListener('click', () => taskModal.style.display = "none");
taskForm.addEventListener('submit', handleFormSubmit);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === taskModal) {
        taskModal.style.display = "none";
    }
});

// Initialize
filterTasks();
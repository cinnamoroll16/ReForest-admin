import React, { useState } from "react";

function TaskManager() {
  // Sample data
  const [tasks, setTasks] = useState([
    { task_id: "TASK-1001", task_assignedTo: "John Doe", task_location: "North Sector", task_status: "in-progress", task_date: "2023-06-16" },
    { task_id: "TASK-1002", task_assignedTo: "Jane Smith", task_location: "East Valley", task_status: "pending", task_date: "2023-06-17" },
    { task_id: "TASK-1003", task_assignedTo: "Robert Chen", task_location: "West Ridge", task_status: "completed", task_date: "2023-06-15" },
  ]);

  const [statusFilter, setStatusFilter] = useState("all");

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (statusFilter === "all") return true;
    return task.task_status === statusFilter;
  });

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.task_id !== id));
  };

  return (
    <div>
      <h2>🌱 Planting Tasks</h2>

      {/* Filter */}
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Task List */}
      <div>
        {filteredTasks.map(task => (
          <div key={task.task_id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
            <p><b>{task.task_id}</b> - {task.task_assignedTo}</p>
            <p>{task.task_location}</p>
            <p>Status: {task.task_status}</p>
            <p>Date: {task.task_date}</p>
            <button onClick={() => deleteTask(task.task_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;

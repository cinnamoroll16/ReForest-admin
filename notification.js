// Sample notification data
let notifications = [
    {
        notif_id: "NOTIF-1001",
        user_id: "USER-001",
        notif_message: "Your planting task in North Sector is due tomorrow",
        notif_timestamp: "2023-06-15 09:30:45",
        notification_type: "reminder",
        is_read: false
    },
    {
        notif_id: "NOTIF-1002",
        user_id: "USER-001",
        notif_message: "System maintenance scheduled for June 16, 2:00 AM - 4:00 AM",
        notif_timestamp: "2023-06-15 08:15:22",
        notification_type: "system",
        is_read: true
    },
    {
        notif_id: "NOTIF-1003",
        user_id: "USER-001",
        notif_message: "Alert: Temperature threshold exceeded in East Valley",
        notif_timestamp: "2023-06-14 14:30:18",
        notification_type: "alert",
        is_read: false
    },
    {
        notif_id: "NOTIF-1004",
        user_id: "USER-001",
        notif_message: "Task completed: West Ridge planting (TASK-1003)",
        notif_timestamp: "2023-06-14 11:45:33",
        notification_type: "task",
        is_read: true
    },
    {
        notif_id: "NOTIF-1005",
        user_id: "USER-001",
        notif_message: "New recommendation available for your assigned area",
        notif_timestamp: "2023-06-13 16:20:07",
        notification_type: "task",
        is_read: false
    }
];

// DOM Elements
const notificationContainer = document.getElementById('notificationContainer');
const typeFilter = document.getElementById('typeFilter');
const dateFilter = document.getElementById('dateFilter');
const markAllReadBtn = document.getElementById('markAllReadBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const totalNotifs = document.getElementById('totalNotifs');
const unreadNotifs = document.getElementById('unreadNotifs');
const alertsCount = document.getElementById('alertsCount');
const remindersCount = document.getElementById('remindersCount');

// Display notifications
function displayNotifications(data) {
    notificationContainer.innerHTML = '';
    
    if (data.length === 0) {
        notificationContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bell-slash"></i>
                <p>No notifications found</p>
            </div>
        `;
        return;
    }
    
    data.forEach(notif => {
        const notifItem = document.createElement('div');
        notifItem.className = `notification-item ${notif.is_read ? '' : 'unread'}`;
        
        // Determine icon and type class
        let icon, typeClass;
        switch(notif.notification_type) {
            case 'alert':
                icon = 'fas fa-exclamation-circle';
                typeClass = 'alert-type';
                break;
            case 'reminder':
                icon = 'fas fa-clock';
                typeClass = 'reminder-type';
                break;
            case 'system':
                icon = 'fas fa-cog';
                typeClass = 'system-type';
                break;
            case 'task':
                icon = 'fas fa-tasks';
                typeClass = 'task-type';
                break;
            default:
                icon = 'fas fa-info-circle';
                typeClass = '';
        }
        // Add this to your existing event listeners
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }

        // Add this function to your existing functions
        function handleLogout(e) {
            e.preventDefault();
            // Here you would typically:
            // 1. Clear session/token
            // 2. Redirect to login page
            console.log('Logging out...');
            alert('You have been logged out successfully!');
            window.location.href = 'signin.html'; // Uncomment to redirect
        }
        // Add click events to all action cards
        actionCards.forEach(card => {
            card.addEventListener('click', handleActionCardClick);
        });

        // Format timestamp
        const timestamp = new Date(notif.notif_timestamp);
        const formattedTime = timestamp.toLocaleString();
        
        notifItem.innerHTML = `
            <div class="notification-icon ${typeClass}">
                <i class="${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-message">${notif.notif_message}</div>
                <div class="notification-meta">
                    <span class="notification-type ${typeClass}">${notif.notification_type}</span>
                    <span class="notification-timestamp">${formattedTime}</span>
                </div>
            </div>
            <div class="notification-actions">
                <button class="notification-btn" onclick="markAsRead('${notif.notif_id}')" title="Mark as read">
                    <i class="fas fa-check"></i>
                </button>
                <button class="notification-btn" onclick="deleteNotification('${notif.notif_id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        notificationContainer.appendChild(notifItem);
    });
    
    updateNotificationStats();
}

// Update notification statistics
function updateNotificationStats() {
    totalNotifs.textContent = notifications.length;
    
    const unreadCount = notifications.filter(notif => !notif.is_read).length;
    unreadNotifs.textContent = unreadCount;
    
    const alerts = notifications.filter(notif => notif.notification_type === 'alert').length;
    const reminders = notifications.filter(notif => notif.notification_type === 'reminder').length;
    
    alertsCount.textContent = alerts;
    remindersCount.textContent = reminders;
}

// Filter notifications
function filterNotifications() {
    const typeValue = typeFilter.value;
    const dateValue = dateFilter.value;
    
    let filteredData = notifications;
    
    // Apply type filter
    if (typeValue !== 'all') {
        filteredData = filteredData.filter(notif => notif.notification_type === typeValue);
    }
    
    // Apply date filter
    if (dateValue !== 'all') {
        const now = new Date();
        let startDate;
        
        switch(dateValue) {
            case 'today':
                startDate = new Date(now.setHours(0, 0, 0, 0));
                break;
            case 'week':
                startDate = new Date(now.setDate(now.getDate() - now.getDay()));
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
        }
        
        filteredData = filteredData.filter(notif => {
            const notifDate = new Date(notif.notif_timestamp);
            return notifDate >= startDate;
        });
    }
    
    displayNotifications(filteredData);
}

// Mark notification as read
function markAsRead(notifId) {
    notifications = notifications.map(notif => 
        notif.notif_id === notifId ? {...notif, is_read: true} : notif
    );
    filterNotifications();
}

// Delete notification
function deleteNotification(notifId) {
    notifications = notifications.filter(notif => notif.notif_id !== notifId);
    filterNotifications();
}

// Mark all notifications as read
function markAllAsRead() {
    notifications = notifications.map(notif => ({...notif, is_read: true}));
    filterNotifications();
}

// Clear all notifications
function clearAllNotifications() {
    if (confirm("Are you sure you want to clear all notifications?")) {
        notifications = [];
        filterNotifications();
    }
}

// Event Listeners
typeFilter.addEventListener('change', filterNotifications);
dateFilter.addEventListener('change', filterNotifications);
markAllReadBtn.addEventListener('click', markAllAsRead);
clearAllBtn.addEventListener('click', clearAllNotifications);

// Initialize
filterNotifications();
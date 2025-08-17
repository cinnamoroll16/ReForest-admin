// Sample sensor data - in a real app this would come from an API
const sampleSensorData = [
    {
        sensorData_id: 1001,
        sensor_id: "SNSR-001",
        sensorData_soilMoisture: 65.2,
        sensorData_temperature: 22.5,
        sensorData_pH: 6.8,
        timestamp: "2023-06-15 09:30:45"
    },
    {
        sensorData_id: 1002,
        sensor_id: "SNSR-002",
        sensorData_soilMoisture: 58.7,
        sensorData_temperature: 23.1,
        sensorData_pH: 6.5,
        timestamp: "2023-06-15 09:31:10"
    },
    {
        sensorData_id: 1003,
        sensor_id: "SNSR-003",
        sensorData_soilMoisture: 72.4,
        sensorData_temperature: 21.8,
        sensorData_pH: 7.0,
        timestamp: "2023-06-15 09:31:35"
    },
    {
        sensorData_id: 1004,
        sensor_id: "SNSR-004",
        sensorData_soilMoisture: 63.9,
        sensorData_temperature: 22.9,
        sensorData_pH: 6.7,
        timestamp: "2023-06-15 09:32:00"
    },
    {
        sensorData_id: 1005,
        sensor_id: "SNSR-005",
        sensorData_soilMoisture: 59.3,
        sensorData_temperature: 23.5,
        sensorData_pH: 6.4,
        timestamp: "2023-06-15 09:32:25"
    }
];

// DOM Elements
const sensorDataContainer = document.getElementById('sensorDataContainer');
const refreshBtn = document.getElementById('refreshBtn');
const sensorFilter = document.getElementById('sensorFilter');
const updateTime = document.getElementById('updateTime');
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

// Display sensor data
function displaySensorData(data) {
    sensorDataContainer.innerHTML = '';
    
    data.forEach(sensor => {
        const row = document.createElement('div');
        row.className = 'sensor-data-row';
        
        row.innerHTML = `
            <div>${sensor.sensorData_id}</div>
            <div>${sensor.sensor_id}</div>
            <div class="data-value moisture-value">${sensor.sensorData_soilMoisture}%</div>
            <div class="data-value temp-value">${sensor.sensorData_temperature}°C</div>
            <div class="data-value ph-value">${sensor.sensorData_pH}</div>
            <div>${sensor.timestamp}</div>
        `;
        
        sensorDataContainer.appendChild(row);
    });
    
    updateSummaryMetrics(data);
    updateTimestamp();
}

// Update summary metrics
function updateSummaryMetrics(data) {
    const moistureSum = data.reduce((sum, sensor) => sum + sensor.sensorData_soilMoisture, 0);
    const tempSum = data.reduce((sum, sensor) => sum + sensor.sensorData_temperature, 0);
    const phSum = data.reduce((sum, sensor) => sum + sensor.sensorData_pH, 0);
    
    document.getElementById('avgMoisture').textContent = `${(moistureSum / data.length).toFixed(1)}%`;
    document.getElementById('avgTemp').textContent = `${(tempSum / data.length).toFixed(1)}°C`;
    document.getElementById('avgPH').textContent = (phSum / data.length).toFixed(2);
    document.getElementById('activeSensors').textContent = data.length;
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    updateTime.textContent = now.toLocaleTimeString();
}

// Filter sensors
function filterSensors() {
    const filterValue = sensorFilter.value.toLowerCase();
    const filteredData = sampleSensorData.filter(sensor => 
        sensor.sensor_id.toLowerCase().includes(filterValue)
    );
    displaySensorData(filteredData);
}

// Refresh data (simulated)
function refreshData() {
    // In a real app, this would fetch from an API
    const updatedData = sampleSensorData.map(sensor => ({
        ...sensor,
        sensorData_soilMoisture: (sensor.sensorData_soilMoisture + (Math.random() * 4 - 2)).toFixed(1),
        sensorData_temperature: (sensor.sensorData_temperature + (Math.random() * 1 - 0.5)).toFixed(1),
        sensorData_pH: (sensor.sensorData_pH + (Math.random() * 0.2 - 0.1)).toFixed(1),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }));
    
    displaySensorData(updatedData);
}

// Event Listeners
refreshBtn.addEventListener('click', refreshData);
sensorFilter.addEventListener('input', filterSensors);

// Initialize
displaySensorData(sampleSensorData);

// Simulate real-time updates (every 30 seconds)
setInterval(refreshData, 30000);
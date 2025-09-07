// Sample recommendation data
const sampleRecommendations = [
    {
        reco_id: "REC-1001",
        sensorData_id: "SNSR-001",
        inventory_Id: "INV-2023-001",
        seedling_Id1: "SP-ACER-001",
        seedling_name1: "Acer saccharum",
        seedling_Id2: "SP-QUER-002",
        seedling_name2: "Quercus rubra",
        seedling_Id3: "SP-BETU-003",
        seedling_name3: "Betula papyrifera",
        reco_confidenceScore: 87,
        reco_generatedAt: "2023-06-15 10:15:22"
    },
    {
        reco_id: "REC-1002",
        sensorData_id: "SNSR-002",
        inventory_Id: "INV-2023-002",
        seedling_Id1: "SP-PINU-004",
        seedling_name1: "Pinus strobus",
        seedling_Id2: "SP-TSUG-005",
        seedling_name2: "Tsuga canadensis",
        seedling_Id3: "SP-PICE-006",
        seedling_name3: "Picea glauca",
        reco_confidenceScore: 92,
        reco_generatedAt: "2023-06-15 10:17:45"
    },
    {
        reco_id: "REC-1003",
        sensorData_id: "SNSR-003",
        inventory_Id: "INV-2023-003",
        seedling_Id1: "SP-POPU-007",
        seedling_name1: "Populus tremuloides",
        seedling_Id2: "SP-SALI-008",
        seedling_name2: "Salix nigra",
        seedling_Id3: "SP-ULMU-009",
        seedling_name3: "Ulmus americana",
        reco_confidenceScore: 78,
        reco_generatedAt: "2023-06-15 10:20:03"
    },
    {
        reco_id: "REC-1004",
        sensorData_id: "SNSR-004",
        inventory_Id: "INV-2023-004",
        seedling_Id1: "SP-FRAX-010",
        seedling_name1: "Fraxinus americana",
        seedling_Id2: "SP-JUGL-011",
        seedling_name2: "Juglans nigra",
        seedling_Id3: "SP-CARY-012",
        seedling_name3: "Carya ovata",
        reco_confidenceScore: 65,
        reco_generatedAt: "2023-06-15 10:22:30"
    },
    {
        reco_id: "REC-1005",
        sensorData_id: "SNSR-005",
        inventory_Id: "INV-2023-005",
        seedling_Id1: "SP-ABIE-013",
        seedling_name1: "Abies balsamea",
        seedling_Id2: "SP-LARI-014",
        seedling_name2: "Larix laricina",
        seedling_Id3: "SP-THUI-015",
        seedling_name3: "Thuja occidentalis",
        reco_confidenceScore: 45,
        reco_generatedAt: "2023-06-15 10:25:15"
    }
];

// DOM Elements
const recommendationContainer = document.getElementById('recommendationContainer');
const confidenceFilter = document.getElementById('confidenceFilter');
const sensorFilter = document.getElementById('sensorFilter');
const generateBtn = document.getElementById('generateBtn');
const totalRecos = document.getElementById('totalRecos');
const highConfidence = document.getElementById('highConfidence');
const avgConfidence = document.getElementById('avgConfidence');
const readyInventory = document.getElementById('readyInventory');

// Display recommendations
function displayRecommendations(data) {
    recommendationContainer.innerHTML = '';
    
    data.forEach(reco => {
        const row = document.createElement('div');
        row.className = 'recommendation-row';
        
        // Determine confidence class
        let confidenceClass = '';
        if (reco.reco_confidenceScore >= 80) {
            confidenceClass = 'high-confidence';
        } else if (reco.reco_confidenceScore >= 50) {
            confidenceClass = 'medium-confidence';
        } else {
            confidenceClass = 'low-confidence';
        }
        
        row.innerHTML = `
            <div>${reco.reco_id}</div>
            <div>${reco.sensorData_id}</div>
            <div>${reco.inventory_Id}</div>
            <div class="species-list">
                <div class="species-item">
                    <span class="species-name">1. ${reco.seedling_name1}</span>
                    <span class="species-id">${reco.seedling_Id1}</span>
                </div>
                <div class="species-item">
                    <span class="species-name">2. ${reco.seedling_name2}</span>
                    <span class="species-id">${reco.seedling_Id2}</span>
                </div>
                <div class="species-item">
                    <span class="species-name">3. ${reco.seedling_name3}</span>
                    <span class="species-id">${reco.seedling_Id3}</span>
                </div>
            </div>
            <div>
                <span class="confidence-badge ${confidenceClass}">
                    ${reco.reco_confidenceScore}%
                </span>
            </div>
            <div>${reco.reco_generatedAt}</div>
            <div>
                <button class="action-btn" onclick="implementRecommendation('${reco.reco_id}')">
                    Implement
                </button>
            </div>
        `;
        
        recommendationContainer.appendChild(row);
    });
    
    updateStats(data);
}

// Update statistics
function updateStats(data) {
    totalRecos.textContent = data.length;
    
    const highConfidenceCount = data.filter(reco => reco.reco_confidenceScore >= 80).length;
    highConfidence.textContent = highConfidenceCount;
    
    const avgConfidenceValue = data.reduce((sum, reco) => sum + reco.reco_confidenceScore, 0) / data.length;
    avgConfidence.textContent = `${avgConfidenceValue.toFixed(1)}%`;
    
    readyInventory.textContent = data.length; // In real app, this would check actual inventory
}

// Filter recommendations
function filterRecommendations() {
    const confidenceValue = confidenceFilter.value;
    const sensorValue = sensorFilter.value.toLowerCase();
    
    let filteredData = sampleRecommendations;
    
    // Apply confidence filter
    if (confidenceValue !== 'all') {
        filteredData = filteredData.filter(reco => {
            if (confidenceValue === 'high') return reco.reco_confidenceScore >= 80;
            if (confidenceValue === 'medium') return reco.reco_confidenceScore >= 50 && reco.reco_confidenceScore < 80;
            if (confidenceValue === 'low') return reco.reco_confidenceScore < 50;
            return true;
        });
    }
    
    // Apply sensor filter
    if (sensorValue) {
        filteredData = filteredData.filter(reco => 
            reco.sensorData_id.toLowerCase().includes(sensorValue)
        );
    }
    
    displayRecommendations(filteredData);
}

// Generate new recommendations (simulated)
function generateNewRecommendations() {
    // In a real app, this would call an API
    alert("New recommendations are being generated based on latest sensor data...");
    
    // Simulate new data after a delay
    setTimeout(() => {
        const newReco = {
            reco_id: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
            sensorData_id: `SNSR-00${Math.floor(1 + Math.random() * 5)}`,
            inventory_Id: `INV-2023-00${Math.floor(1 + Math.random() * 5)}`,
            seedling_Id1: `SP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
            seedling_name1: "New Species " + Math.floor(1 + Math.random() * 20),
            seedling_Id2: `SP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
            seedling_name2: "New Species " + Math.floor(1 + Math.random() * 20),
            seedling_Id3: `SP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
            seedling_name3: "New Species " + Math.floor(1 + Math.random() * 20),
            reco_confidenceScore: Math.floor(30 + Math.random() * 70),
            reco_generatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        
        sampleRecommendations.unshift(newReco);
        filterRecommendations();
    }, 2000);
}

// Implement recommendation
function implementRecommendation(recoId) {
    const reco = sampleRecommendations.find(r => r.reco_id === recoId);
    if (reco) {
        alert(`Implementing recommendation ${recoId}\nPrimary species: ${reco.seedling_name1}\nConfidence: ${reco.reco_confidenceScore}%`);
        // In real app, this would trigger workflow to assign planting tasks
    }
}

// Event Listeners
confidenceFilter.addEventListener('change', filterRecommendations);
sensorFilter.addEventListener('input', filterRecommendations);
generateBtn.addEventListener('click', generateNewRecommendations);
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
// Initialize
displayRecommendations(sampleRecommendations);
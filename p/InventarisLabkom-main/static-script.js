// Data Storage
let hardwareData = [];
let softwareData = [];
let currentEditId = null;
let currentDeleteTarget = null;
let currentDeleteType = null;

// Initialize with sample data
function initializeSampleData() {
    hardwareData = [
        {
            id: 'HW001',
            name: 'Dell OptiPlex 7090',
            category: 'Komputer',
            specs: 'Intel Core i7-11700, 16GB RAM, 512GB SSD',
            lab: 'Lab 101',
            status: 'Baik',
            warranty: '2025-12-31',
            purchaseDate: '2023-01-15'
        },
        {
            id: 'HW002',
            name: 'HP Pavilion 15',
            category: 'Laptop',
            specs: 'AMD Ryzen 5 5600H, 8GB RAM, 256GB SSD',
            lab: 'Lab 102',
            status: 'Baik',
            warranty: '2024-06-30',
            purchaseDate: '2022-06-15'
        },
        {
            id: 'HW003',
            name: 'LG UltraWide 34"',
            category: 'Monitor',
            specs: '3440x1440, IPS, 75Hz',
            lab: 'Lab 103',
            status: 'Perlu Maintenance',
            warranty: '2024-03-15',
            purchaseDate: '2022-03-15'
        },
        {
            id: 'HW004',
            name: 'Canon Pixma G3010',
            category: 'Printer',
            specs: 'All-in-One, Wi-Fi, Ink Tank',
            lab: 'Lab 101',
            status: 'Rusak',
            warranty: '2023-12-31',
            purchaseDate: '2021-12-01'
        },
        {
            id: 'HW005',
            name: 'Lenovo ThinkPad X1',
            category: 'Laptop',
            specs: 'Intel Core i7-12700, 32GB RAM, 1TB SSD',
            lab: 'Lab 104',
            status: 'Baik',
            warranty: '2026-08-20',
            purchaseDate: '2024-08-20'
        }
    ];

    softwareData = [
        {
            id: 'SW001',
            name: 'Windows 11 Pro',
            vendor: 'Microsoft',
            category: 'OS',
            license: 'Perpetual',
            quantity: 50,
            expiry: '2099-12-31',
            notes: 'Volume License'
        },
        {
            id: 'SW002',
            name: 'Microsoft Office 365',
            vendor: 'Microsoft',
            category: 'Office',
            license: 'Subscription',
            quantity: 100,
            expiry: '2025-12-31',
            notes: 'Education License'
        },
        {
            id: 'SW003',
            name: 'Visual Studio 2022',
            vendor: 'Microsoft',
            category: 'Development',
            license: 'Subscription',
            quantity: 30,
            expiry: '2025-06-30',
            notes: 'Professional Edition'
        },
        {
            id: 'SW004',
            name: 'Adobe Creative Cloud',
            vendor: 'Adobe',
            category: 'Design',
            license: 'Subscription',
            quantity: 20,
            expiry: '2025-03-31',
            notes: 'All Apps Plan'
        },
        {
            id: 'SW005',
            name: 'MySQL Community',
            vendor: 'Oracle',
            category: 'Database',
            license: 'Open Source',
            quantity: 999,
            expiry: '',
            notes: 'GPL License'
        }
    ];

    saveToLocalStorage();
}

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('hardwareData', JSON.stringify(hardwareData));
    localStorage.setItem('softwareData', JSON.stringify(softwareData));
}

function loadFromLocalStorage() {
    const savedHardware = localStorage.getItem('hardwareData');
    const savedSoftware = localStorage.getItem('softwareData');

    if (savedHardware) {
        hardwareData = JSON.parse(savedHardware);
    } else {
        initializeSampleData();
    }

    if (savedSoftware) {
        softwareData = JSON.parse(savedSoftware);
    }
}

// Login Functions
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (in production, use proper authentication)
    if (username && password) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainApp').style.display = 'flex';
        loadFromLocalStorage();
        updateDashboard();
        renderHardwareTable();
        renderSoftwareTable();
    } else {
        alert('Username dan password harus diisi!');
    }
});

// Logout Function
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        document.getElementById('mainApp').style.display = 'none';
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('loginForm').reset();
    }
});

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');

        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Show corresponding page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page + 'Page').classList.add('active');

        // Update content
        if (page === 'dashboard') {
            updateDashboard();
        } else if (page === 'hardware') {
            renderHardwareTable();
        } else if (page === 'software') {
            renderSoftwareTable();
        }
    });
});

// Dashboard Functions
function updateDashboard() {
    // Calculate stats
    const totalHardware = hardwareData.length;
    const totalSoftware = softwareData.length;
    const needMaintenance = hardwareData.filter(hw => hw.status === 'Perlu Maintenance').length;
    const retiredHardware = hardwareData.filter(hw => hw.status === 'Retired').length;
    
    const today = new Date();
    const expiredWarranty = hardwareData.filter(hw => {
        if (hw.warranty) {
            return new Date(hw.warranty) < today;
        }
        return false;
    }).length;

    // Update stat cards
    document.getElementById('totalHardware').textContent = totalHardware;
    document.getElementById('totalSoftware').textContent = totalSoftware;
    document.getElementById('needMaintenance').textContent = needMaintenance;
    document.getElementById('retiredHardware').textContent = retiredHardware;

    // Category counts
    const categories = ['Komputer', 'Laptop', 'Monitor', 'Printer'];
    categories.forEach(cat => {
        const count = hardwareData.filter(hw => hw.category === cat).length;
        const elementId = 'count' + cat;
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = count;
        }
    });

    // Status counts
    document.getElementById('statusGood').textContent = 
        hardwareData.filter(hw => hw.status === 'Baik').length;
    document.getElementById('statusMaintenance').textContent = needMaintenance;
    document.getElementById('statusBroken').textContent = 
        hardwareData.filter(hw => hw.status === 'Rusak').length;
    document.getElementById('statusRetired').textContent = retiredHardware;
}

// Hardware Functions
function renderHardwareTable() {
    const tbody = document.getElementById('hardwareTableBody');
    const searchTerm = document.getElementById('hardwareSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    let filteredData = hardwareData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                            item.id.toLowerCase().includes(searchTerm) ||
                            item.specs.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesStatus = !statusFilter || item.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    tbody.innerHTML = '';

    filteredData.forEach(item => {
        const row = document.createElement('tr');
        const statusClass = item.status === 'Baik' ? 'baik' : 
                          item.status === 'Perlu Maintenance' ? 'maintenance' : 
                          item.status === 'Retired' ? 'retired' : 'rusak';
        
        const warrantyDate = item.warranty ? new Date(item.warranty).toLocaleDateString('id-ID') : '-';
        
        row.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.specs}</td>
            <td>${item.lab || '-'}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>${warrantyDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit" onclick="editHardware('${item.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="deleteHardware('${item.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hardware Modal Functions
function openHardwareModal() {
    document.getElementById('hardwareModalTitle').textContent = 'Tambah Hardware';
    document.getElementById('hardwareForm').reset();
    document.getElementById('hardwareId').value = '';
    toggleRetiredFields(); // Check initial state
    document.getElementById('hardwareModal').classList.add('active');
}

function closeHardwareModal() {
    document.getElementById('hardwareModal').classList.remove('active');
    currentEditId = null;
}

// Toggle Retired Fields
function toggleRetiredFields() {
    const status = document.getElementById('hardwareStatus').value;
    const retiredDateGroup = document.getElementById('retiredDateGroup');
    const retiredNotesGroup = document.getElementById('retiredNotesGroup');
    
    if (status === 'Retired') {
        retiredDateGroup.style.display = 'block';
        retiredNotesGroup.style.display = 'block';
    } else {
        retiredDateGroup.style.display = 'none';
        retiredNotesGroup.style.display = 'none';
    }
}

function editHardware(id) {
    const item = hardwareData.find(hw => hw.id === id);
    if (item) {
        document.getElementById('hardwareModalTitle').textContent = 'Edit Hardware';
        document.getElementById('hardwareId').value = item.id;
        document.getElementById('hardwareName').value = item.name;
        document.getElementById('hardwareCategory').value = item.category;
        document.getElementById('hardwareSpecs').value = item.specs;
        document.getElementById('hardwareLab').value = item.lab || '';
        document.getElementById('hardwareStatus').value = item.status;
        document.getElementById('hardwareWarranty').value = item.warranty || '';
        document.getElementById('hardwarePurchaseDate').value = item.purchaseDate || '';
        document.getElementById('hardwareRetiredDate').value = item.retiredDate || '';
        document.getElementById('hardwareRetiredNotes').value = item.retiredNotes || '';
        toggleRetiredFields(); // Show/hide retired fields based on status
        currentEditId = id;
        document.getElementById('hardwareModal').classList.add('active');
    }
}

function deleteHardware(id) {
    currentDeleteTarget = id;
    currentDeleteType = 'hardware';
    document.getElementById('deleteModal').classList.add('active');
}

// Hardware Form Submit
document.getElementById('hardwareForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('hardwareName').value,
        category: document.getElementById('hardwareCategory').value,
        specs: document.getElementById('hardwareSpecs').value,
        lab: document.getElementById('hardwareLab').value,
        status: document.getElementById('hardwareStatus').value,
        warranty: document.getElementById('hardwareWarranty').value,
        purchaseDate: document.getElementById('hardwarePurchaseDate').value,
        retiredDate: document.getElementById('hardwareRetiredDate').value,
        retiredNotes: document.getElementById('hardwareRetiredNotes').value
    };

    if (currentEditId) {
        // Edit existing
        const index = hardwareData.findIndex(hw => hw.id === currentEditId);
        if (index !== -1) {
            hardwareData[index] = { ...hardwareData[index], ...formData };
        }
    } else {
        // Add new
        const newId = 'HW' + String(hardwareData.length + 1).padStart(3, '0');
        hardwareData.push({ id: newId, ...formData });
    }

    saveToLocalStorage();
    renderHardwareTable();
    updateDashboard();
    closeHardwareModal();
});

// Add Hardware Button
document.getElementById('addHardwareBtn').addEventListener('click', openHardwareModal);

// Hardware Search and Filters
document.getElementById('hardwareSearch').addEventListener('input', renderHardwareTable);
document.getElementById('categoryFilter').addEventListener('change', renderHardwareTable);
document.getElementById('statusFilter').addEventListener('change', renderHardwareTable);

// Software Functions
function renderSoftwareTable() {
    const tbody = document.getElementById('softwareTableBody');
    const searchTerm = document.getElementById('softwareSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('softwareCategoryFilter').value;

    let filteredData = softwareData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                            item.id.toLowerCase().includes(searchTerm) ||
                            item.vendor.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    tbody.innerHTML = '';

    filteredData.forEach(item => {
        const row = document.createElement('tr');
        const expiryDate = item.expiry ? new Date(item.expiry).toLocaleDateString('id-ID') : '-';
        
        row.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>${item.name}</td>
            <td>${item.vendor}</td>
            <td>${item.category}</td>
            <td>${item.license}</td>
            <td>${item.quantity}</td>
            <td>${expiryDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit" onclick="editSoftware('${item.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="deleteSoftware('${item.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Software Modal Functions
function openSoftwareModal() {
    document.getElementById('softwareModalTitle').textContent = 'Tambah Software';
    document.getElementById('softwareForm').reset();
    document.getElementById('softwareId').value = '';
    document.getElementById('softwareModal').classList.add('active');
}

function closeSoftwareModal() {
    document.getElementById('softwareModal').classList.remove('active');
    currentEditId = null;
}

function editSoftware(id) {
    const item = softwareData.find(sw => sw.id === id);
    if (item) {
        document.getElementById('softwareModalTitle').textContent = 'Edit Software';
        document.getElementById('softwareId').value = item.id;
        document.getElementById('softwareName').value = item.name;
        document.getElementById('softwareVendor').value = item.vendor;
        document.getElementById('softwareCategory').value = item.category;
        document.getElementById('softwareLicense').value = item.license;
        document.getElementById('softwareQuantity').value = item.quantity;
        document.getElementById('softwareExpiry').value = item.expiry || '';
        document.getElementById('softwareNotes').value = item.notes || '';
        currentEditId = id;
        document.getElementById('softwareModal').classList.add('active');
    }
}

function deleteSoftware(id) {
    currentDeleteTarget = id;
    currentDeleteType = 'software';
    document.getElementById('deleteModal').classList.add('active');
}

// Software Form Submit
document.getElementById('softwareForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('softwareName').value,
        vendor: document.getElementById('softwareVendor').value,
        category: document.getElementById('softwareCategory').value,
        license: document.getElementById('softwareLicense').value,
        quantity: parseInt(document.getElementById('softwareQuantity').value),
        expiry: document.getElementById('softwareExpiry').value,
        notes: document.getElementById('softwareNotes').value
    };

    if (currentEditId) {
        // Edit existing
        const index = softwareData.findIndex(sw => sw.id === currentEditId);
        if (index !== -1) {
            softwareData[index] = { ...softwareData[index], ...formData };
        }
    } else {
        // Add new
        const newId = 'SW' + String(softwareData.length + 1).padStart(3, '0');
        softwareData.push({ id: newId, ...formData });
    }

    saveToLocalStorage();
    renderSoftwareTable();
    updateDashboard();
    closeSoftwareModal();
});

// Add Software Button
document.getElementById('addSoftwareBtn').addEventListener('click', openSoftwareModal);

// Software Search and Filters
document.getElementById('softwareSearch').addEventListener('input', renderSoftwareTable);
document.getElementById('softwareCategoryFilter').addEventListener('change', renderSoftwareTable);

// Delete Modal Functions
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    currentDeleteTarget = null;
    currentDeleteType = null;
}

function confirmDelete() {
    if (currentDeleteType === 'hardware') {
        hardwareData = hardwareData.filter(hw => hw.id !== currentDeleteTarget);
        saveToLocalStorage();
        renderHardwareTable();
        updateDashboard();
    } else if (currentDeleteType === 'software') {
        softwareData = softwareData.filter(sw => sw.id !== currentDeleteTarget);
        saveToLocalStorage();
        renderSoftwareTable();
        updateDashboard();
    }
    closeDeleteModal();
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in (for development)
    // Comment this out in production
    // document.getElementById('loginPage').style.display = 'none';
    // document.getElementById('mainApp').style.display = 'flex';
    // loadFromLocalStorage();
    // updateDashboard();
    // renderHardwareTable();
    // renderSoftwareTable();
});
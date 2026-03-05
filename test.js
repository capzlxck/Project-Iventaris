const assets = [
    {
        code: "PC-2024-001",
        type: "Desktop",
        brand: "Dell OptiPlex 7090",
        spec: "Intel i7, 16GB, 512GB SSD",
        status: "Aktif",
        warranty: "15 Jan 2027"
    },
    {
        code: "PC-2024-002",
        type: "Desktop",
        brand: "HP ProDesk 600",
        spec: "Intel i5, 8GB, 256GB SSD",
        status: "Rusak",
        warranty: "20 Agu 2026"
    }
];

const tbody = document.querySelector("#assetTable tbody");

function renderTable(data){
    tbody.innerHTML = "";
    data.forEach(asset => {
        let row = `
        <tr>
            <td>${asset.code}</td>
            <td>${asset.type}</td>
            <td>${asset.brand}</td>
            <td>${asset.spec}</td>
            <td class="${asset.status === "Aktif" ? "status-aktif":"status-rusak"}">${asset.status}</td>
            <td>${asset.warranty}</td>
            <td>
                <button>Edit</button>
                <button>Hapus</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

renderTable(assets);

<?php
// get_perangkat.php
require_once 'database.php';

header('Content-Type: application/json');

$page = isset($_GET['page']) ? $_GET['page'] : 'komputer';
$search = isset($_GET['search']) ? $db->real_escape_string($_GET['search']) : '';
$kategori = isset($_GET['kategori']) ? $db->real_escape_string($_GET['kategori']) : '';
$status = isset($_GET['status']) ? $db->real_escape_string($_GET['status']) : '';

$sql = "SELECT * FROM perangkat WHERE page_type = '$page'";

if (!empty($search)) {
    $sql .= " AND (kode_barang LIKE '%$search%' OR nama_item LIKE '%$search%' OR spesifikasi LIKE '%$search%' OR catatan LIKE '%$search%')";
}

if (!empty($kategori) && $kategori != 'Semua') {
    $sql .= " AND kategori = '$kategori'";
}

if (!empty($status) && $status != 'Semua') {
    $sql .= " AND status = '$status'";
}

$sql .= " ORDER BY id DESC";

$result = $db->query($sql);
$devices = [];

while ($row = $result->fetch_assoc()) {
    $devices[] = $row;
}

echo json_encode([
    'success' => true,
    'data' => $devices,
    'total' => count($devices)
]);
?>
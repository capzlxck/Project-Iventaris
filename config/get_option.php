<?php
// get_option.php
require_once 'database.php';

header('Content-Type: application/json');

$type = isset($_GET['type']) ? $_GET['type'] : '';
$page = isset($_GET['page']) ? $_GET['page'] : '';

$response = ['success' => false, 'data' => []];

if ($type == 'kategori' && !empty($page)) {
    // Ambil dari tabel kategori
    $sql = "SELECT nama_kategori FROM kategori WHERE page_type = '$page' ORDER BY nama_kategori";
    $result = $db->query($sql);
    
    $options = [];
    while ($row = $result->fetch_assoc()) {
        $options[] = $row['nama_kategori'];
    }
    
    $response = ['success' => true, 'data' => $options];
    
} elseif ($type == 'status') {
    // Ambil dari tabel status
    $sql = "SELECT nama_status FROM status ORDER BY id";
    $result = $db->query($sql);
    
    $options = [];
    while ($row = $result->fetch_assoc()) {
        $options[] = $row['nama_status'];
    }
    
    $response = ['success' => true, 'data' => $options];
}

echo json_encode($response);
?>
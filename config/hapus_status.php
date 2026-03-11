<?php
// hapus_status.php
require_once 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method tidak diizinkan']);
    exit;
}

$status = isset($_POST['status']) ? trim($_POST['status']) : '';

if (empty($status)) {
    echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
    exit;
}

// Cek apakah status sedang digunakan
$used = $db->query("SELECT id FROM perangkat WHERE status = '$status' LIMIT 1");
if ($used->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Status sedang digunakan oleh perangkat']);
    exit;
}

$sql = "DELETE FROM status WHERE nama_status = '$status'";

if ($db->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Status berhasil dihapus']);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal menghapus status: ' . $db->error]);
}
?>
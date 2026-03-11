<?php
// hapus_perangkat.php
require_once 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method tidak diizinkan']);
    exit;
}

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

if ($id == 0) {
    echo json_encode(['success' => false, 'message' => 'ID tidak valid']);
    exit;
}

$sql = "DELETE FROM perangkat WHERE id = $id";

if ($db->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Data berhasil dihapus']);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal menghapus data: ' . $db->error]);
}
?>
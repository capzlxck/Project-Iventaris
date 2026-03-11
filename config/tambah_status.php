<?php
// tambah_status.php
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

// Cek apakah sudah ada
$check = $db->query("SELECT id FROM status WHERE nama_status = '$status'");
if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Status sudah ada']);
    exit;
}

$sql = "INSERT INTO status (nama_status) VALUES ('$status')";

if ($db->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Status berhasil ditambahkan']);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal menambahkan status: ' . $db->error]);
}
?>
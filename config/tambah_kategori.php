<?php
// tambah_kategori.php
require_once 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method tidak diizinkan']);
    exit;
}

$kategori = isset($_POST['kategori']) ? trim($_POST['kategori']) : '';
$page = isset($_POST['page']) ? $_POST['page'] : '';

if (empty($kategori) || empty($page)) {
    echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
    exit;
}

// Cek apakah sudah ada
$check = $db->query("SELECT id FROM kategori WHERE nama_kategori = '$kategori' AND page_type = '$page'");
if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Kategori sudah ada']);
    exit;
}

$sql = "INSERT INTO kategori (nama_kategori, page_type) VALUES ('$kategori', '$page')";

if ($db->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Kategori berhasil ditambahkan']);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal menambahkan kategori: ' . $db->error]);
}
?>
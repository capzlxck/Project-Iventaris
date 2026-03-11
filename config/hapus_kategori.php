<?php
// hapus_kategori.php
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

// Cek apakah kategori sedang digunakan
$used = $db->query("SELECT id FROM perangkat WHERE kategori = '$kategori' AND page_type = '$page' LIMIT 1");
if ($used->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Kategori sedang digunakan oleh perangkat']);
    exit;
}

$sql = "DELETE FROM kategori WHERE nama_kategori = '$kategori' AND page_type = '$page'";

if ($db->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Kategori berhasil dihapus']);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal menghapus kategori: ' . $db->error]);
}
?>
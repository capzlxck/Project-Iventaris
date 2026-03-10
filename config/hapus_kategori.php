<?php
require_once '../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);
$halaman = $data['halaman'] ?? '';
$kategori = $data['kategori'] ?? '';

if (empty($halaman) || empty($kategori)) {
    http_response_code(400);
    echo json_encode(['error' => 'Data tidak lengkap']);
    exit;
}

try {
    // Cek apakah kategori default
    $stmt = $pdo->prepare("SELECT is_default FROM kategori_options WHERE halaman = ? AND kategori = ?");
    $stmt->execute([$halaman, $kategori]);
    $result = $stmt->fetch();
    
    if (!$result) {
        http_response_code(404);
        echo json_encode(['error' => 'Kategori tidak ditemukan']);
        exit;
    }
    
    if ($result['is_default']) {
        http_response_code(400);
        echo json_encode(['error' => 'Kategori default tidak dapat dihapus']);
        exit;
    }
    
    // Cek apakah sedang digunakan
    $stmt = $pdo->prepare("SELECT id FROM perangkat WHERE halaman = ? AND kategori = ? LIMIT 1");
    $stmt->execute([$halaman, $kategori]);
    
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['error' => 'Kategori sedang digunakan']);
        exit;
    }
    
    $stmt = $pdo->prepare("DELETE FROM kategori_options WHERE halaman = ? AND kategori = ? AND is_default = FALSE");
    $stmt->execute([$halaman, $kategori]);
    
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
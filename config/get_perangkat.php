<?php
require_once '../config/database.php';

$halaman = $_GET['halaman'] ?? 'komputer';

$stmt = $pdo->prepare("SELECT * FROM perangkat WHERE halaman = ? ORDER BY id DESC");
$stmt->execute([$halaman]);
$perangkat = $stmt->fetchAll();

echo json_encode($perangkat);
?>
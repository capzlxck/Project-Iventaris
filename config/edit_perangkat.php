<?php
// edit_perangkat.php
require_once 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method tidak diizinkan']);
    exit;
}

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$kode_barang = isset($_POST['kode_barang']) ? $db->real_escape_string($_POST['kode_barang']) : '';
$nama_item = isset($_POST['nama_item']) ? $db->real_escape_string($_POST['nama_item']) : '';
$kategori = isset($_POST['kategori']) ? $db->real_escape_string($_POST['kategori']) : '';
$status = isset($_POST['status']) ? $db->real_escape_string($_POST['status']) : '';
$spesifikasi = isset($_POST['spesifikasi']) ? $db->real_escape_string($_POST['spesifikasi']) : '';
$catatan = isset($_POST['catatan']) ? $db->real_escape_string($_POST['catatan']) : '';
$garansi = isset($_POST['garansi']) && !empty($_POST['garansi']) ? $_POST['garansi'] : null;
$tgl_beli = isset($_POST['tgl_beli']) && !empty($_POST['tgl_beli']) ? $_POST['tgl_beli'] : null;

if ($id == 0 || empty($kode_barang) || empty($nama_item) || empty($kategori) || empty($status)) {
    echo json_encode(['success' => false, 'message' => 'Data tidak valid']);
    exit;
}

// Cek duplikasi kode_barang (kecuali untuk id yang sama)
$check = $db->query("SELECT id FROM perangkat WHERE kode_barang = '$kode_barang' AND id != $id");
if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Kode barang sudah digunakan oleh perangkat lain!']);
    exit;
}

$sql = "UPDATE perangkat SET 
        kode_barang = '$kode_barang',
        nama_item = '$nama_item',
        kategori = '$kategori',
        status = '$status',
        spesifikasi = '$spesifikasi',
        catatan = '$catatan',
        garansi = " . ($garansi ? "'$garansi'" : "NULL") . ",
        tgl_beli = " . ($tgl_beli ? "'$tgl_beli'" : "NULL") . "
        WHERE id = $id";

if ($db->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Data berhasil diupdate']);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal mengupdate data: ' . $db->error]);
}
?>
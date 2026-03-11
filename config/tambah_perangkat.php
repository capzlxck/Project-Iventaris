<?php
// tambah_perangkat.php
require_once 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method tidak diizinkan']);
    exit;
}

// Ambil data dari POST
$kode_barang = isset($_POST['kode_barang']) ? $db->real_escape_string($_POST['kode_barang']) : '';
$nama_item = isset($_POST['nama_item']) ? $db->real_escape_string($_POST['nama_item']) : '';
$kategori = isset($_POST['kategori']) ? $db->real_escape_string($_POST['kategori']) : '';
$status = isset($_POST['status']) ? $db->real_escape_string($_POST['status']) : '';
$spesifikasi = isset($_POST['spesifikasi']) ? $db->real_escape_string($_POST['spesifikasi']) : '';
$catatan = isset($_POST['catatan']) ? $db->real_escape_string($_POST['catatan']) : '';
$garansi = isset($_POST['garansi']) && !empty($_POST['garansi']) ? $_POST['garansi'] : null;
$tgl_beli = isset($_POST['tgl_beli']) && !empty($_POST['tgl_beli']) ? $_POST['tgl_beli'] : null;
$page_type = isset($_POST['page_type']) ? $db->real_escape_string($_POST['page_type']) : '';

// Validasi
if (empty($kode_barang) || empty($nama_item) || empty($kategori) || empty($status) || empty($page_type)) {
    echo json_encode(['success' => false, 'message' => 'Data wajib tidak boleh kosong']);
    exit;
}

// Cek duplikasi kode_barang
$check = $db->query("SELECT id FROM perangkat WHERE kode_barang = '$kode_barang'");
if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Kode barang sudah digunakan!']);
    exit;
}

// Simpan ke database
$sql = "INSERT INTO perangkat (kode_barang, nama_item, kategori, status, spesifikasi, catatan, garansi, tgl_beli, page_type) 
        VALUES ('$kode_barang', '$nama_item', '$kategori', '$status', '$spesifikasi', '$catatan', " . 
        ($garansi ? "'$garansi'" : "NULL") . ", " . ($tgl_beli ? "'$tgl_beli'" : "NULL") . ", '$page_type')";

if ($db->query($sql)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Data berhasil disimpan',
        'kode_barang' => $kode_barang
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data: ' . $db->error]);
}
?>
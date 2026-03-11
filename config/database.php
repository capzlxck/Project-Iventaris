<?php
// database.php
$host = 'localhost';
$dbname = 'inventaris_lab';
$username = 'root';
$password = '';

// Buat koneksi MySQLi
$db = new mysqli($host, $username, $password, $dbname);

// Cek koneksi
if ($db->connect_error) {
    die("Koneksi database gagal: " . $db->connect_error);
}

// Set charset
$db->set_charset("utf8mb4");
?>
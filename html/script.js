// ==================== STATE MANAGEMENT ====================
        let currentPage = 'komputer';
        let currentData = [];
        let deleteId = null;

        // Mapping halaman ke judul
        const pageTitles = {
            komputer: 'Daftar Perangkat Komputer',
            hardware: 'Daftar Perangkat Hardware',
            jaringan: 'Perangkat Jaringan',
            furniture: 'Furniture Lab',
            maintenance: 'Alat Maintenance',
            multimedia: 'Perangkat Multimedia'
        };

        // ==================== INITIALIZATION ====================
        document.addEventListener('DOMContentLoaded', function() {
            showPage('komputer');
        });

        // ==================== PAGE LOADING ====================
        function showPage(page, el) {
            if (el) {
                document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
                el.classList.add('active');
            }
            currentPage = page;
            loadData();
            loadOptions();
        }

        // ==================== LOAD DATA ====================
        function loadData() {
            const search = document.getElementById(`search${capitalize(currentPage)}`)?.value || '';
            const kategori = document.getElementById(`kategori${capitalize(currentPage)}`)?.value || 'Semua';
            const status = document.getElementById(`status${capitalize(currentPage)}`)?.value || 'Semua';
            
            let url = `get_perangkat.php?page=${currentPage}`;
            if (search) url += `&search=${encodeURIComponent(search)}`;
            if (kategori && kategori !== 'Semua') url += `&kategori=${encodeURIComponent(kategori)}`;
            if (status && status !== 'Semua') url += `&status=${encodeURIComponent(status)}`;
            
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        currentData = result.data;
                        renderPage(currentData);
                    } else {
                        console.error('Gagal memuat data');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('main-content').innerHTML = '<div style="text-align: center; padding: 50px; color: red;">Gagal memuat data. Pastikan database terhubung.</div>';
                });
        }

        function loadOptions() {
            // Load kategori
            fetch(`get_option.php?type=kategori&page=${currentPage}`)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        updateKategoriOptions(result.data);
                    }
                });

            // Load status
            fetch(`get_option.php?type=status`)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        updateStatusOptions(result.data);
                    }
                });
        }

        function updateKategoriOptions(options) {
            // Update filter
            const filterSelect = document.getElementById(`kategori${capitalize(currentPage)}`);
            if (filterSelect) {
                filterSelect.innerHTML = '<option value="Semua">Semua</option>';
                options.forEach(opt => {
                    filterSelect.innerHTML += `<option value="${opt}">${opt}</option>`;
                });
            }

            // Update modal
            const modalSelect = document.getElementById('itemKategori');
            if (modalSelect) {
                const currentValue = modalSelect.value;
                modalSelect.innerHTML = '<option value="">Pilih Kategori</option>';
                options.forEach(opt => {
                    modalSelect.innerHTML += `<option value="${opt}">${opt}</option>`;
                });
                if (currentValue && options.includes(currentValue)) {
                    modalSelect.value = currentValue;
                }
            }
        }

        function updateStatusOptions(options) {
            // Update filter
            const filterSelect = document.getElementById(`status${capitalize(currentPage)}`);
            if (filterSelect) {
                const currentValue = filterSelect.value;
                filterSelect.innerHTML = '<option value="Semua">Semua</option>';
                options.forEach(opt => {
                    filterSelect.innerHTML += `<option value="${opt}">${opt}</option>`;
                });
                if (currentValue && options.includes(currentValue)) {
                    filterSelect.value = currentValue;
                }
            }

            // Update modal
            const modalSelect = document.getElementById('itemStatus');
            if (modalSelect) {
                const currentValue = modalSelect.value;
                modalSelect.innerHTML = '<option value="">Pilih Status</option>';
                options.forEach(opt => {
                    modalSelect.innerHTML += `<option value="${opt}">${opt}</option>`;
                });
                if (currentValue && options.includes(currentValue)) {
                    modalSelect.value = currentValue;
                }
            }
        }

        // ==================== RENDER FUNCTIONS ====================
        function renderPage(data) {
            const mainContent = document.getElementById('main-content');
            
            let html = `
                <div id="${currentPage}">
                    <div class="header">
                        <h1>${pageTitles[currentPage]}</h1>
                        <button class="btn-primary" onclick="bukaModalTambah()"><i class="fas fa-plus"></i> Tambah Perangkat</button>
                    </div>
                    <div class="filter-bar">
                        <div class="search-group">
                            <i class="fas fa-search"></i>
                            <input type="text" id="search${capitalize(currentPage)}" placeholder="Cari..." onkeyup="filterPerangkat()">
                        </div>
                        <div class="filter-section">
                            <div class="filter-select">
                                <label>Kategori:</label>
                                <select id="kategori${capitalize(currentPage)}" onchange="filterPerangkat()">
                                    <option value="Semua">Semua</option>
                                </select>
                                <div class="filter-opsi">
                                    <button class="btn-filter-opsi" onclick="tambahOpsiKategori()"><i class="fas fa-plus"></i> Tambah</button>
                                    <button class="btn-filter-opsi hapus" onclick="hapusOpsiKategori()"><i class="fas fa-trash"></i> Hapus</button>
                                </div>
                            </div>
                            <div class="filter-select">
                                <label>Status:</label>
                                <select id="status${capitalize(currentPage)}" onchange="filterPerangkat()">
                                    <option value="Semua">Semua</option>
                                </select>
                                <div class="filter-opsi">
                                    <button class="btn-filter-opsi" onclick="tambahOpsiStatus()"><i class="fas fa-plus"></i> Tambah</button>
                                    <button class="btn-filter-opsi hapus" onclick="hapusOpsiStatus()"><i class="fas fa-trash"></i> Hapus</button>
                                </div>
                            </div>
                        </div>
                        <span class="badge-filter" id="resultCount${capitalize(currentPage)}">${data.length} perangkat</span>
                    </div>
                    <section class="stats" id="stats${capitalize(currentPage)}">
                        ${renderStats(data)}
                    </section>
                    <div class="table-box">
                        <table>
                            <thead>
                                <tr>
                                    <th>Kode Barang</th>
                                    <th>Kategori</th>
                                    <th>Merk & Model</th>
                                    <th>Spesifikasi</th>
                                    <th>Catatan</th>
                                    <th>Status</th>
                                    <th>Garansi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="${currentPage}Body">
                                ${renderTableRows(data)}
                            </tbody>
                        </table>
                        ${data.length === 0 ? '<div class="no-data">Belum ada perangkat. Klik "Tambah Perangkat" untuk menambahkan.</div>' : ''}
                    </div>
                </div>
            `;
            
            mainContent.innerHTML = html;
            
            // Load options setelah render
            loadOptions();
        }

        function renderStats(data) {
            const aktif = data.filter(d => d.status === 'Aktif').length;
            const rusak = data.filter(d => d.status === 'Rusak').length;
            const maint = data.filter(d => d.status === 'Maintenance').length;
            const retired = data.filter(d => d.status === 'Retired').length;
            
            return `
                <div class="card"><h4>Total ${pageTitles[currentPage].replace('Daftar ', '')}</h4><h2>${data.length}</h2><p>Semua jenis</p></div>
                <div class="card"><h4>Aktif</h4><h2>${aktif}</h2><p>Siap digunakan</p></div>
                <div class="card"><h4>Rusak</h4><h2>${rusak}</h2><p>Perlu perbaikan</p></div>
                <div class="card"><h4>Maintenance</h4><h2>${maint}</h2><p>Sedang diperbaiki</p></div>
                <div class="card"><h4>Retired</h4><h2>${retired}</h2><p>Tak terpakai</p></div>
            `;
        }

        function renderTableRows(data) {
            if (data.length === 0) return '';
            
            return data.map(item => {
                let garansi = item.garansi;
                if (garansi && garansi !== '0000-00-00' && garansi !== null) {
                    try {
                        const d = new Date(garansi);
                        if (!isNaN(d)) {
                            garansi = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                        }
                    } catch (e) {}
                } else {
                    garansi = '-';
                }
                
                return `
                <tr>
                    <td>${item.kode_barang}</td>
                    <td>${item.kategori}</td>
                    <td>${item.nama_item}</td>
                    <td>${item.spesifikasi || '-'}</td>
                    <td>${item.catatan || '-'}</td>
                    <td><span class="badge ${statusClass(item.status)}">${item.status}</span></td>
                    <td>${garansi}</td>
                    <td class="aksi-icons">
                        <img src="edit.png" alt="Edit" title="Edit" onclick="editPerangkat(${item.id})" onerror="this.src='https://via.placeholder.com/24x24/3b82f6/ffffff?text=E'">
                        <img src="delete.png" alt="Hapus" title="Hapus" onclick="bukaModalHapus(${item.id})" onerror="this.src='https://via.placeholder.com/24x24/ef4444/ffffff?text=D'">
                    </td>
                </tr>
            `}).join('');
        }

        // ==================== FILTER FUNCTIONS ====================
        function filterPerangkat() {
            loadData();
        }

        // ==================== MODAL FUNCTIONS ====================
        function bukaModalTambah() {
            document.getElementById('modalTitle').innerText = 'Tambah Perangkat';
            document.getElementById('editId').value = '';
            document.getElementById('itemKode').value = '';
            document.getElementById('formTambah').reset();
            
            // Load options ke modal
            loadOptions();
            
            document.getElementById('modalTambah').style.display = 'flex';
        }

        function tutupModal() {
            document.getElementById('modalTambah').style.display = 'none';
        }

        function editPerangkat(id) {
            const item = currentData.find(d => d.id == id);
            if (!item) return;
            
            document.getElementById('modalTitle').innerText = 'Edit Perangkat';
            document.getElementById('editId').value = item.id;
            document.getElementById('itemKode').value = item.kode_barang;
            document.getElementById('itemNama').value = item.nama_item;
            
            // Load options dulu
            loadOptions();
            
            // Setelah options terload, set value
            setTimeout(() => {
                document.getElementById('itemKategori').value = item.kategori;
                document.getElementById('itemStatus').value = item.status;
            }, 100);
            
            document.getElementById('itemSpesifikasi').value = item.spesifikasi || '';
            document.getElementById('itemCatatan').value = item.catatan || '';
            document.getElementById('itemGaransi').value = item.garansi || '';
            document.getElementById('itemTglBeli').value = item.tgl_beli || '';
            
            document.getElementById('modalTambah').style.display = 'flex';
        }

        function simpanPerangkat() {
            const id = document.getElementById('editId').value;
            const kode_barang = document.getElementById('itemKode').value;
            const nama_item = document.getElementById('itemNama').value.trim();
            const kategori = document.getElementById('itemKategori').value;
            const status = document.getElementById('itemStatus').value;
            const spesifikasi = document.getElementById('itemSpesifikasi').value.trim();
            const catatan = document.getElementById('itemCatatan').value.trim();
            const garansi = document.getElementById('itemGaransi').value;
            const tgl_beli = document.getElementById('itemTglBeli').value;

            if (!nama_item || !kategori || !status) {
                alert('Nama Item, Kategori, dan Status wajib diisi!');
                return;
            }

            const formData = new FormData();
            formData.append('id', id);
            formData.append('kode_barang', kode_barang);
            formData.append('nama_item', nama_item);
            formData.append('kategori', kategori);
            formData.append('status', status);
            formData.append('spesifikasi', spesifikasi);
            formData.append('catatan', catatan);
            formData.append('garansi', garansi);
            formData.append('tgl_beli', tgl_beli);
            formData.append('page_type', currentPage);

            const url = id ? 'edit_perangkat.php' : 'tambah_perangkat.php';

            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert(result.message);
                    tutupModal();
                    loadData();
                } else {
                    alert('Error: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Gagal menyimpan data');
            });
        }

        // ==================== OPTIONS MANAGEMENT ====================
        function tambahOpsiKategori() {
            const kategoriBaru = prompt("Masukkan nama kategori baru:");
            if (kategoriBaru && kategoriBaru.trim() !== "") {
                const trimmed = kategoriBaru.trim();
                
                const formData = new FormData();
                formData.append('kategori', trimmed);
                formData.append('page', currentPage);

                fetch('tambah_kategori.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert(result.message);
                        loadOptions();
                    } else {
                        alert('Error: ' + result.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Gagal menambahkan kategori');
                });
            }
        }

        function hapusOpsiKategori() {
            const select = document.getElementById(`kategori${capitalize(currentPage)}`);
            const selectedValue = select.value;
            
            if (!selectedValue || selectedValue === 'Semua') {
                alert("Pilih kategori yang ingin dihapus terlebih dahulu!");
                return;
            }
            
            if (confirm(`Apakah Anda yakin ingin menghapus kategori "${selectedValue}"?`)) {
                const formData = new FormData();
                formData.append('kategori', selectedValue);
                formData.append('page', currentPage);

                fetch('hapus_kategori.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert(result.message);
                        loadOptions();
                    } else {
                        alert('Error: ' + result.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Gagal menghapus kategori');
                });
            }
        }

        function tambahOpsiStatus() {
            const statusBaru = prompt("Masukkan nama status baru:");
            if (statusBaru && statusBaru.trim() !== "") {
                const trimmed = statusBaru.trim();
                
                const formData = new FormData();
                formData.append('status', trimmed);

                fetch('tambah_status.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert(result.message);
                        loadOptions();
                    } else {
                        alert('Error: ' + result.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Gagal menambahkan status');
                });
            }
        }

        function hapusOpsiStatus() {
            const select = document.getElementById(`status${capitalize(currentPage)}`);
            const selectedValue = select.value;
            
            if (!selectedValue || selectedValue === 'Semua') {
                alert("Pilih status yang ingin dihapus terlebih dahulu!");
                return;
            }
            
            if (confirm(`Apakah Anda yakin ingin menghapus status "${selectedValue}"?`)) {
                const formData = new FormData();
                formData.append('status', selectedValue);

                fetch('hapus_status.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert(result.message);
                        loadOptions();
                    } else {
                        alert('Error: ' + result.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Gagal menghapus status');
                });
            }
        }

        // ==================== DELETE FUNCTIONS ====================
        function bukaModalHapus(id) {
            deleteId = id;
            document.getElementById('hapusMessage').innerText = 'Apakah Anda yakin ingin menghapus item ini?';
            document.getElementById('modalHapus').style.display = 'flex';
        }

        function tutupModalHapus() {
            document.getElementById('modalHapus').style.display = 'none';
            deleteId = null;
        }

        function konfirmasiHapus() {
            if (deleteId) {
                const formData = new FormData();
                formData.append('id', deleteId);

                fetch('hapus_perangkat.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert(result.message);
                        tutupModalHapus();
                        loadData();
                    } else {
                        alert('Error: ' + result.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Gagal menghapus data');
                });
            }
        }

        // ==================== UTILITY FUNCTIONS ====================
        function capitalize(s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        }

        function statusClass(status) {
            switch(status) {
                case 'Aktif': return 'aktif';
                case 'Rusak': return 'rusak';
                case 'Maintenance': return 'maintenance';
                case 'Retired': return 'retired';
                default: return '';
            }
        }

        function logout() {
            if (confirm('Apakah Anda yakin ingin logout?')) {
                window.location.href = "index.html";
            }
        }

        // ==================== EXPOSE FUNCTIONS ====================
        window.bukaModalTambah = bukaModalTambah;
        window.tutupModal = tutupModal;
        window.simpanPerangkat = simpanPerangkat;
        window.editPerangkat = editPerangkat;
        window.bukaModalHapus = bukaModalHapus;
        window.tutupModalHapus = tutupModalHapus;
        window.konfirmasiHapus = konfirmasiHapus;
        window.filterPerangkat = filterPerangkat;
        window.showPage = showPage;
        window.logout = logout;
        window.tambahOpsiKategori = tambahOpsiKategori;
        window.tambahOpsiStatus = tambahOpsiStatus;
        window.hapusOpsiKategori = hapusOpsiKategori;
        window.hapusOpsiStatus = hapusOpsiStatus;
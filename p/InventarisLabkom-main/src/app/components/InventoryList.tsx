import { useState } from 'react';
import { Search, Plus, Pencil, Trash, Eye, Download, ListFilter } from 'lucide-react';

interface InventoryItem {
  id: string;
  kode: string;
  nama: string;
  kategori: string;
  ruangan: string;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  jumlah: number;
  tanggalMasuk: string;
}

export function InventoryList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['Semua', 'Komputer', 'Furnitur', 'Lab Equipment', 'Elektronik', 'Alat Tulis'];

  const inventoryData: InventoryItem[] = [
    {
      id: '1',
      kode: 'KMP-001',
      nama: 'Laptop Dell XPS 15',
      kategori: 'Komputer',
      ruangan: 'Lab Komputer A',
      kondisi: 'Baik',
      jumlah: 25,
      tanggalMasuk: '2024-01-15',
    },
    {
      id: '2',
      kode: 'FUR-045',
      nama: 'Kursi Kantor Executive',
      kategori: 'Furnitur',
      ruangan: 'Ruang Dosen',
      kondisi: 'Baik',
      jumlah: 40,
      tanggalMasuk: '2023-11-20',
    },
    {
      id: '3',
      kode: 'LAB-012',
      nama: 'Mikroskop Digital',
      kategori: 'Lab Equipment',
      ruangan: 'Lab Biologi',
      kondisi: 'Baik',
      jumlah: 15,
      tanggalMasuk: '2024-02-10',
    },
    {
      id: '4',
      kode: 'ELK-089',
      nama: 'Proyektor Epson EB-X41',
      kategori: 'Elektronik',
      ruangan: 'Ruang Kelas 301',
      kondisi: 'Rusak Ringan',
      jumlah: 8,
      tanggalMasuk: '2023-09-05',
    },
    {
      id: '5',
      kode: 'KMP-034',
      nama: 'PC Desktop HP ProDesk',
      kategori: 'Komputer',
      ruangan: 'Lab Komputer B',
      kondisi: 'Baik',
      jumlah: 30,
      tanggalMasuk: '2024-03-01',
    },
    {
      id: '6',
      kode: 'FUR-078',
      nama: 'Meja Kuliah Lipat',
      kategori: 'Furnitur',
      ruangan: 'Aula',
      kondisi: 'Baik',
      jumlah: 100,
      tanggalMasuk: '2023-08-15',
    },
    {
      id: '7',
      kode: 'LAB-023',
      nama: 'Centrifuge Lab',
      kategori: 'Lab Equipment',
      ruangan: 'Lab Kimia',
      kondisi: 'Baik',
      jumlah: 5,
      tanggalMasuk: '2024-01-20',
    },
    {
      id: '8',
      kode: 'ELK-102',
      nama: 'AC Split 2 PK',
      kategori: 'Elektronik',
      ruangan: 'Ruang Kelas 205',
      kondisi: 'Rusak Berat',
      jumlah: 1,
      tanggalMasuk: '2022-07-10',
    },
  ];

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.kode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getKondisiColor = (kondisi: string) => {
    switch (kondisi) {
      case 'Baik':
        return 'bg-green-100 text-green-700';
      case 'Rusak Ringan':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rusak Berat':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Daftar Inventaris</h2>
          <p className="text-gray-600 mt-1">Kelola semua barang inventaris universitas</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Barang
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama barang atau kode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <ListFilter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Barang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ruangan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kondisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-gray-900">{item.kode}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.nama}</p>
                      <p className="text-sm text-gray-500">Masuk: {item.tanggalMasuk}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{item.kategori}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{item.ruangan}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getKondisiColor(item.kondisi)}`}>
                      {item.kondisi}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{item.jumlah}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Menampilkan <span className="font-medium">{filteredData.length}</span> dari <span className="font-medium">{inventoryData.length}</span> barang
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Sebelumnya
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Tambah Barang Baru</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kode Barang</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="KMP-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Barang</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Komputer</option>
                    <option>Furnitur</option>
                    <option>Lab Equipment</option>
                    <option>Elektronik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ruangan</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Baik</option>
                    <option>Rusak Ringan</option>
                    <option>Rusak Berat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

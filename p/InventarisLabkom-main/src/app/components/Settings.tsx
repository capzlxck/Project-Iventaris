import { Building, Users, MapPin, Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Pengaturan</h2>
        <p className="text-gray-600 mt-1">Kelola pengaturan sistem inventaris</p>
      </div>

      {/* University Info */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Building className="w-6 h-6 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Informasi Universitas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Universitas</label>
            <input 
              type="text" 
              defaultValue="Universitas Contoh Indonesia"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kode Universitas</label>
            <input 
              type="text" 
              defaultValue="UCI-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              defaultValue="admin@univ.ac.id"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
            <input 
              type="tel" 
              defaultValue="+62 21 1234 5678"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
            <textarea 
              defaultValue="Jl. Pendidikan No. 123, Jakarta"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Simpan Perubahan
        </button>
      </div>

      {/* Category Management */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Kategori Barang</h3>
        </div>
        <div className="space-y-3">
          {['Komputer', 'Furnitur', 'Lab Equipment', 'Elektronik', 'Alat Tulis'].map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-gray-900">{category}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          + Tambah Kategori
        </button>
      </div>

      {/* Room Management */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Manajemen Ruangan</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Lab Komputer A',
            'Lab Komputer B',
            'Lab Biologi',
            'Lab Kimia',
            'Ruang Kelas 301',
            'Ruang Kelas 205',
            'Ruang Dosen',
            'Aula',
          ].map((room, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-gray-900">{room}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          + Tambah Ruangan
        </button>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Manajemen Pengguna</h3>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Admin Utama', email: 'admin@univ.ac.id', role: 'Administrator' },
            { name: 'Staff IT', email: 'it@univ.ac.id', role: 'Staff' },
            { name: 'Dr. Ahmad', email: 'ahmad@univ.ac.id', role: 'Dosen' },
          ].map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email} • {user.role}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          + Tambah Pengguna
        </button>
      </div>
    </div>
  );
}

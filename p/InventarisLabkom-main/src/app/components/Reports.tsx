import { Download, FileText, Calendar } from 'lucide-react';

export function Reports() {
  const reportTypes = [
    {
      title: 'Laporan Inventaris Lengkap',
      description: 'Semua barang inventaris dengan detail lengkap',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Laporan Barang Rusak',
      description: 'Daftar barang yang memerlukan perbaikan',
      icon: FileText,
      color: 'bg-red-500',
    },
    {
      title: 'Laporan Peminjaman',
      description: 'Riwayat peminjaman dan pengembalian barang',
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Laporan Per Ruangan',
      description: 'Inventaris berdasarkan lokasi ruangan',
      icon: FileText,
      color: 'bg-purple-500',
    },
  ];

  const recentReports = [
    { name: 'Laporan_Inventaris_Januari_2025.pdf', date: '2025-01-05', size: '2.4 MB' },
    { name: 'Laporan_Barang_Rusak_Q4_2024.pdf', date: '2024-12-28', size: '856 KB' },
    { name: 'Laporan_Peminjaman_Desember_2024.pdf', date: '2024-12-20', size: '1.2 MB' },
    { name: 'Laporan_Per_Ruangan_2024.pdf', date: '2024-12-15', size: '3.8 MB' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Laporan</h2>
        <p className="text-gray-600 mt-1">Generate dan download laporan inventaris</p>
      </div>

      {/* Generate Reports */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Buat Laporan Baru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`${report.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    <div className="mt-4 flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        Excel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Report */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Laporan Custom</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="date" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="date" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Semua Kategori</option>
              <option>Komputer</option>
              <option>Furnitur</option>
              <option>Lab Equipment</option>
              <option>Elektronik</option>
            </select>
          </div>
        </div>
        <button className="mt-4 flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FileText className="w-5 h-5" />
          Generate Laporan
        </button>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Laporan Terbaru</h3>
        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <p className="text-sm text-gray-500">{report.date} • {report.size}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Package, TrendingUp, Users, Building } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Barang',
      value: '1,247',
      change: '+12%',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Barang Dipinjam',
      value: '89',
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Ruangan',
      value: '42',
      change: '+2',
      icon: Building,
      color: 'bg-purple-500',
    },
    {
      title: 'Pengguna',
      value: '156',
      change: '+8%',
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  const categoryData = [
    { name: 'Komputer', value: 320, color: '#3B82F6' },
    { name: 'Furnitur', value: 450, color: '#10B981' },
    { name: 'Lab Equipment', value: 280, color: '#A855F7' },
    { name: 'Elektronik', value: 197, color: '#F59E0B' },
  ];

  const monthlyData = [
    { month: 'Jan', masuk: 45, keluar: 12 },
    { month: 'Feb', masuk: 52, keluar: 18 },
    { month: 'Mar', masuk: 61, keluar: 15 },
    { month: 'Apr', masuk: 48, keluar: 22 },
    { month: 'Mei', masuk: 70, keluar: 19 },
    { month: 'Jun', masuk: 55, keluar: 25 },
  ];

  const recentActivities = [
    { id: 1, action: 'Tambah barang', item: 'Laptop Dell XPS 15', user: 'Admin', time: '2 jam lalu' },
    { id: 2, action: 'Peminjaman', item: 'Proyektor Epson EB-X41', user: 'Dr. Ahmad', time: '3 jam lalu' },
    { id: 3, action: 'Pengembalian', item: 'Kursi Kantor Executive', user: 'Staff IT', time: '5 jam lalu' },
    { id: 4, action: 'Update status', item: 'Printer HP LaserJet', user: 'Admin', time: '1 hari lalu' },
    { id: 5, action: 'Tambah barang', item: 'Meja Kuliah Lipat', user: 'Admin', time: '1 hari lalu' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Ringkasan sistem inventaris universitas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change} dari bulan lalu</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Barang Masuk & Keluar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="masuk" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="keluar" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Kategori Barang</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.item}</p>
                <p className="text-sm text-gray-500">{activity.action} oleh {activity.user}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

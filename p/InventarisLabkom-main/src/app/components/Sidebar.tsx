import { LayoutDashboard, Package, FileText, Settings, Menu } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ activeTab, setActiveTab, isOpen, toggleSidebar }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventaris', icon: Package },
    { id: 'reports', label: 'Laporan', icon: FileText },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900">InvenKampus</h1>
                  <p className="text-xs text-gray-500">Universitas</p>
                </div>
              </div>
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={toggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) toggleSidebar();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">AD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">admin@univ.ac.id</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

import { useState, useMemo } from "react";
import { Monitor, Plus, AlertTriangle, Wrench, CheckCircle, Search } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { AddComputerDialog } from "./components/AddComputerDialog";
import { ComputerTable } from "./components/ComputerTable";
import { SoftwareList } from "./components/SoftwareList";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export interface ComputerItem {
  id: string;
  assetCode: string;
  type: "Desktop" | "Laptop" | "Server" | "Monitor" | "Printer" | "Peripheral";
  brand: string;
  model: string;
  processor?: string;
  ram?: string;
  storage?: string;
  serialNumber: string;
  labRoom: string;
  pcNumber?: string;
  status: "Aktif" | "Rusak" | "Maintenance" | "Retired";
  purchaseDate: string;
  warrantyExpiry?: string;
  lastMaintenance?: string;
  assignedTo?: string;
  notes?: string;
}

export interface SoftwareItem {
  id: string;
  name: string;
  version: string;
  licenseType: "Individual" | "Volume" | "Site License" | "Open Source";
  licenseKey?: string;
  totalLicenses: number;
  usedLicenses: number;
  expiryDate?: string;
  vendor: string;
  notes?: string;
}

const LAB_ROOMS = [
  "Semua Lab",
  "Lab Komputer 1",
  "Lab Komputer 2",
  "Lab Komputer 3",
  "Lab Multimedia",
  "Lab Jaringan",
  "Ruang Server",
];

const initialComputers: ComputerItem[] = [
  {
    id: "1",
    assetCode: "PC-2024-001",
    type: "Desktop",
    brand: "Dell",
    model: "OptiPlex 7090",
    processor: "Intel Core i7-11700",
    ram: "16GB DDR4",
    storage: "512GB NVMe SSD",
    serialNumber: "SN123456789",
    labRoom: "Lab Komputer 1",
    pcNumber: "PC-01",
    status: "Aktif",
    purchaseDate: "2024-01-15",
    warrantyExpiry: "2027-01-15",
    lastMaintenance: "2025-12-10",
  },
  {
    id: "2",
    assetCode: "PC-2024-002",
    type: "Desktop",
    brand: "HP",
    model: "ProDesk 600 G6",
    processor: "Intel Core i5-10500",
    ram: "8GB DDR4",
    storage: "256GB SSD",
    serialNumber: "SN987654321",
    labRoom: "Lab Komputer 1",
    pcNumber: "PC-02",
    status: "Rusak",
    purchaseDate: "2023-08-20",
    warrantyExpiry: "2026-08-20",
    lastMaintenance: "2025-11-15",
    notes: "Motherboard rusak, menunggu part pengganti",
  },
  {
    id: "3",
    assetCode: "LAP-2024-001",
    type: "Laptop",
    brand: "Lenovo",
    model: "ThinkPad E14",
    processor: "AMD Ryzen 5 5500U",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    serialNumber: "SN456789123",
    labRoom: "Lab Multimedia",
    status: "Aktif",
    purchaseDate: "2024-03-10",
    warrantyExpiry: "2027-03-10",
    assignedTo: "Dosen Multimedia",
  },
  {
    id: "4",
    assetCode: "MON-2024-001",
    type: "Monitor",
    brand: "LG",
    model: "24MK430H",
    serialNumber: "SN741852963",
    labRoom: "Lab Komputer 2",
    status: "Aktif",
    purchaseDate: "2023-12-05",
    warrantyExpiry: "2026-12-05",
  },
  {
    id: "5",
    assetCode: "PC-2023-015",
    type: "Desktop",
    brand: "Asus",
    model: "D500MA",
    processor: "Intel Core i3-10100",
    ram: "8GB DDR4",
    storage: "1TB HDD",
    serialNumber: "SN159753486",
    labRoom: "Lab Komputer 3",
    pcNumber: "PC-15",
    status: "Maintenance",
    purchaseDate: "2023-02-18",
    warrantyExpiry: "2026-02-18",
    lastMaintenance: "2026-01-02",
    notes: "Upgrade SSD sedang berlangsung",
  },
];

const initialSoftware: SoftwareItem[] = [
  {
    id: "1",
    name: "Microsoft Office 365",
    version: "2024",
    licenseType: "Volume",
    licenseKey: "XXXXX-XXXXX-XXXXX-XXXXX",
    totalLicenses: 50,
    usedLicenses: 45,
    expiryDate: "2026-12-31",
    vendor: "Microsoft",
    notes: "Educational license",
  },
  {
    id: "2",
    name: "Adobe Creative Cloud",
    version: "2024",
    licenseType: "Site License",
    totalLicenses: 30,
    usedLicenses: 28,
    expiryDate: "2026-06-30",
    vendor: "Adobe",
  },
  {
    id: "3",
    name: "Visual Studio Code",
    version: "1.95",
    licenseType: "Open Source",
    totalLicenses: 999,
    usedLicenses: 75,
    vendor: "Microsoft",
  },
  {
    id: "4",
    name: "AutoCAD",
    version: "2024",
    licenseType: "Individual",
    licenseKey: "XXXXX-XXXXX-XXXXX-XXXXX",
    totalLicenses: 10,
    usedLicenses: 10,
    expiryDate: "2026-03-15",
    vendor: "Autodesk",
    notes: "Perlu perpanjangan lisensi",
  },
];

export default function App() {
  const [computers, setComputers] = useState<ComputerItem[]>(initialComputers);
  const [software, setSoftware] = useState<SoftwareItem[]>(initialSoftware);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLab, setSelectedLab] = useState("Semua Lab");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingComputer, setEditingComputer] = useState<ComputerItem | null>(null);

  // Statistics
  const stats = useMemo(() => {
    const totalDevices = computers.length;
    const activeDevices = computers.filter((c) => c.status === "Aktif").length;
    const brokenDevices = computers.filter((c) => c.status === "Rusak").length;
    const maintenanceDevices = computers.filter((c) => c.status === "Maintenance").length;

    return { totalDevices, activeDevices, brokenDevices, maintenanceDevices };
  }, [computers]);

  // Filtered computers
  const filteredComputers = useMemo(() => {
    return computers.filter((computer) => {
      const matchesSearch =
        computer.assetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        computer.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        computer.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        computer.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (computer.pcNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

      const matchesLab =
        selectedLab === "Semua Lab" || computer.labRoom === selectedLab;

      return matchesSearch && matchesLab;
    });
  }, [computers, searchQuery, selectedLab]);

  const handleAddComputer = (computer: Omit<ComputerItem, "id">) => {
    const newComputer: ComputerItem = {
      ...computer,
      id: Date.now().toString(),
    };
    setComputers([...computers, newComputer]);
    toast.success("Perangkat berhasil ditambahkan");
    setDialogOpen(false);
  };

  const handleEditComputer = (computer: Omit<ComputerItem, "id">) => {
    if (!editingComputer) return;

    setComputers(
      computers.map((c) =>
        c.id === editingComputer.id ? { ...computer, id: editingComputer.id } : c
      )
    );
    toast.success("Perangkat berhasil diperbarui");
    setEditingComputer(null);
    setDialogOpen(false);
  };

  const handleDeleteComputer = (id: string) => {
    setComputers(computers.filter((computer) => computer.id !== id));
    toast.success("Perangkat berhasil dihapus");
  };

  const handleOpenEditDialog = (computer: ComputerItem) => {
    setEditingComputer(computer);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingComputer(null);
  };

  const handleDeleteSoftware = (id: string) => {
    setSoftware(software.filter((s) => s.id !== id));
    toast.success("Software berhasil dihapus");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center ring-2 ring-white/20">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Inventaris Lab Komputer
                </h1>
                <p className="text-sm text-blue-100">
                  Sistem Manajemen Aset Lab Komputer Kampus
                </p>
              </div>
            </div>
            <Button
              onClick={() => setDialogOpen(true)}
              className="gap-2 bg-white text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4" />
              Tambah Perangkat
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Perangkat</CardTitle>
              <Monitor className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">
                {stats.totalDevices}
              </div>
              <p className="text-xs text-slate-500 mt-1">Semua jenis perangkat</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perangkat Aktif</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-green-600">
                {stats.activeDevices}
              </div>
              <p className="text-xs text-slate-500 mt-1">Siap digunakan</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perangkat Rusak</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-red-600">
                {stats.brokenDevices}
              </div>
              <p className="text-xs text-slate-500 mt-1">Perlu perbaikan</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <Wrench className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-orange-600">
                {stats.maintenanceDevices}
              </div>
              <p className="text-xs text-slate-500 mt-1">Sedang dipelihara</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Hardware and Software */}
        <Tabs defaultValue="hardware" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="software">Software & Lisensi</TabsTrigger>
          </TabsList>

          <TabsContent value="hardware" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Cari kode aset, merk, model, serial number, atau nomor PC..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedLab} onValueChange={setSelectedLab}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LAB_ROOMS.map((lab) => (
                        <SelectItem key={lab} value={lab}>
                          {lab}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Computer Table */}
            <Card>
              <CardHeader>
                <CardTitle>Daftar Perangkat Hardware</CardTitle>
                <p className="text-sm text-slate-500">
                  Menampilkan {filteredComputers.length} dari {computers.length}{" "}
                  perangkat
                </p>
              </CardHeader>
              <CardContent>
                <ComputerTable
                  computers={filteredComputers}
                  onEdit={handleOpenEditDialog}
                  onDelete={handleDeleteComputer}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="software" className="space-y-6">
            <SoftwareList software={software} onDelete={handleDeleteSoftware} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Dialog */}
      <AddComputerDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={editingComputer ? handleEditComputer : handleAddComputer}
        editingComputer={editingComputer}
      />

      <Toaster />
    </div>
  );
}

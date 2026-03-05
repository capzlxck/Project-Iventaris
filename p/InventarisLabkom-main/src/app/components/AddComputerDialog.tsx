import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import type { ComputerItem } from "../App";

interface AddComputerDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (computer: Omit<ComputerItem, "id">) => void;
  editingComputer?: ComputerItem | null;
}

const DEVICE_TYPES: Array<ComputerItem["type"]> = [
  "Desktop",
  "Laptop",
  "Server",
  "Monitor",
  "Printer",
  "Peripheral",
];

const STATUSES: Array<ComputerItem["status"]> = [
  "Aktif",
  "Rusak",
  "Maintenance",
  "Retired",
];

const LAB_ROOMS = [
  "Lab Komputer 1",
  "Lab Komputer 2",
  "Lab Komputer 3",
  "Lab Multimedia",
  "Lab Jaringan",
  "Ruang Server",
];

export function AddComputerDialog({
  open,
  onClose,
  onSubmit,
  editingComputer,
}: AddComputerDialogProps) {
  const [formData, setFormData] = useState<Omit<ComputerItem, "id">>({
    assetCode: "",
    type: "Desktop",
    brand: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    serialNumber: "",
    labRoom: "Lab Komputer 1",
    pcNumber: "",
    status: "Aktif",
    purchaseDate: "",
    warrantyExpiry: "",
    lastMaintenance: "",
    assignedTo: "",
    notes: "",
  });

  useEffect(() => {
    if (editingComputer) {
      setFormData({
        assetCode: editingComputer.assetCode,
        type: editingComputer.type,
        brand: editingComputer.brand,
        model: editingComputer.model,
        processor: editingComputer.processor || "",
        ram: editingComputer.ram || "",
        storage: editingComputer.storage || "",
        serialNumber: editingComputer.serialNumber,
        labRoom: editingComputer.labRoom,
        pcNumber: editingComputer.pcNumber || "",
        status: editingComputer.status,
        purchaseDate: editingComputer.purchaseDate,
        warrantyExpiry: editingComputer.warrantyExpiry || "",
        lastMaintenance: editingComputer.lastMaintenance || "",
        assignedTo: editingComputer.assignedTo || "",
        notes: editingComputer.notes || "",
      });
    } else {
      setFormData({
        assetCode: "",
        type: "Desktop",
        brand: "",
        model: "",
        processor: "",
        ram: "",
        storage: "",
        serialNumber: "",
        labRoom: "Lab Komputer 1",
        pcNumber: "",
        status: "Aktif",
        purchaseDate: "",
        warrantyExpiry: "",
        lastMaintenance: "",
        assignedTo: "",
        notes: "",
      });
    }
  }, [editingComputer, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const showSpecs =
    formData.type === "Desktop" ||
    formData.type === "Laptop" ||
    formData.type === "Server";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingComputer ? "Edit Perangkat" : "Tambah Perangkat Baru"}
          </DialogTitle>
          <DialogDescription>
            {editingComputer
              ? "Perbarui informasi perangkat"
              : "Isi formulir untuk menambah perangkat baru"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assetCode">Kode Aset *</Label>
                <Input
                  id="assetCode"
                  placeholder="PC-2024-001"
                  value={formData.assetCode}
                  onChange={(e) =>
                    setFormData({ ...formData, assetCode: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipe Perangkat *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: ComputerItem["type"]) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEVICE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Merk *</Label>
                <Input
                  id="brand"
                  placeholder="Dell, HP, Lenovo, dll"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  placeholder="OptiPlex 7090"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Specifications (for computers only) */}
            {showSpecs && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="processor">Processor</Label>
                  <Input
                    id="processor"
                    placeholder="Intel Core i7-11700"
                    value={formData.processor}
                    onChange={(e) =>
                      setFormData({ ...formData, processor: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ram">RAM</Label>
                  <Input
                    id="ram"
                    placeholder="16GB DDR4"
                    value={formData.ram}
                    onChange={(e) =>
                      setFormData({ ...formData, ram: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage">Storage</Label>
                  <Input
                    id="storage"
                    placeholder="512GB SSD"
                    value={formData.storage}
                    onChange={(e) =>
                      setFormData({ ...formData, storage: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number *</Label>
                <Input
                  id="serialNumber"
                  placeholder="SN123456789"
                  value={formData.serialNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, serialNumber: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: ComputerItem["status"]) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="labRoom">Ruang Lab *</Label>
                <Select
                  value={formData.labRoom}
                  onValueChange={(value) =>
                    setFormData({ ...formData, labRoom: value })
                  }
                >
                  <SelectTrigger id="labRoom">
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

              <div className="space-y-2">
                <Label htmlFor="pcNumber">Nomor PC</Label>
                <Input
                  id="pcNumber"
                  placeholder="PC-01"
                  value={formData.pcNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, pcNumber: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Tanggal Pembelian *</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) =>
                    setFormData({ ...formData, purchaseDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warrantyExpiry">Garansi Berakhir</Label>
                <Input
                  id="warrantyExpiry"
                  type="date"
                  value={formData.warrantyExpiry}
                  onChange={(e) =>
                    setFormData({ ...formData, warrantyExpiry: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastMaintenance">Maintenance Terakhir</Label>
                <Input
                  id="lastMaintenance"
                  type="date"
                  value={formData.lastMaintenance}
                  onChange={(e) =>
                    setFormData({ ...formData, lastMaintenance: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Ditugaskan Kepada</Label>
              <Input
                id="assignedTo"
                placeholder="Nama pengguna atau departemen"
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan catatan atau keterangan tambahan..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {editingComputer ? "Perbarui" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

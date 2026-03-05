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
import type { InventoryItem } from "../App";

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<InventoryItem, "id">) => void;
  editingItem?: InventoryItem | null;
}

const CATEGORIES = [
  "Alat Lab",
  "Peralatan Kantor",
  "Buku",
  "Komputer & Elektronik",
  "Furnitur",
  "Lainnya",
];

const CONDITIONS: Array<"Baik" | "Rusak Ringan" | "Rusak Berat"> = [
  "Baik",
  "Rusak Ringan",
  "Rusak Berat",
];

export function AddItemDialog({ open, onClose, onSubmit, editingItem }: AddItemDialogProps) {
  const [formData, setFormData] = useState<Omit<InventoryItem, "id">>({
    code: "",
    name: "",
    category: "Alat Lab",
    quantity: 0,
    minStock: 0,
    location: "",
    condition: "Baik",
    purchaseDate: "",
    notes: "",
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        code: editingItem.code,
        name: editingItem.name,
        category: editingItem.category,
        quantity: editingItem.quantity,
        minStock: editingItem.minStock,
        location: editingItem.location,
        condition: editingItem.condition,
        purchaseDate: editingItem.purchaseDate,
        notes: editingItem.notes || "",
      });
    } else {
      setFormData({
        code: "",
        name: "",
        category: "Alat Lab",
        quantity: 0,
        minStock: 0,
        location: "",
        condition: "Baik",
        purchaseDate: "",
        notes: "",
      });
    }
  }, [editingItem, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Edit Item Inventaris" : "Tambah Item Inventaris"}
          </DialogTitle>
          <DialogDescription>
            {editingItem
              ? "Perbarui informasi item inventaris"
              : "Isi formulir untuk menambah item inventaris baru"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Kode Barang *</Label>
                <Input
                  id="code"
                  placeholder="Contoh: LAB-001"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nama Barang *</Label>
                <Input
                  id="name"
                  placeholder="Contoh: Mikroskop Digital"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Kondisi *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value: "Baik" | "Rusak Ringan" | "Rusak Berat") =>
                    setFormData({ ...formData, condition: value })
                  }
                >
                  <SelectTrigger id="condition">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map((cond) => (
                      <SelectItem key={cond} value={cond}>
                        {cond}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Jumlah *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minStock">Stok Minimum *</Label>
                <Input
                  id="minStock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.minStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minStock: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi *</Label>
                <Input
                  id="location"
                  placeholder="Contoh: Lab Biologi Lantai 3"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

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
              {editingItem ? "Perbarui" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

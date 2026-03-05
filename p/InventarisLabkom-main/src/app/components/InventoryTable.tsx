import { Edit, Trash2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import type { InventoryItem } from "../App";

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

export function InventoryTable({ items, onEdit, onDelete }: InventoryTableProps) {
  const getConditionBadge = (condition: InventoryItem["condition"]) => {
    switch (condition) {
      case "Baik":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Baik</Badge>;
      case "Rusak Ringan":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Rusak Ringan</Badge>;
      case "Rusak Berat":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rusak Berat</Badge>;
    }
  };

  const isLowStock = (item: InventoryItem) => item.quantity < item.minStock;

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p>Tidak ada data inventaris yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead className="text-center">Jumlah</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Kondisi</TableHead>
            <TableHead>Tanggal Beli</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.code}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {item.name}
                  {isLowStock(item) && (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  )}
                </div>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-center">
                <span
                  className={`font-medium ${
                    isLowStock(item) ? "text-orange-600" : ""
                  }`}
                >
                  {item.quantity}
                </span>
                <span className="text-slate-400 text-sm">
                  {" "}/ {item.minStock}
                </span>
              </TableCell>
              <TableCell className="max-w-[200px] truncate" title={item.location}>
                {item.location}
              </TableCell>
              <TableCell>{getConditionBadge(item.condition)}</TableCell>
              <TableCell className="text-sm text-slate-600">
                {new Date(item.purchaseDate).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus item "{item.name}"? 
                          Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(item.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { Edit, Trash2, Monitor, Laptop, Server, Printer, HardDrive } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import type { ComputerItem } from "../App";

interface ComputerTableProps {
  computers: ComputerItem[];
  onEdit: (computer: ComputerItem) => void;
  onDelete: (id: string) => void;
}

export function ComputerTable({ computers, onEdit, onDelete }: ComputerTableProps) {
  const getStatusBadge = (status: ComputerItem["status"]) => {
    switch (status) {
      case "Aktif":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Aktif
          </Badge>
        );
      case "Rusak":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rusak</Badge>
        );
      case "Maintenance":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Maintenance
          </Badge>
        );
      case "Retired":
        return (
          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">
            Retired
          </Badge>
        );
    }
  };

  const getTypeIcon = (type: ComputerItem["type"]) => {
    const iconClass = "w-4 h-4 text-slate-600";
    switch (type) {
      case "Desktop":
        return <Monitor className={iconClass} />;
      case "Laptop":
        return <Laptop className={iconClass} />;
      case "Server":
        return <Server className={iconClass} />;
      case "Printer":
        return <Printer className={iconClass} />;
      default:
        return <HardDrive className={iconClass} />;
    }
  };

  if (computers.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p>Tidak ada perangkat yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode Aset</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Merk & Model</TableHead>
            <TableHead>Spesifikasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Garansi</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {computers.map((computer) => {
            const warrantyExpired = computer.warrantyExpiry
              ? new Date(computer.warrantyExpiry) < new Date()
              : false;

            return (
              <TableRow key={computer.id}>
                <TableCell className="font-medium font-mono text-sm">
                  {computer.assetCode}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(computer.type)}
                    <span className="text-sm">{computer.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    <div className="font-medium text-sm">{computer.brand}</div>
                    <div className="text-xs text-slate-500 truncate">
                      {computer.model}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {computer.processor ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="max-w-[150px] cursor-help">
                            <div className="text-xs text-slate-600 truncate">
                              {computer.processor}
                            </div>
                            <div className="text-xs text-slate-500">
                              {computer.ram} • {computer.storage}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p>
                              <strong>CPU:</strong> {computer.processor}
                            </p>
                            <p>
                              <strong>RAM:</strong> {computer.ram}
                            </p>
                            <p>
                              <strong>Storage:</strong> {computer.storage}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(computer.status)}</TableCell>
                <TableCell>
                  {computer.warrantyExpiry ? (
                    <div className="text-sm">
                      <div
                        className={warrantyExpired ? "text-red-600" : "text-slate-600"}
                      >
                        {new Date(computer.warrantyExpiry).toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                      {warrantyExpired && (
                        <div className="text-xs text-red-500">Expired</div>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(computer)}
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
                          <AlertDialogTitle>Hapus Perangkat?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus perangkat "{computer.assetCode}"?
                            Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(computer.id)}
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
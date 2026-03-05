import { Trash2, AlertCircle, Key } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
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
import type { SoftwareItem } from "../App";

interface SoftwareListProps {
  software: SoftwareItem[];
  onDelete: (id: string) => void;
}

export function SoftwareList({ software, onDelete }: SoftwareListProps) {
  const getLicenseTypeBadge = (type: SoftwareItem["licenseType"]) => {
    const badges = {
      Individual: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      Volume: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      "Site License": "bg-green-100 text-green-800 hover:bg-green-100",
      "Open Source": "bg-slate-100 text-slate-800 hover:bg-slate-100",
    };

    return (
      <Badge className={badges[type]}>
        {type}
      </Badge>
    );
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (software.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <p>Tidak ada data software yang tersedia</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {software.map((item) => {
        const usagePercentage = (item.usedLicenses / item.totalLicenses) * 100;
        const isLowLicense = usagePercentage >= 90;
        const expired = isExpired(item.expiryDate);
        const expiringSoon = isExpiringSoon(item.expiryDate);

        return (
          <Card key={item.id} className={expired ? "border-red-200 bg-red-50/30" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    {getLicenseTypeBadge(item.licenseType)}
                    {(expired || expiringSoon || isLowLicense) && (
                      <AlertCircle
                        className={`w-4 h-4 ${
                          expired ? "text-red-500" : "text-orange-500"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span>Version {item.version}</span>
                    <span>•</span>
                    <span>{item.vendor}</span>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Software?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus "{item.name}"? Tindakan
                        ini tidak dapat dibatalkan.
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
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* License Usage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Penggunaan Lisensi
                    </span>
                    <span className="text-sm font-medium">
                      {item.usedLicenses} / {item.totalLicenses}
                    </span>
                  </div>
                  <Progress
                    value={usagePercentage}
                    className={`h-2 ${
                      isLowLicense ? "[&>div]:bg-orange-500" : ""
                    }`}
                  />
                  {isLowLicense && (
                    <p className="text-xs text-orange-600 mt-1">
                      Lisensi hampir habis
                    </p>
                  )}
                </div>

                {/* License Key */}
                {item.licenseKey && (
                  <div className="flex items-center gap-2 text-sm">
                    <Key className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">License Key:</span>
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono">
                      {item.licenseKey}
                    </code>
                  </div>
                )}

                {/* Expiry Date */}
                {item.expiryDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-600">Masa Berlaku:</span>
                    <span
                      className={
                        expired
                          ? "text-red-600 font-medium"
                          : expiringSoon
                          ? "text-orange-600 font-medium"
                          : "text-slate-700"
                      }
                    >
                      {new Date(item.expiryDate).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                      {expired && " (Expired)"}
                      {expiringSoon && !expired && " (Segera Berakhir)"}
                    </span>
                  </div>
                )}

                {/* Notes */}
                {item.notes && (
                  <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                    <span className="font-medium">Catatan:</span> {item.notes}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

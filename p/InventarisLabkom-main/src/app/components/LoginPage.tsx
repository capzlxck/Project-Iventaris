import { useState } from "react";
import { User, Lock, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import logoImage from "figma:asset/ee5d6e7a377538a1382dd99a3085503ef8e11c41.png";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setError("Username dan password harus diisi");
      return;
    }

    // For demo purposes, accept any non-empty credentials
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 bg-gradient-to-r from-purple-700 to-purple-800 text-white rounded-t-lg pb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-700 rounded" style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              }} />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight">SISTEM INVENTORY</h1>
              <p className="text-sm text-purple-100">UNIVERSITAS MULIA PONTIANAK</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 pb-8">
          {/* Info Alert */}
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 leading-relaxed">
              Silahkan masuk di kolom yang dibawah.
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Masukan Login untuk masuk ke dalam sistem aplikasi
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-700">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  className="pl-10 h-11 border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="pl-10 h-11 border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>Demo: Gunakan username dan password apa saja untuk login</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

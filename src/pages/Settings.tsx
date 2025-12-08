import { Eye, Volume2, Globe, Bell, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Settings() {
  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Pengaturan</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Sesuaikan pengalaman belajar Anda
          </p>
        </div>

        <div className="space-y-6">
          {/* Accessibility Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Aksesibilitas</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Mode Teks Besar</Label>
                  <p className="text-sm text-muted-foreground">Perbesar ukuran teks di seluruh aplikasi</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Kontras Tinggi</Label>
                  <p className="text-sm text-muted-foreground">Tingkatkan kontras warna untuk visibilitas lebih baik</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Dukungan Pembaca Layar</Label>
                  <p className="text-sm text-muted-foreground">Optimalkan untuk perangkat lunak pembaca layar</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3">
                <Label>Ukuran Teks</Label>
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
              </div>
            </div>
          </Card>

          {/* Audio Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="w-6 h-6 text-secondary" />
              <h2 className="text-xl md:text-2xl font-bold">Audio</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Putar Audio Otomatis</Label>
                  <p className="text-sm text-muted-foreground">Otomatis membaca teks dengan suara</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-3">
                <Label>Kecepatan Bicara</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Lambat</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Cepat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Volume</Label>
                <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
              </div>
            </div>
          </Card>

          {/* Language Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-accent" />
              <h2 className="text-xl md:text-2xl font-bold">Bahasa & Wilayah</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Bahasa Aplikasi</Label>
                <Select defaultValue="id">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Bahasa Konten</Label>
                <Select defaultValue="id">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Notifikasi</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Pengingat Belajar</Label>
                  <p className="text-sm text-muted-foreground">Pengingat harian untuk menyelesaikan pelajaran</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notifikasi Pencapaian</Label>
                  <p className="text-sm text-muted-foreground">Beri tahu saat Anda mendapat lencana baru</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Pembaruan Forum</Label>
                  <p className="text-sm text-muted-foreground">Dapatkan notifikasi tentang balasan forum</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-secondary" />
              <h2 className="text-xl md:text-2xl font-bold">Privasi & Keamanan</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Visibilitas Profil</Label>
                  <p className="text-sm text-muted-foreground">Tampilkan profil Anda kepada siswa lain</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Analitik Belajar</Label>
                  <p className="text-sm text-muted-foreground">Bagikan data pembelajaran anonim untuk meningkatkan platform</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button variant="outline" className="w-full">
                Ubah Kata Sandi
              </Button>
            </div>
          </Card>

          {/* Save Button */}
          <Button className="w-full bg-primary" size="lg">
            Simpan Semua Pengaturan
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

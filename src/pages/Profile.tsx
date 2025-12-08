import { useState, useEffect } from "react";
import { User, Mail, Calendar, Award, BookOpen, Target, Camera, Save, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const achievements = [
  { name: "Pembelajar Cepat", icon: "⚡", earned: true },
  { name: "Master Membaca", icon: "📚", earned: true },
  { name: "Ahli Matematika", icon: "🧮", earned: true },
  { name: "Penjelajah Sains", icon: "🔬", earned: false },
  { name: "Nilai Sempurna", icon: "💯", earned: false },
  { name: "Penolong", icon: "🤝", earned: true },
];

const stats = [
  { label: "Pelajaran Selesai", value: "42", icon: BookOpen },
  { label: "Rata-rata Nilai Kuis", value: "87%", icon: Target },
  { label: "Konsistensi Belajar", value: "12 hari", icon: Award },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    avatar_url: "",
    email: "",
  });
  const [editForm, setEditForm] = useState({
    full_name: "",
    avatar_url: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile({
          full_name: profileData?.full_name || user.email?.split("@")[0] || "Pengguna",
          avatar_url: profileData?.avatar_url || "",
          email: user.email || "",
        });
        setEditForm({
          full_name: profileData?.full_name || "",
          avatar_url: profileData?.avatar_url || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: editForm.full_name,
          avatar_url: editForm.avatar_url,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setProfile(prev => ({
        ...prev,
        full_name: editForm.full_name,
        avatar_url: editForm.avatar_url,
      }));
      setIsEditing(false);
      toast({
        title: "Berhasil!",
        description: "Profil berhasil diperbarui",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal memperbarui profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Profil</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Perjalanan belajar dan pencapaian Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-1">
            <div className="text-center">
              <Avatar className="w-20 md:w-24 h-20 md:h-24 mx-auto mb-4">
                {profile.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                ) : null}
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(profile.full_name || "U")}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl md:text-2xl font-bold mb-1">{profile.full_name || "Pengguna"}</h2>
              <p className="text-muted-foreground mb-4">Siswa Hope.Ai</p>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Bergabung 2024</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Pengguna Aktif</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profil
              </Button>
            </div>
          </Card>

          {/* Stats & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Stats */}
            <Card className="p-6">
              <h3 className="text-lg md:text-xl font-bold mb-6">Statistik Belajar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-muted rounded-lg"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Subject Progress */}
            <Card className="p-6">
              <h3 className="text-lg md:text-xl font-bold mb-6">Progress Mata Pelajaran</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Matematika</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">IPA</span>
                    <span className="text-sm text-muted-foreground">72%</span>
                  </div>
                  <Progress value={72} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Bahasa Inggris</span>
                    <span className="text-sm text-muted-foreground">90%</span>
                  </div>
                  <Progress value={90} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Sejarah</span>
                    <span className="text-sm text-muted-foreground">68%</span>
                  </div>
                  <Progress value={68} className="h-3" />
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-lg md:text-xl font-bold mb-6">Pencapaian</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-center p-4 rounded-lg border-2 transition-all ${
                      achievement.earned
                        ? 'bg-accent/10 border-accent'
                        : 'bg-muted border-muted opacity-50'
                    }`}
                  >
                    <div className="text-3xl md:text-4xl mb-2">{achievement.icon}</div>
                    <div className="text-xs md:text-sm font-medium">{achievement.name}</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nama Lengkap</Label>
              <Input
                id="full_name"
                value={editForm.full_name}
                onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar_url">URL Foto Profil</Label>
              <Input
                id="avatar_url"
                value={editForm.avatar_url}
                onChange={(e) => setEditForm(prev => ({ ...prev, avatar_url: e.target.value }))}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            {editForm.avatar_url && (
              <div className="flex justify-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={editForm.avatar_url} alt="Preview" />
                  <AvatarFallback>
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
              <X className="w-4 h-4 mr-2" />
              Batal
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

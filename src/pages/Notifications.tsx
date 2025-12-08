import { Bell, CheckCircle2, AlertCircle, Info, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Notification = {
  id: string;
  type: "success" | "info" | "warning" | "achievement";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const notifications: Notification[] = [
  {
    id: "1",
    type: "achievement",
    title: "Pencapaian Baru Terbuka!",
    message: "Anda telah mendapatkan lencana 'Ahli Matematika' karena menyelesaikan 10 pelajaran matematika.",
    time: "2 jam yang lalu",
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "Materi Belajar Baru Tersedia",
    message: "Lihat pelajaran Sains baru tentang 'Tata Surya' di Flexa.",
    time: "5 jam yang lalu",
    read: false,
  },
  {
    id: "3",
    type: "success",
    title: "Kuis Selesai!",
    message: "Kerja bagus! Anda mendapat nilai 90% pada kuis Tabel Perkalian.",
    time: "1 hari yang lalu",
    read: true,
  },
  {
    id: "4",
    type: "info",
    title: "Balasan Forum",
    message: "Sarah M. membalas postingan Anda tentang fotosintesis.",
    time: "1 hari yang lalu",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Konsistensi Belajar",
    message: "Jangan lupa menyelesaikan pelajaran hari ini untuk mempertahankan konsistensi 12 hari Anda!",
    time: "2 hari yang lalu",
    read: true,
  },
];

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    case "warning":
      return <AlertCircle className="w-6 h-6 text-orange-500" />;
    case "achievement":
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    default:
      return <Info className="w-6 h-6 text-blue-500" />;
  }
};

const getBgColor = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-500/10 border-green-500/30";
    case "warning":
      return "bg-orange-500/10 border-orange-500/30";
    case "achievement":
      return "bg-yellow-500/10 border-yellow-500/30";
    default:
      return "bg-blue-500/10 border-blue-500/30";
  }
};

export default function Notifications() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Notifikasi</h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Tetap update dengan kemajuan belajar Anda
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full w-fit">
                <Bell className="w-5 h-5" />
                <span className="font-bold">{unreadCount} Baru</span>
              </div>
            )}
          </div>
        </div>

        {unreadCount > 0 && (
          <div className="mb-6">
            <Button variant="outline" className="w-full">
              Tandai Semua Sudah Dibaca
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 card-hover border-2 ${
                  !notification.read
                    ? getBgColor(notification.type)
                    : 'border-transparent'
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-bold text-base md:text-lg">{notification.title}</h3>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2 text-sm md:text-base">{notification.message}</p>
                    <span className="text-xs md:text-sm text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <Bell className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Tidak ada notifikasi</h3>
              <p className="text-muted-foreground">
                Anda sudah mengikuti semuanya! Periksa lagi nanti untuk pembaruan.
              </p>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}

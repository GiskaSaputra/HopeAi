import { Link } from "react-router-dom";
import { BookOpen, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Hope.Ai</h3>
                <p className="text-xs text-primary-foreground/80">AI untuk Pendidikan Inklusif</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Platform pembelajaran berbasis AI untuk pendidikan inklusif dan aksesibel bagi semua pelajar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Fitur Utama</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/eyeread" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  EyeRead
                </Link>
              </li>
              <li>
                <Link to="/neotutor" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  NeoTutor
                </Link>
              </li>
              <li>
                <Link to="/flexa" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Flexa
                </Link>
              </li>
              <li>
                <Link to="/pathly" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Pathly
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  EchoForum
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Dukungan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/profile" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Profil
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Pengaturan
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privasi
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
              <a href="mailto:info@hope-ai.edu" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  info@hope-ai.edu
                </a>
              </li>
            </ul>
            
            <h4 className="font-bold mb-3">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Hope.Ai. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

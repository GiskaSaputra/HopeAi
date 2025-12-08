import { Link } from "react-router-dom";
import { Camera, MessageSquare, BookOpen, TrendingUp, Users, Sparkles, ArrowRight, Star, Zap, Cpu, Wifi, Scan, BarChart3, Layers, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// --- KOMPONEN IKON ANIMASI MODERN ---
const FeatureIcon = ({ name, colorClass, baseIcon: BaseIcon }) => {
  const isEyeRead = name === "EyeRead";
  const isNeoTutor = name === "NeoTutor";
  const isFlexa = name === "Flexa";
  const isPathly = name === "Pathly";
  const isForum = name === "EchoForum";

  return (
    <div className={`relative w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500 ease-out`}>
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${colorClass.replace('text-', 'from-').split(' ')[0]} to-transparent`} />

      {/* --- ANIMASI KHUSUS PER FITUR --- */}
      
      {/* 1. EyeRead: Scanning Effect */}
      {isEyeRead && (
        <>
          <motion.div 
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-blue-500/80 shadow-[0_0_10px_#3b82f6] z-10"
          />
          <BaseIcon className={`w-8 h-8 ${colorClass} relative z-0`} />
          <Scan className={`absolute w-12 h-12 ${colorClass} opacity-30`} />
        </>
      )}

      {/* 2. NeoTutor: Bouncing Chat Bubbles */}
      {isNeoTutor && (
        <>
          <BaseIcon className={`w-8 h-8 ${colorClass} relative z-10`} />
          <motion.div 
            animate={{ scale: [0, 1, 0], x: [10, 15, 10], y: [-10, -15, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full"
          />
           <motion.div 
            animate={{ scale: [0, 1, 0], x: [-10, -15, -10], y: [10, 15, 10] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute bottom-4 left-4 w-2 h-2 bg-purple-300 rounded-full"
          />
        </>
      )}

      {/* 3. Flexa: Floating Layers/Pages */}
      {isFlexa && (
        <div className="relative">
           <motion.div 
             animate={{ rotate: [0, 5, 0], y: [0, -2, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute inset-0 bg-emerald-400/20 rounded-sm -z-10 transform rotate-6 scale-110"
           />
           <BaseIcon className={`w-8 h-8 ${colorClass} relative z-10`} />
        </div>
      )}

      {/* 4. Pathly: Drawing Graph */}
      {isPathly && (
        <div className="relative flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full p-4 overflow-visible">
            <motion.path
              d="M0 40 Q 20 20, 40 40 T 80 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-orange-400/50"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <BaseIcon className={`w-8 h-8 ${colorClass} relative z-10`} />
        </div>
      )}

      {/* 5. Forum: Orbiting Connections */}
      {isForum && (
        <>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-14 h-14 border border-indigo-400/30 rounded-full border-dashed"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-10 h-1 bg-indigo-400/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: "120%" }}
          />
          <BaseIcon className={`w-8 h-8 ${colorClass} relative z-10`} />
        </>
      )}

      {/* Default Fallback */}
      {!isEyeRead && !isNeoTutor && !isFlexa && !isPathly && !isForum && (
         <BaseIcon className={`w-8 h-8 ${colorClass}`} />
      )}
    </div>
  );
};


// --- KONFIGURASI FITUR ---
const features = [
  {
    name: "EyeRead",
    description: "Ubah teks fisik menjadi digital seketika. Teknologi OCR canggih untuk membaca buku, dokumen, dan papan tulis.",
    icon: Camera,
    href: "/eyeread",
    colSpan: "md:col-span-8",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "group-hover:border-blue-500/50",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    name: "NeoTutor",
    description: "Mentor AI pribadi 24/7.",
    icon: MessageSquare,
    href: "/neotutor",
    colSpan: "md:col-span-4",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "group-hover:border-purple-500/50",
    textColor: "text-purple-600 dark:text-purple-400"
  },
  {
    name: "Flexa",
    description: "Aksesibilitas materi tanpa batas.",
    icon: BookOpen,
    href: "/flexa",
    colSpan: "md:col-span-4",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    borderColor: "group-hover:border-emerald-500/50",
    textColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    name: "Pathly",
    description: "Jalur belajar adaptif.",
    icon: TrendingUp,
    href: "/pathly",
    colSpan: "md:col-span-4",
    bgGradient: "from-orange-500/10 to-amber-500/10",
    borderColor: "group-hover:border-orange-500/50",
    textColor: "text-orange-600 dark:text-orange-400"
  },
  {
    name: "EchoForum",
    description: "Komunitas inklusif.",
    icon: Users,
    href: "/forum",
    colSpan: "md:col-span-4",
    bgGradient: "from-indigo-500/10 to-blue-500/10",
    borderColor: "group-hover:border-indigo-500/50",
    textColor: "text-indigo-600 dark:text-indigo-400"
  },
];

// --- KOMPONEN BACKGROUND ---
const BackgroundGradient = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] animate-pulse delay-1000" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
  </div>
);

// --- KOMPONEN ROBOT DIGITAL ANIMASI ---
const DigitalRobot = () => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000 + Math.random() * 2000); 
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div 
      className="relative w-72 h-72 md:w-96 md:h-96 mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 border border-dotted border-secondary/30 rounded-full"
      />

      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="relative w-40 h-36 bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_0_30px_rgba(var(--primary),0.3)] flex flex-col items-center justify-center overflow-hidden z-20">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
          <div className="w-32 h-20 bg-black/80 rounded-2xl flex items-center justify-center gap-6 relative shadow-inner">
            <motion.div 
              animate={{ height: isBlinking ? 2 : 24 }}
              className="w-8 h-6 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_#22d3ee]"
            />
            <motion.div 
              animate={{ height: isBlinking ? 2 : 24 }}
              className="w-8 h-6 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_#22d3ee]"
            />
            <div className="absolute bottom-3 flex gap-1 items-end h-2">
              {[1, 2, 3, 2, 1].map((h, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [4, 8, 4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-primary/80 rounded-full"
                />
              ))}
            </div>
          </div>
          <motion.div 
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 left-8 w-1 h-8 bg-gray-400"
          >
             <div className="w-3 h-3 bg-red-400 rounded-full absolute -top-1 -left-1 shadow-[0_0_10px_#f87171] animate-pulse" />
          </motion.div>
          <div className="absolute -top-4 right-8 w-1 h-6 bg-gray-400" />
        </div>
        <div className="absolute top-[60%] w-12 h-12 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full z-10" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-[20%] w-32 h-4 bg-primary/20 rounded-[100%] blur-md"
        />
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PAGE ---
export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="min-h-screen relative font-sans selection:bg-primary/20 overflow-x-hidden">
      <BackgroundGradient />

      {/* Hero Section */}
      <section ref={targetRef} className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-[90vh] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column */}
          <motion.div 
            style={{ opacity, y }} 
            className="relative z-10 text-center md:text-left order-2 md:order-1"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-md shadow-sm mb-6 hover:scale-105 transition-transform duration-300 cursor-default"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Platform Pendidikan Masa Depan
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground"
            >
              Belajar Tanpa <br/>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                  Batasan.
                </span>
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute w-full h-3 -bottom-2 left-0 text-secondary"
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed"
            >
              Hope.Ai menghadirkan ekosistem pembelajaran inklusif yang didukung AI. 
              Personalisasi, aksesibilitas, dan komunitas dalam satu platform.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
            >
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 bg-primary hover:bg-primary/90 group" asChild>
                <Link to="/eyeread">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-muted/50 transition-all duration-300" asChild>
                <Link to="/neotutor">Pelajari Lebih Lanjut</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Digital Robot */}
          <motion.div 
            style={{ opacity, y }}
            className="relative z-10 order-1 md:order-2 flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-full blur-[60px] -z-10" />
              <DigitalRobot />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mb-16 text-center"
        >
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Ekosistem Belajar Cerdas
          </motion.h2>
          <motion.p 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Teknologi yang beradaptasi dengan Anda, bukan sebaliknya.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${feature.colSpan} group relative`}
            >
              <Link to={feature.href} className="block h-full">
                <div className={`
                  h-full p-8 rounded-[2rem] border border-white/20
                  bg-white/40 dark:bg-black/20 backdrop-blur-md 
                  hover:bg-white/60 dark:hover:bg-black/40
                  transition-all duration-500 ease-out
                  hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2
                  overflow-hidden relative z-0 flex flex-col justify-between
                  ${feature.borderColor}
                `}>
                  {/* Decorative Background Blob inside card */}
                  <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${feature.bgGradient} pointer-events-none`} />
                  
                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      {/* Animated Feature Icon */}
                      <FeatureIcon 
                        name={feature.name} 
                        colorClass={feature.textColor} 
                        baseIcon={feature.icon} 
                      />
                      
                      {/* Top Right Arrow */}
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/10
                        group-hover:bg-primary group-hover:text-white group-hover:border-primary
                        transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0
                      `}>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary via-blue-600 to-secondary p-1"
        >
          <div className="rounded-[calc(3rem-4px)] bg-background/10 backdrop-blur-xl h-full p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
              Mulai Perjalanan Anda.
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
              Bergabunglah dengan ribuan siswa lainnya. Tanpa biaya tersembunyi, 
              hanya pendidikan murni yang dapat diakses.
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
              <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-white text-primary hover:bg-gray-100 border-0 shadow-2xl shadow-black/20" asChild>
                <Link to="/profile">Buat Akun Gratis</Link>
              </Button>
            </motion.div>

            <Star className="absolute top-10 left-10 text-yellow-300 w-8 h-8 animate-pulse" />
            <Zap className="absolute bottom-10 right-10 text-yellow-300 w-12 h-12 animate-bounce duration-[2000ms]" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
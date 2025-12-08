import { useState } from "react";
import { BookOpen, Volume2, Type, FileText, HandMetal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const subjects = [
  { id: "math", name: "Matematika", icon: "📐" },
  { id: "science", name: "Sains", icon: "🔬" },
  { id: "english", name: "Bahasa Inggris", icon: "📚" },
  { id: "history", name: "Sejarah", icon: "🏛️" },
];

const materials = {
  math: {
    title: "Pengenalan Aljabar",
    content: "Aljabar adalah cabang matematika yang menggunakan simbol dan huruf untuk mewakili angka dan kuantitas dalam rumus dan persamaan. Ini membantu kita menyelesaikan masalah dan memahami pola dalam angka."
  },
  science: {
    title: "Siklus Air",
    content: "Siklus air adalah pergerakan air yang berkelanjutan di permukaan, di atas, dan di bawah permukaan Bumi. Ini termasuk penguapan, kondensasi, presipitasi, dan pengumpulan."
  },
  english: {
    title: "Bagian-Bagian Kalimat",
    content: "Bagian-bagian kalimat adalah kategori kata yang memiliki sifat tata bahasa yang serupa. Bagian utama dari kalimat adalah kata benda, kata kerja, kata sifat, kata keterangan, kata ganti, preposisi, konjungsi, dan interjeksi."
  },
  history: {
    title: "Peradaban Kuno",
    content: "Peradaban kuno adalah masyarakat kompleks yang berkembang ribuan tahun yang lalu. Mereka menciptakan sistem tulisan, pemerintahan, arsitektur, dan seni yang mempengaruhi budaya-budaya selanjutnya."
  },
};

export default function Flexa() {
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof materials>("math");
  const [outputFormat, setOutputFormat] = useState<"text" | "audio" | "summary" | "sign">("text");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentMaterial = materials[selectedSubject];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.8;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const generateSummary = (text: string) => {
    return text.split(". ")[0] + ".";
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Flexa</h1>
          <p className="text-muted-foreground text-lg">
            Konversi materi pembelajaran ke format yang mudah diakses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Selection */}
          <Card className="p-6 lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">Pilih Mata Pelajaran</h3>
            <div className="space-y-2">
              {subjects.map((subject) => (
                <Button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id as keyof typeof materials)}
                  variant={selectedSubject === subject.id ? "default" : "outline"}
                  className="w-full justify-start"
                >
                  <span className="mr-2 text-xl">{subject.icon}</span>
                  {subject.name}
                </Button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4">Format Output</h3>
              <Tabs value={outputFormat} onValueChange={(v) => setOutputFormat(v as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">
                    <Type className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="audio">
                    <Volume2 className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs value={outputFormat} onValueChange={(v) => setOutputFormat(v as any)} className="mt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="summary">
                    <FileText className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="sign">
                    <HandMetal className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </Card>

          {/* Material Display */}
          <Card className="p-6 lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{currentMaterial.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{subjects.find(s => s.id === selectedSubject)?.name}</span>
              </div>
            </div>

            {outputFormat === "text" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-muted rounded-lg p-6"
              >
                <p className="text-3xl leading-relaxed">{currentMaterial.content}</p>
              </motion.div>
            )}

            {outputFormat === "audio" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-muted rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px]"
              >
                <Volume2 className={`w-24 h-24 mb-6 ${isSpeaking ? 'text-secondary animate-pulse' : 'text-muted-foreground'}`} />
                <h3 className="text-xl font-bold mb-4">Pemutaran Audio</h3>
                {!isSpeaking ? (
                  <Button onClick={() => speakText(currentMaterial.content)} size="lg" className="bg-primary">
                    Putar Audio
                  </Button>
                ) : (
                  <Button onClick={stopSpeaking} size="lg" variant="outline">
                    Hentikan Audio
                  </Button>
                )}
              </motion.div>
            )}

            {outputFormat === "summary" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-muted rounded-lg p-6"
              >
                <h3 className="font-bold text-xl mb-4">Ringkasan Cepat</h3>
                <p className="text-2xl leading-relaxed">
                  {generateSummary(currentMaterial.content)}
                </p>
              </motion.div>
            )}

            {outputFormat === "sign" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-muted rounded-lg overflow-hidden"
              >
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/0FcwzMq4iWg"
                    title="Sign Language Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <HandMetal className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Video Bahasa Isyarat</h3>
                      <p className="text-muted-foreground">
                        Video ini menampilkan interpretasi bahasa isyarat untuk materi pembelajaran. 
                        Gunakan kontrol video untuk memutar, menjeda, atau menyesuaikan kecepatan.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

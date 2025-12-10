import { useState, useRef, useEffect } from "react";
import { Camera, Volume2, Type, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

// Definisi tipe untuk window agar TypeScript mengenali Tesseract global
declare global {
  interface Window {
    Tesseract: any;
  }
}

export default function EyeRead() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState("");
  const [activeOutput, setActiveOutput] = useState<
    "audio" | "text" | "summary"
  >("text");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isTesseractLoaded, setIsTesseractLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Load Tesseract script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.async = true;
    script.onload = () => setIsTesseractLoaded(true);
    script.onerror = () => {
      toast({
        title: "Gagal Memuat OCR",
        description:
          "Gagal memuat pustaka pengenalan teks. Silakan refresh halaman.",
        variant: "destructive",
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Effect untuk menangani pemasangan stream ke video element saat mode scanning aktif
  useEffect(() => {
    if (isScanning && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current
        .play()
        .catch((err) => console.error("Error playing video:", err));
    }
  }, [isScanning]);

  const startCamera = async () => {
    // Reset image jika ada, agar tampilan beralih ke video
    setCapturedImage(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      // Set state ini akan memicu re-render dan menampilkan elemen <video>
      // useEffect di atas kemudian akan menangani pemasangan srcObject
      setIsScanning(true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Kesalahan Kamera",
        description:
          "Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const processImage = async (imageSource: string) => {
    setIsProcessing(true);
    setCapturedImage(imageSource);
    stopCamera();

    toast({
      title: "Memindai...",
      description: "Mengirim gambar ke server untuk OCR",
    });

    try {
      // Convert base64 → Blob
      const res = await fetch(imageSource);
      const blob = await res.blob();

      // Siapkan FormData untuk IFormFile
      const form = new FormData();
      form.append("image", blob, "capture.png");

      // HIT API BACKEND
      const response = await fetch("http://localhost:5194/scan/ocr", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("OCR gagal: " + response.statusText);
      }

      const ocrText = await response.text();
      setScannedText(ocrText);

      setIsProcessing(false);
      setActiveOutput("text");

      toast({
        title: "Berhasil!",
        description: "Teks berhasil diekstrak dari server",
      });
    } catch (error) {
      console.error(error);
      setIsProcessing(false);

      toast({
        title: "Pemindaian Gagal",
        description: "Server gagal memproses OCR",
        variant: "destructive",
      });
    }
  };

  const captureAndScan = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);

    // BASE64 RESULT
    const dataUrl = canvas.toDataURL("image/png");

    // Simpan preview
    setCapturedImage(dataUrl);
    stopCamera();
    setIsProcessing(true);

    toast({
      title: "Memindai...",
      description: "Mengirim foto ke server untuk OCR",
    });

    try {
      // KONVERSI BASE64 → BLOB
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      // BUAT FORM DATA UNTUK IFormFile
      const form = new FormData();
      form.append("image", blob, "capture.png");

      // CALL BACKEND
      const response = await fetch("http://localhost:5071/scan/ocr", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("OCR gagal");
      }

      const text = await response.text();
      setScannedText(text);

      toast({
        title: "Berhasil!",
        description: "Teks berhasil diekstrak dari foto",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Gagal",
        description: "Tidak dapat memproses foto",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
    setActiveOutput("text");
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "File Tidak Valid",
        description: "Silakan pilih file gambar",
        variant: "destructive",
      });
      return;
    }

    setCapturedImage(URL.createObjectURL(file));
    stopCamera();

    setIsProcessing(true);
    toast({
      title: "Memindai...",
      description: "Mengirim gambar ke server untuk OCR",
    });

    try {
      const form = new FormData();
      form.append("image", file, "capture.png");

      const response = await fetch("http://localhost:5071/scan/ocr", {
        method: "POST",
        body: form,
      });

      const ocrText = await response.text();
      setScannedText(ocrText);

      toast({
        title: "Berhasil!",
        description: "Teks berhasil diekstrak",
      });
    } catch {
      toast({
        title: "Gagal",
        description: "Server gagal memproses OCR",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setScannedText("");
    startCamera();
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = 0.9;
      utterance.pitch = 1;
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
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const summary =
      sentences.slice(0, Math.min(3, sentences.length)).join(". ") + ".";
    return summary;
  };

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            EyeRead
          </h1>
          <p className="text-muted-foreground text-lg">
            Pindai buku, papan tulis, dan dokumen dengan teknologi OCR berbasis
            AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Section */}
          <Card className="p-6 shadow-lg">
            {/* Logic Tampilan: Image Result -> Video Live -> Placeholder Icon */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4 relative flex items-center justify-center ring-1 ring-border">
              {capturedImage ? (
                // TAMPILAN 1: Hasil Foto
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-contain"
                />
              ) : isScanning ? (
                // TAMPILAN 2: Live Camera (Ini akan langsung muncul saat tombol ditekan)
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                  />
                  {/* Frame Guide Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[85%] h-[85%] border-2 border-primary/50 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-medium border border-white/10">
                    Posisikan teks di dalam kotak
                  </div>
                </div>
              ) : (
                // TAMPILAN 3: Placeholder Icon
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-6 rounded-full bg-muted-foreground/10">
                    <Camera className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Kamera belum aktif
                  </p>
                </div>
              )}

              {isProcessing && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-sm font-medium animate-pulse">
                      Memproses teks...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3">
              {capturedImage ? (
                <div className="flex gap-3">
                  <Button
                    onClick={retakePhoto}
                    variant="outline"
                    className="flex-1"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Ambil Ulang
                  </Button>
                  <div className="relative flex-1">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Unggah Lainnya
                    </Button>
                  </div>
                </div>
              ) : !isScanning ? (
                <>
                  <Button
                    onClick={startCamera}
                    className="w-full bg-primary hover:bg-primary/90 transition-all"
                    disabled={isProcessing}
                    size="lg"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Buka Kamera
                  </Button>
                  <div className="relative">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Unggah Gambar
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex gap-3">
                  <Button
                    onClick={captureAndScan}
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={isProcessing}
                    size="lg"
                  >
                    {isProcessing ? "Memproses..." : "Tangkap & Pindai"}
                  </Button>
                  <Button
                    onClick={stopCamera}
                    variant="destructive"
                    disabled={isProcessing}
                  >
                    Hentikan
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6 shadow-lg flex flex-col h-full">
            <Tabs
              value={activeOutput}
              onValueChange={(v) => setActiveOutput(v as any)}
              className="h-full flex flex-col"
            >
              <TabsList className="grid w-full grid-cols-3 mb-2">
                <TabsTrigger value="text">
                  <Type className="w-4 h-4 mr-2" />
                  Teks
                </TabsTrigger>
                <TabsTrigger value="audio">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Audio
                </TabsTrigger>
                <TabsTrigger value="summary">
                  <FileText className="w-4 h-4 mr-2" />
                  Ringkasan
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 bg-muted/50 rounded-lg p-4 overflow-hidden border border-border">
                <TabsContent
                  value="text"
                  className="mt-0 h-full overflow-y-auto"
                >
                  {scannedText ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {scannedText}
                      </p>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-center p-8">
                      <p>
                        Belum ada teks.
                        <br />
                        Pindai dokumen atau unggah gambar untuk memulai.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent
                  value="audio"
                  className="mt-0 h-full flex items-center justify-center"
                >
                  <div className="text-center">
                    {scannedText ? (
                      <>
                        <div
                          className={`w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 ${
                            isSpeaking
                              ? "animate-pulse ring-4 ring-primary/20"
                              : ""
                          }`}
                        >
                          <Volume2
                            className={`w-12 h-12 ${
                              isSpeaking
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="space-y-4">
                          {!isSpeaking ? (
                            <Button
                              onClick={() => speakText(scannedText)}
                              className="w-full min-w-[200px]"
                              size="lg"
                            >
                              Putar Audio
                            </Button>
                          ) : (
                            <Button
                              onClick={stopSpeaking}
                              variant="secondary"
                              className="w-full min-w-[200px]"
                              size="lg"
                            >
                              Hentikan Audio
                            </Button>
                          )}
                          <p className="text-xs text-muted-foreground mt-4">
                            Menggunakan Text-to-Speech browser
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">
                        Pindai teks terlebih dahulu untuk mengaktifkan audio
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent
                  value="summary"
                  className="mt-0 h-full overflow-y-auto"
                >
                  {scannedText ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary" />
                        Poin Utama
                      </h3>
                      <div className="p-4 bg-background rounded-md border border-border shadow-sm">
                        <p className="text-base leading-relaxed">
                          {generateSummary(scannedText)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <p>Ringkasan akan muncul di sini setelah pemindaian.</p>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 rounded-lg bg-card border border-border text-card-foreground shadow-sm">
          <h3 className="font-semibold text-lg mb-4">
            Cara Menggunakan EyeRead:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-md">
              <span className="font-bold block mb-1">1. Mulai</span>
              Klik "Buka Kamera" atau unggah gambar dari galeri.
            </div>
            <div className="p-3 bg-muted rounded-md">
              <span className="font-bold block mb-1">2. Posisikan</span>
              Pastikan teks terlihat jelas dan berada dalam kotak panduan.
            </div>
            <div className="p-3 bg-muted rounded-md">
              <span className="font-bold block mb-1">3. Tangkap</span>
              Tekan tombol "Tangkap & Pindai" untuk mengekstrak tulisan.
            </div>
            <div className="p-3 bg-muted rounded-md">
              <span className="font-bold block mb-1">4. Nikmati</span>
              Dengarkan audio atau baca ringkasan dari hasil pindaian.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { TrendingUp, CheckCircle2, Circle, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const learningPath = [
  { id: 1, title: "Penjumlahan Dasar", completed: true, score: 95 },
  { id: 2, title: "Pengurangan Dasar", completed: true, score: 88 },
  { id: 3, title: "Tabel Perkalian", completed: false, score: 0 },
  { id: 4, title: "Pembagian Sederhana", completed: false, score: 0 },
  { id: 5, title: "Dasar-dasar Pecahan", completed: false, score: 0 },
];

const quizQuestions = [
  {
    id: 1,
    question: "Berapa 7 × 8?",
    options: ["54", "56", "63", "64"],
    correct: "56",
  },
  {
    id: 2,
    question: "Berapa 9 × 6?",
    options: ["45", "54", "63", "72"],
    correct: "54",
  },
  {
    id: 3,
    question: "Berapa 12 × 5?",
    options: ["50", "55", "60", "65"],
    correct: "60",
  },
];

export default function Pathly() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const overallProgress = (learningPath.filter(p => p.completed).length / learningPath.length) * 100;

  const handleSubmitAnswer = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setQuizComplete(false);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Pathly</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Perjalanan pembelajaran adaptif yang dipersonalisasi untuk Anda
          </p>
        </div>

        {!showQuiz ? (
          <>
            {/* Progress Overview */}
            <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-1">Progress Anda</h2>
                  <p className="text-muted-foreground">Matematika - Kelas 3</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{Math.round(overallProgress)}%</div>
                  <p className="text-sm text-muted-foreground">Selesai</p>
                </div>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </Card>

            {/* Learning Path */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {learningPath.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 card-hover ${item.completed ? 'border-green-500 border-2' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-green-500' : 'bg-muted'
                      }`}>
                        {item.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          {item.completed ? (
                            <>
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">Nilai: {item.score}%</span>
                            </>
                          ) : (
                            <span className="text-sm text-muted-foreground">Belum dimulai</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quiz CTA */}
            <Card className="p-8 bg-gradient-to-br from-accent/20 to-secondary/20 border-2 border-accent/30">
              <div className="text-center">
                <Trophy className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-4 text-accent" />
                <h2 className="text-xl md:text-2xl font-bold mb-2">Siap untuk Kuis?</h2>
                <p className="text-muted-foreground mb-6">
                  Uji pengetahuan Anda tentang Tabel Perkalian
                </p>
                <Button size="lg" onClick={() => setShowQuiz(true)} className="bg-accent">
                  Mulai Kuis
                </Button>
              </div>
            </Card>
          </>
        ) : (
          <Card className="p-6 md:p-8 max-w-2xl mx-auto">
            {!quizComplete ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">
                      Soal {currentQuestion + 1} dari {quizQuestions.length}
                    </span>
                    <span className="text-sm font-medium">
                      Nilai: {score}/{currentQuestion}
                    </span>
                  </div>
                  <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} />
                </div>

                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {quizQuestions[currentQuestion].question}
                </h2>

                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                      >
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="flex-1 cursor-pointer text-lg">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-8 flex gap-3">
                  <Button onClick={resetQuiz} variant="outline" className="flex-1">
                    Batal
                  </Button>
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="flex-1 bg-primary"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Selanjutnya" : "Selesai"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Trophy className={`w-16 md:w-24 h-16 md:h-24 mx-auto mb-6 ${
                  score >= 2 ? 'text-yellow-500' : 'text-muted-foreground'
                }`} />
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Kuis Selesai!</h2>
                <p className="text-lg md:text-xl mb-6">
                  Nilai Anda: {score} dari {quizQuestions.length}
                </p>
                <div className="space-y-3">
                  <Button onClick={resetQuiz} className="w-full bg-primary">
                    Kembali ke Jalur Belajar
                  </Button>
                  <Button onClick={() => {setQuizComplete(false); setCurrentQuestion(0); setScore(0); setSelectedAnswer("");}} variant="outline" className="w-full">
                    Ulangi Kuis
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </motion.div>
    </div>
  );
}

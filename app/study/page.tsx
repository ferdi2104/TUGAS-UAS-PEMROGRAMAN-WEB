'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Flashcard from '@components/Flashcard';
import { motion } from 'framer-motion';
import { supabase } from '@lib/supabase';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  difficulty?: string;
}

export default function StudyPage() {
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const docId = localStorage.getItem('documentId');

    async function loadFromDB() {
      if (!docId) return false;
      const { data, error } = await supabase
        .from('flashcards')
        .select('id, question, answer, difficulty')
        .eq('document_id', docId);
      if (error || !data || data.length === 0) return false;
      setFlashcards(data);
      setStats((prev) => ({ ...prev, total: data.length }));
      return true;
    }

    async function init() {
      const loaded = await loadFromDB();
      if (loaded) return;

      const stored = localStorage.getItem('flashcards');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFlashcards(parsed);
        setStats((prev) => ({ ...prev, total: parsed.length }));
      } else {
        router.push('/upload');
      }
    }

    init();
  }, []);

  const handleAnswer = (correct: boolean) => {
    const newStats = {
      ...stats,
      correct: correct ? stats.correct + 1 : stats.correct,
      incorrect: !correct ? stats.incorrect + 1 : stats.incorrect,
    };
    setStats(newStats);

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Save study results for dashboard
      localStorage.setItem('studyResults', JSON.stringify({
        learned: newStats.correct,
        learning: newStats.total - newStats.correct - newStats.incorrect,
        mastered: newStats.correct,
      }));
      setIsFinished(true);
    }
  };

  const restartStudy = () => {
    setCurrentIndex(0);
    setStats({ correct: 0, incorrect: 0, total: stats.total });
    setIsFinished(false);
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isFinished) {
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl p-12 text-center max-w-md"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-6">
            {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
          </div>

          <h2 className="text-3xl font-bold mb-4">Selesai!</h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Kartu:</span>
              <span className="font-bold">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Benar:</span>
              <span className="font-bold text-green-600">{stats.correct}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">Salah:</span>
              <span className="font-bold text-red-600">{stats.incorrect}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-gray-600">Skor:</span>
              <span className="font-bold text-lg text-primary">{percentage}%</span>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              className="btn-primary flex-1"
              onClick={restartStudy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ulang
            </motion.button>
            <motion.button
              className="btn-outline flex-1"
              onClick={() => router.push('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold">Belajar Sekarang</h1>
              <p className="text-gray-600">Kartu {currentIndex + 1} dari {flashcards.length}</p>
            </div>
            <motion.button
              className="btn-outline"
              onClick={() => router.push('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kembali
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card bg-green-50 border-2 border-green-200 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
            <p className="text-sm text-gray-600">Benar</p>
          </div>
          <div className="card bg-blue-50 border-2 border-blue-200 text-center">
            <p className="text-2xl font-bold text-blue-600">{currentIndex + 1}</p>
            <p className="text-sm text-gray-600">Kartu</p>
          </div>
          <div className="card bg-red-50 border-2 border-red-200 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.incorrect}</p>
            <p className="text-sm text-gray-600">Salah</p>
          </div>
        </motion.div>

        {/* Flashcard */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          key={currentCard.id}
        >
          <Flashcard
            id={currentCard.id}
            question={currentCard.question}
            answer={currentCard.answer}
            onAnswer={handleAnswer}
          />
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex justify-between items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="btn-outline"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Sebelumnya
          </motion.button>

          <span className="text-gray-600 text-sm">
            {currentIndex + 1} / {flashcards.length}
          </span>

          <motion.button
            className="btn-primary"
            onClick={() => setCurrentIndex(Math.min(flashcards.length - 1, currentIndex + 1))}
            disabled={currentIndex === flashcards.length - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Selanjutnya →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

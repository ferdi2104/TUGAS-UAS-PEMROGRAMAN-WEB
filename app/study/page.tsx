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
      if (!docId || !supabase) return false;
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
      <div className="flex items-center justify-center min-h-screen bg-background pt-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant font-label">Memuat flashcard...</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    return (
      <motion.div
        className="min-h-screen flex items-center justify-center px-4 pt-16 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-surface-container rounded-xl border border-outline/10 p-12 text-center max-w-md shadow-[0_0_40px_rgba(255,45,120,0.1)]"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="material-symbols-outlined text-6xl text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
            {percentage >= 70 ? 'stars' : percentage >= 50 ? 'thumb_up' : 'school'}
          </span>

          <h2 className="text-3xl font-black font-headline text-on-surface mb-6">Selesai!</h2>

          <div className="bg-surface-container-high rounded-xl p-6 mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-on-surface-variant font-label">Total Kartu:</span>
              <span className="font-bold text-on-surface">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary font-label">Benar:</span>
              <span className="font-bold text-secondary">{stats.correct}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary font-label">Salah:</span>
              <span className="font-bold text-primary">{stats.incorrect}</span>
            </div>
            <div className="border-t border-outline/20 pt-3 flex justify-between">
              <span className="text-on-surface-variant font-label">Skor:</span>
              <span className="font-bold text-lg text-secondary">{percentage}%</span>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              className="flex-1 bg-primary text-on-primary font-label font-bold py-3 transition-all hover:shadow-[0_0_15px_rgba(255,45,120,0.5)] active:scale-95"
              onClick={restartStudy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ulang
            </motion.button>
            <motion.button
              className="flex-1 bg-surface-container-highest border border-outline/30 text-on-surface font-label font-bold py-3 transition-all hover:bg-surface-variant active:scale-95"
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
      className="min-h-screen py-12 px-4 pt-24 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="mb-8" initial={{ y: -20 }} animate={{ y: 0 }}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-black font-headline text-on-surface">Belajar Sekarang</h1>
              <p className="text-on-surface-variant font-label text-sm mt-1">Kartu {currentIndex + 1} dari {flashcards.length}</p>
            </div>
            <motion.button
              className="bg-surface-container-highest border border-outline/30 text-on-surface font-label font-bold px-5 py-2 text-sm transition-all hover:bg-surface-variant active:scale-95"
              onClick={() => router.push('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kembali
            </motion.button>
          </div>

          <div className="bg-surface-container rounded-xl border border-outline/10 p-4">
            <div className="flex justify-between text-sm text-on-surface-variant font-label mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-surface-container rounded-xl border-2 border-secondary/30 p-4 text-center">
            <p className="text-2xl font-bold text-secondary font-headline">{stats.correct}</p>
            <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mt-1">Benar</p>
          </div>
          <div className="bg-surface-container rounded-xl border-2 border-primary/30 p-4 text-center">
            <p className="text-2xl font-bold text-primary font-headline">{currentIndex + 1}</p>
            <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mt-1">Kartu</p>
          </div>
          <div className="bg-surface-container rounded-xl border-2 border-tertiary/30 p-4 text-center">
            <p className="text-2xl font-bold text-tertiary font-headline">{stats.incorrect}</p>
            <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mt-1">Salah</p>
          </div>
        </motion.div>

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

        <motion.div
          className="flex justify-between items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="bg-surface-container-highest border border-outline/30 text-on-surface font-label font-bold px-5 py-2 text-sm transition-all hover:bg-surface-variant active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Sebelumnya
          </motion.button>

          <span className="text-on-surface-variant font-label text-sm">
            {currentIndex + 1} / {flashcards.length}
          </span>

          <motion.button
            className="bg-primary text-on-primary font-label font-bold px-5 py-2 text-sm transition-all hover:shadow-[0_0_15px_rgba(255,45,120,0.5)] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
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

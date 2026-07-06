'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  id: string;
  question: string;
  answer: string;
  onAnswer?: (correct: boolean) => void;
}

export default function Flashcard({
  id,
  question,
  answer,
  onAnswer,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleFlip = () => {
    if (!hasAnswered) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleAnswer = (correct: boolean) => {
    if (!isFlipped) return;
    onAnswer?.(correct);
    setHasAnswered(true);
    setTimeout(() => {
      setIsFlipped(false);
      setHasAnswered(false);
    }, 500);
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="flashcard-container mb-8 cursor-pointer"
        onClick={handleFlip}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-full h-72"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 text-on-primary rounded-xl p-8 flex flex-col items-center justify-center text-center backface-hidden border border-primary/30 shadow-[0_0_20px_rgba(255,45,120,0.2)]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-sm opacity-75 mb-4 font-label uppercase tracking-wider">Pertanyaan</p>
            <p className="text-2xl font-bold font-headline">{question}</p>
            <p className="text-xs opacity-50 mt-6 font-label uppercase tracking-wider">Click to reveal</p>
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/80 text-on-secondary rounded-xl p-8 flex flex-col items-center justify-center text-center backface-hidden border border-secondary/30 shadow-[0_0_20px_rgba(0,255,204,0.2)]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-sm opacity-75 mb-4 font-label uppercase tracking-wider">Jawaban</p>
            <p className="text-2xl font-bold font-headline">{answer}</p>
          </div>
        </motion.div>
      </div>

      <div className="text-center mb-8">
        <p className="text-on-surface-variant font-label text-sm">
          {isFlipped
            ? 'Apakah jawaban Anda benar?'
            : 'Klik kartu untuk melihat jawaban'}
        </p>
      </div>

      {isFlipped && (
        <div className="flex gap-4 justify-center">
          <motion.button
            className="bg-surface-container-highest border border-primary/30 text-primary font-label font-bold px-8 py-3 transition-all hover:bg-primary/10 active:scale-95"
            onClick={() => handleAnswer(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Salah
          </motion.button>
          <motion.button
            className="bg-secondary text-on-secondary font-label font-bold px-8 py-3 transition-all hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] active:scale-95"
            onClick={() => handleAnswer(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Benar
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

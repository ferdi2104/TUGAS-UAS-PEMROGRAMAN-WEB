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
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-8 flex flex-col items-center justify-center text-center backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-sm opacity-75 mb-4">Pertanyaan</p>
            <p className="text-2xl font-semibold">{question}</p>
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-8 flex flex-col items-center justify-center text-center backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-sm opacity-75 mb-4">Jawaban</p>
            <p className="text-2xl font-semibold">{answer}</p>
          </div>
        </motion.div>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600">
          {isFlipped
            ? 'Apakah jawaban Anda benar?'
            : 'Klik kartu untuk melihat jawaban'}
        </p>
      </div>

      {isFlipped && (
        <div className="flex gap-4 justify-center">
          <motion.button
            className="btn-danger"
            onClick={() => handleAnswer(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Salah ❌
          </motion.button>
          <motion.button
            className="btn-secondary"
            onClick={() => handleAnswer(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Benar ✓
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

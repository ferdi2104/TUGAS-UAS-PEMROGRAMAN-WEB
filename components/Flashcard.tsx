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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    onAnswer?.(correct);
    setIsFlipped(false);
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flashcard-container mb-8">
        <motion.div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="flashcard-front text-2xl font-semibold">
            <div className="text-center">
              <p className="text-sm opacity-75 mb-4">Pertanyaan</p>
              <p>{question}</p>
            </div>
          </div>

          <div className="flashcard-back text-2xl font-semibold">
            <div className="text-center">
              <p className="text-sm opacity-75 mb-4">Jawaban</p>
              <p>{answer}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">Klik kartu untuk melihat jawaban</p>
      </div>

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
    </motion.div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '@lib/supabase';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface DashboardStats {
  total: number;
  learned: number;
  learning: number;
  mastered: number;
}

export default function DashboardPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    learned: 0,
    learning: 0,
    mastered: 0,
  });
  const [documentName, setDocumentName] = useState('');

  useEffect(() => {
    const docId = localStorage.getItem('documentId');
    const docName = localStorage.getItem('documentName');
    const studyResults = localStorage.getItem('studyResults');

    async function loadFromDB() {
      if (!docId) return false;
      const { data: flashcardsData, error } = await supabase
        .from('flashcards')
        .select('id, question, answer')
        .eq('document_id', docId);
      if (error || !flashcardsData || flashcardsData.length === 0) return false;
      setFlashcards(flashcardsData);
      return true;
    }

    async function init() {
      const loaded = await loadFromDB();
      if (loaded) {
        setDocumentName(docName || 'Dokumen');
        if (studyResults) {
          const results = JSON.parse(studyResults);
          setStats({
            total: flashcards.length,
            learned: results.learned || 0,
            learning: results.learning || 0,
            mastered: results.mastered || 0,
          });
        }
        return;
      }

      const stored = localStorage.getItem('flashcards');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFlashcards(parsed);
        setDocumentName(docName || 'Dokumen');
        if (studyResults) {
          const results = JSON.parse(studyResults);
          setStats({
            total: parsed.length,
            learned: results.learned || 0,
            learning: results.learning || 0,
            mastered: results.mastered || 0,
          });
        } else {
          setStats({ total: parsed.length, learned: 0, learning: 0, mastered: 0 });
        }
      }
    }

    init();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-light py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-2">Dashboard Belajar</h1>
          <p className="text-gray-600">
            Dokumen: <span className="font-semibold">{documentName}</span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
        >
          {[
            { label: 'Total Flashcard', value: stats.total, icon: '📚', bg: 'bg-blue-50', border: 'border-blue-200' },
            { label: 'Sudah Dipelajari', value: stats.learned, icon: '✓', bg: 'bg-green-50', border: 'border-green-200' },
            { label: 'Sedang Belajar', value: stats.learning, icon: '🔄', bg: 'bg-yellow-50', border: 'border-yellow-200' },
            { label: 'Sudah Dikuasai', value: stats.mastered, icon: '⭐', bg: 'bg-purple-50', border: 'border-purple-200' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`card ${stat.bg} border-2 ${stat.border}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">Progress Pembelajaran</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Sudah Dipelajari</span>
                  <span className="text-sm font-semibold">
                    {stats.total > 0 ? Math.round((stats.learned / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-primary h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: stats.total > 0 ? `${(stats.learned / stats.total) * 100}%` : '0%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Sudah Dikuasai</span>
                  <span className="text-sm font-semibold">
                    {stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-secondary h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: stats.total > 0 ? `${(stats.mastered / stats.total) * 100}%` : '0%' }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          <Link href="/study" className="w-full">
            <motion.button
              className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🎴 Belajar Flashcard
            </motion.button>
          </Link>

          <Link href="/study" className="w-full">
            <motion.button
              className="btn-secondary py-4 text-lg font-semibold flex items-center justify-center gap-2 w-full"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🎓 Mode Quiz
            </motion.button>
          </Link>

          <Link href="/upload" className="w-full">
            <motion.button
              className="btn-outline py-4 text-lg font-semibold flex items-center justify-center gap-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              📁 Upload Baru
            </motion.button>
          </Link>
        </motion.div>

        {/* Recent Flashcards Preview */}
        <motion.div className="mt-12" variants={itemVariants}>
          <h3 className="font-bold text-xl mb-6">Preview Flashcard</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {flashcards.slice(0, 4).map((card) => (
              <motion.div
                key={card.id}
                className="card cursor-pointer hover:shadow-xl transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <p className="text-sm text-gray-500 mb-2">Pertanyaan</p>
                <p className="font-semibold mb-4 line-clamp-2">{card.question}</p>
                <p className="text-sm text-gray-500 mb-2">Jawaban</p>
                <p className="text-gray-600 line-clamp-2">{card.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

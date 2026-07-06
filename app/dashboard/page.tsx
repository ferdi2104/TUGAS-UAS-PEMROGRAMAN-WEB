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

    async function init() {
      let cards: Flashcard[] = [];
      let loaded = false;

      if (docId && supabase) {
        const { data, error } = await supabase
          .from('flashcards')
          .select('id, question, answer')
          .eq('document_id', docId);
        if (!error && data && data.length > 0) {
          cards = data;
          loaded = true;
        }
      }

      if (!loaded) {
        const stored = localStorage.getItem('flashcards');
        if (stored) {
          cards = JSON.parse(stored);
          loaded = true;
        }
      }

      if (loaded) {
        setFlashcards(cards);
        setDocumentName(docName || 'Dokumen');
        if (studyResults) {
          const results = JSON.parse(studyResults);
          setStats({
            total: cards.length,
            learned: results.learned || 0,
            learning: results.learning || 0,
            mastered: results.mastered || 0,
          });
        } else {
          setStats({ total: cards.length, learned: 0, learning: 0, mastered: 0 });
        }
      }
    }

    init();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!flashcards.length) {
    return (
      <motion.div
        className="min-h-screen py-12 px-4 pt-24 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center py-20">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">school</span>
          <h1 className="text-3xl font-black font-headline text-on-surface mb-2">Belum Ada Data</h1>
          <p className="text-on-surface-variant font-body mb-8">Upload catatan atau dokumen kamu untuk memulai belajar.</p>
          <Link href="/upload">
            <button className="bg-primary text-on-primary font-label font-bold px-8 py-3 transition-all hover:shadow-[0_0_15px_rgba(255,45,120,0.5)] active:scale-95">
              UPLOAD NOW
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen py-12 px-4 pt-24 bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-black font-headline text-on-surface mb-2">Dashboard Belajar</h1>
          <p className="text-on-surface-variant font-body">
            Dokumen: <span className="font-bold text-secondary">{documentName}</span>
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12" variants={containerVariants}>
          {[
            { label: 'Total Flashcard', value: stats.total, icon: 'menu_book', color: 'text-primary', border: 'border-primary/30' },
            { label: 'Sudah Dipelajari', value: stats.learned, icon: 'check_circle', color: 'text-secondary', border: 'border-secondary/30' },
            { label: 'Sedang Belajar', value: stats.learning, icon: 'sync', color: 'text-tertiary', border: 'border-tertiary/30' },
            { label: 'Sudah Dikuasai', value: stats.mastered, icon: 'stars', color: 'text-primary', border: 'border-primary/30' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`bg-surface-container rounded-xl border-2 ${stat.border} p-5`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <span className={`material-symbols-outlined text-3xl mb-2 ${stat.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              <p className="text-on-surface-variant text-sm font-label mb-1 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold font-headline text-on-surface">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mb-12" variants={itemVariants}>
          <div className="bg-surface-container rounded-xl border border-outline/10 p-6">
            <h3 className="font-headline font-bold text-lg text-on-surface mb-4">Progress Pembelajaran</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-on-surface-variant font-label">Sudah Dipelajari</span>
                  <span className="text-sm font-bold text-on-surface">
                    {stats.total > 0 ? Math.round((stats.learned / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-3">
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
                  <span className="text-sm text-on-surface-variant font-label">Sudah Dikuasai</span>
                  <span className="text-sm font-bold text-on-surface">
                    {stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-3">
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

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
          <Link href="/study">
            <motion.button
              className="w-full bg-primary text-on-primary font-label font-bold py-4 text-lg transition-all hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] active:scale-95"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="material-symbols-outlined align-middle mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              Belajar Flashcard
            </motion.button>
          </Link>
          <Link href="/study">
            <motion.button
              className="w-full bg-surface-container-highest border border-secondary/30 text-secondary font-label font-bold py-4 text-lg transition-all hover:bg-secondary/10 active:scale-95"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="material-symbols-outlined align-middle mr-2">quiz</span>
              Mode Quiz
            </motion.button>
          </Link>
          <Link href="/upload">
            <motion.button
              className="w-full bg-surface-container-highest border border-outline/30 text-on-surface font-label font-bold py-4 text-lg transition-all hover:bg-surface-variant active:scale-95"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="material-symbols-outlined align-middle mr-2">upload_file</span>
              Upload Baru
            </motion.button>
          </Link>
        </motion.div>

        <motion.div className="mt-12" variants={itemVariants}>
          <h3 className="font-headline font-bold text-xl text-on-surface mb-6">Preview Flashcard</h3>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
            {flashcards.slice(0, 4).map((card) => (
              <motion.div
                key={card.id}
                className="bg-surface-container rounded-xl border border-outline/10 p-5 hover:border-primary/30 transition-all cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mb-2">Pertanyaan</p>
                <p className="font-semibold text-on-surface mb-4 line-clamp-2">{card.question}</p>
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider mb-2">Jawaban</p>
                <p className="text-on-surface-variant line-clamp-2 font-body">{card.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

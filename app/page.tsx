'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden" variants={itemVariants}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative">
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold text-light mb-6 leading-tight"
            variants={itemVariants}
          >
            Belajar <span className="text-gradient">Lebih Cerdas</span> dengan AI
          </motion.h1>
          
          <motion.p
            className="text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Transform catatan Anda menjadi flashcard interaktif dan kuis otomatis menggunakan AI
          </motion.p>

          <motion.div className="flex gap-4 justify-center mb-16" variants={itemVariants}>
            <Link href="/upload">
              <button className="btn-primary text-lg px-8 py-3 shadow-lg shadow-primary/20">
                Mulai Sekarang
              </button>
            </Link>
            <Link href="/about">
              <button className="btn-outline text-lg px-8 py-3">
                Pelajari Lebih Lanjut
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="card !bg-surface-light/60 backdrop-blur-xl border-border/50"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2 text-light">Cepat</h3>
                <p className="text-muted">Generate flashcard dalam hitungan detik</p>
              </div>
              <div className="text-center p-4 border-x border-border/50">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2 text-light">Akurat</h3>
                <p className="text-muted">AI memahami konteks catatan Anda</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="font-bold text-lg mb-2 text-light">Efektif</h3>
                <p className="text-muted">Spaced repetition untuk hasil optimal</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30" variants={itemVariants}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-light"
            variants={itemVariants}
          >
            Fitur Unggulan
          </motion.h2>
          <motion.p className="text-center text-muted mb-16 max-w-xl mx-auto" variants={itemVariants}>
            Semua yang Anda butuhkan untuk belajar lebih efisien
          </motion.p>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
            {[
              {
                icon: '📄',
                title: 'Upload Mudah',
                desc: 'Upload PDF atau text langsung dari device Anda',
              },
              {
                icon: '🤖',
                title: 'Powered by AI',
                desc: 'Google Gemini AI untuk generate Q&A berkualitas tinggi',
              },
              {
                icon: '🎴',
                title: 'Flashcard Interaktif',
                desc: 'Belajar dengan flashcard yang cantik dan responsif',
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                desc: 'Pantau progress belajar dengan dashboard detail',
              },
              {
                icon: '🎓',
                title: 'Mode Quiz',
                desc: 'Test pengetahuan dengan quiz interaktif',
              },
              {
                icon: '🔄',
                title: 'Spaced Repetition',
                desc: 'Algoritma repetisi terjadwal untuk hafalan optimal',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="card group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-light group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" variants={itemVariants}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.h2
            className="text-4xl font-bold mb-4 text-light"
            variants={itemVariants}
          >
            Siap Mengubah Cara Belajarmu?
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted mb-10 max-w-lg mx-auto"
            variants={itemVariants}
          >
            Bergabunglah dengan ribuan siswa yang telah merasakan belajar lebih efisien
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/upload">
              <button className="btn-primary text-lg px-10 py-3.5 shadow-lg shadow-primary/30">
                Mulai Belajar Sekarang
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}

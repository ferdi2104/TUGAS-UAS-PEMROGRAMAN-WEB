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
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8" variants={itemVariants}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Belajar <span className="text-primary">Lebih Cerdas</span> dengan AI
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Transform catatan Anda menjadi flashcard interaktif dan kuis otomatis menggunakan AI
          </motion.p>

          <motion.div className="flex gap-4 justify-center mb-12" variants={itemVariants}>
            <Link href="/upload">
              <button className="btn-primary text-lg px-8 py-3">
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
            className="bg-white rounded-xl shadow-xl p-8"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">⚡</div>
                <h3 className="font-bold text-lg mb-2">Cepat</h3>
                <p className="text-gray-600">Generate flashcard dalam hitungan detik</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">🎯</div>
                <h3 className="font-bold text-lg mb-2">Akurat</h3>
                <p className="text-gray-600">AI memahami konteks catatan Anda</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-warning mb-2">📈</div>
                <h3 className="font-bold text-lg mb-2">Efektif</h3>
                <p className="text-gray-600">Spaced repetition untuk hasil optimal</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" variants={itemVariants}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Fitur Unggulan
          </motion.h2>

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
                className="card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary" variants={itemVariants}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2
            className="text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            Siap Mengubah Cara Belajarmu?
          </motion.h2>
          
          <motion.p
            className="text-xl mb-8 opacity-90"
            variants={itemVariants}
          >
            Bergabunglah dengan ribuan siswa yang telah merasakan belajar lebih efisien
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/upload">
              <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg">
                Mulai Belajar Sekarang
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}

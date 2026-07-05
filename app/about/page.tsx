'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-light py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="mb-12" variants={itemVariants}>
          <h1 className="text-5xl font-bold mb-4">Tentang StudyFlash AI</h1>
          <p className="text-xl text-gray-600">
            Platform SaaS revolusioner untuk pembelajaran yang lebih efisien
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-4 text-gray-700 leading-relaxed">
            <p>
              StudyFlash AI lahir dari sebuah ide sederhana: bagaimana cara membuat belajar menjadi lebih efisien dan menyenangkan?
            </p>
            <p>
              Kami menyadari bahwa kebanyakan siswa menghabiskan waktu berjam-jam untuk membuat catatan, membuat flashcard manual, dan mengulang-ulang materi. Dengan teknologi AI yang terus berkembang, kami percaya ini bisa diotomatisasi.
            </p>
            <p>
              Lahirlah StudyFlash AI - platform yang mengubah catatan menjadi flashcard interaktif dalam hitungan detik, dilengkapi dengan spaced repetition algorithm untuk hasil pembelajaran optimal.
            </p>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6">Fitur Unggulan</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {[
              {
                icon: '🚀',
                title: 'AI-Powered Generation',
                desc: 'Menggunakan Google Gemini AI untuk menghasilkan Q&A berkualitas tinggi',
              },
              {
                icon: '🎴',
                title: 'Interactive Flashcards',
                desc: 'Flashcard dengan animasi mulus dan UX yang intuitif',
              },
              {
                icon: '🧠',
                title: 'Spaced Repetition',
                desc: 'Algoritma pembelajaran ilmiah untuk retensi maksimal',
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                desc: 'Dashboard komprehensif untuk monitor kemajuan belajar',
              },
              {
                icon: '🎯',
                title: 'Quiz Mode',
                desc: 'Test pengetahuan dengan mode quiz yang interaktif',
              },
              {
                icon: '☁️',
                title: 'Cloud-Based',
                desc: 'Akses dari mana saja, kapan saja dengan sinkronisasi real-time',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="font-bold text-lg mb-4 text-primary">Frontend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Next.js 14 (React Framework)</li>
                  <li>• TypeScript</li>
                  <li>• TailwindCSS</li>
                  <li>• Framer Motion (Animations)</li>
                  <li>• Zustand (State Management)</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="font-bold text-lg mb-4 text-secondary">Backend & Database</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Next.js API Routes</li>
                  <li>• Supabase (PostgreSQL)</li>
                  <li>• Google Gemini AI API</li>
                  <li>• NextAuth.js (Auth)</li>
                  <li>• PDF.js (PDF Processing)</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="bg-gradient-to-r from-primary to-secondary rounded-xl p-12 text-center text-white"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4">Siap Memulai?</h2>
          <p className="mb-8 text-lg">Ubah cara Anda belajar dengan StudyFlash AI</p>
          <Link href="/upload">
            <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Mulai Sekarang
            </button>
          </Link>
        </motion.section>
      </div>
    </motion.div>
  );
}

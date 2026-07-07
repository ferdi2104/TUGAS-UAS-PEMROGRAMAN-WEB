'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="pt-24 pb-12 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-black font-headline text-on-surface tracking-tighter mb-4">
            ABOUT <span className="text-primary neon-text-pink">NEON-ACTION</span>
          </h1>
          <p className="text-on-surface-variant font-body text-lg max-w-2xl mx-auto">
            Student-exclusive cinema platform. Premium action movies, free for verified students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="bg-surface-container rounded-xl border border-outline/10 p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold font-headline text-secondary mb-4">Our Mission</h2>
            <p className="text-on-surface-variant font-body leading-relaxed">
              NEON-ACTION Universe delivers high-octane action cinema directly to students,
              free of charge. We believe entertainment should never be a financial burden
              for those pursuing education.
            </p>
          </motion.div>

          <motion.div
            className="bg-surface-container rounded-xl border border-outline/10 p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold font-headline text-primary mb-4">Student First</h2>
            <p className="text-on-surface-variant font-body leading-relaxed">
              Verified through university portals, our platform ensures that every
              student gets ad-free streaming access to curated action films from
              around the world.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="bg-surface-container rounded-xl border border-secondary/20 p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold font-headline text-on-surface mb-6">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-label font-bold text-primary text-sm uppercase tracking-widest mb-4">Frontend</h3>
              <ul className="space-y-2 text-on-surface-variant font-body">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Next.js 14 (React)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> TypeScript</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> TailwindCSS + Neon Theme</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Framer Motion</li>
              </ul>
            </div>
            <div>
              <h3 className="font-label font-bold text-secondary text-sm uppercase tracking-widest mb-4">Backend & Database</h3>
              <ul className="space-y-2 text-on-surface-variant font-body">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Next.js API Routes</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Supabase (PostgreSQL)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> YouTube Embed API</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center bg-surface-container/50 border border-primary/20 rounded-2xl p-12 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-black font-headline text-on-surface mb-4">Ready to Watch?</h2>
          <p className="text-on-surface-variant mb-8 text-lg">Access granted for all students. No payment needed.</p>
          <Link href="/pencarian">
            <button className="bg-primary text-on-primary font-label font-bold px-8 py-4 transition-all hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] active:scale-95">
              EXPLORE MOVIES
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

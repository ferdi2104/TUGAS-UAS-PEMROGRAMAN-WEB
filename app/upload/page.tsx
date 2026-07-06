'use client';

import { useState } from 'react';
import FileUpload from '@components/FileUpload';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errMsg = 'Gagal memproses file';
        try { const d = await response.json(); errMsg = d.error || d.details || errMsg; } catch {}
        throw new Error(errMsg);
      }

      const data = await response.json();

      localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
      localStorage.setItem('documentName', file.name);
      if (data.documentId) {
        localStorage.setItem('documentId', data.documentId);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Gagal memproses file. Silahkan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen py-12 px-4 pt-24 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="mb-12 text-center" initial={{ y: -20 }} animate={{ y: 0 }}>
          <h1 className="text-4xl font-black font-headline text-on-surface mb-4">
            Upload Catatan Anda
          </h1>
          <p className="text-on-surface-variant font-body text-lg">
            Ubah catatan menjadi flashcard interaktif dengan bantuan AI
          </p>
        </motion.div>

        {isProcessing ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-lg font-label text-on-surface-variant">Memproses catatan Anda...</p>
            <p className="text-sm text-on-surface-variant/60 mt-2">Ini mungkin memakan waktu beberapa detik</p>
          </motion.div>
        ) : (
          <FileUpload onUpload={handleUpload} />
        )}

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-surface-container rounded-xl border border-outline/10 p-6">
            <h3 className="font-headline font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">lightbulb</span>
              Format yang Didukung
            </h3>
            <ul className="space-y-2 text-on-surface-variant font-body">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> PDF Documents</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Text Files (.txt)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Markdown Files (.md)</li>
            </ul>
          </div>

          <div className="bg-surface-container rounded-xl border border-outline/10 p-6">
            <h3 className="font-headline font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">bolt</span>
              Tips Optimal
            </h3>
            <ul className="space-y-2 text-on-surface-variant font-body">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Gunakan catatan yang terstruktur</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Pisahkan konsep dengan jelas</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> File maksimal 10MB</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

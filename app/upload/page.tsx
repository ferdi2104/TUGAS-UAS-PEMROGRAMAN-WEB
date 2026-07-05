'use client';

import { useState } from 'react';
import FileUpload from '@components/FileUpload';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (file: File, content: string) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('content', content);

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      localStorage.setItem('flashcards', JSON.stringify(data.flashcards));
      localStorage.setItem('documentName', file.name);
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal memproses file. Silahkan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="mb-12" initial={{ y: -20 }} animate={{ y: 0 }}>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Upload Catatan Anda
          </h1>
          <p className="text-center text-gray-600 text-lg">
            Ubah catatan menjadi flashcard interaktif dengan bantuan AI
          </p>
        </motion.div>

        {isProcessing ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin">
              <div className="text-6xl">🔄</div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Memproses catatan Anda...</p>
            <p className="text-sm text-gray-500 mt-2">Ini mungkin memakan waktu beberapa detik</p>
          </motion.div>
        ) : (
          <FileUpload onUpload={handleUpload} />
        )}

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card">
            <h3 className="font-bold text-lg mb-4">💡 Format yang Didukung</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• PDF Documents</li>
              <li>• Text Files (.txt)</li>
              <li>• Markdown Files (.md)</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-bold text-lg mb-4">⚡ Tips Optimal</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Gunakan catatan yang terstruktur</li>
              <li>• Pisahkan konsep dengan jelas</li>
              <li>• File maksimal 10MB</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onUpload?: (file: File, content: string) => Promise<void>;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'text/plain', 'text/markdown'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(selectedFile.type)) {
      setError('Format file harus PDF, TXT, atau MD');
      return;
    }

    if (selectedFile.size > maxSize) {
      setError('Ukuran file maksimal 10MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Pilih file terlebih dahulu');
      return;
    }

    setIsLoading(true);
    try {
      const content = await file.text();
      await onUpload?.(file, content);
    } catch (err) {
      setError('Gagal membaca file');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-primary bg-blue-50'
              : 'border-gray-300 hover:border-primary'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
        >
          <input
            type="file"
            onChange={handleChange}
            className="hidden"
            id="file-input"
            accept=".pdf,.txt,.md"
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="text-5xl mb-4">📁</div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Drag & drop file di sini
            </p>
            <p className="text-gray-500">
              atau klik untuk browse (PDF, TXT, MD - Max 10MB)
            </p>
          </label>
        </motion.div>

        {file && (
          <motion.div
            className="bg-green-50 border border-green-200 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-green-800 font-semibold">✓ {file.name}</p>
            <p className="text-green-700 text-sm">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-800 font-semibold">⚠ {error}</p>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={!file || isLoading}
          className="btn-primary w-full text-lg py-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Memproses...' : 'Generate Flashcard'}
        </motion.button>
      </form>
    </motion.div>
  );
}

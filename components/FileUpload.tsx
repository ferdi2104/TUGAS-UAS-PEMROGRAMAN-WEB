'use client';

import { useState, useRef } from 'react';

interface FileUploadProps {
  onUpload: (file: File) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'text/plain', 'text/markdown', 'text/x-markdown'];

  function validateFile(file: File): boolean {
    if (file.size > maxSize) {
      setError('File terlalu besar. Maksimal 10MB.');
      return false;
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['pdf', 'txt', 'md'].includes(ext)) {
      setError('Hanya file PDF, TXT, dan MD yang diperbolehkan.');
      return false;
    }

    setError(null);
    return true;
  }

  function handleFile(file: File) {
    if (validateFile(file)) {
      setFile(file);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  }

  function handleSubmit() {
    if (file) onUpload(file);
  }

  return (
    <div className="space-y-6">
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-secondary bg-secondary/5'
            : 'border-outline/30 hover:border-secondary/50 bg-surface-container/30'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt,.md"
          className="hidden"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/40">upload_file</span>
          <p className="text-lg font-headline font-bold text-on-surface">
            {file ? file.name : 'Drop file here or click to browse'}
          </p>
          <p className="text-sm font-body text-on-surface-variant">
            {file
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
              : 'Supports PDF, TXT, MD — Max 10MB'
            }
          </p>
        </div>

        {error && (
          <p className="mt-4 text-sm font-label text-primary">{error}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!file}
        className="w-full bg-primary text-on-primary font-label font-bold py-4 text-lg transition-all hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
      >
        GENERATE FLASHCARDS
      </button>
    </div>
  );
}

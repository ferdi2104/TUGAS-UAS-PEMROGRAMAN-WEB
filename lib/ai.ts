import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
);

export interface GeneratedFlashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export async function generateFlashcards(
  content: string,
  numCards: number = 10
): Promise<GeneratedFlashcard[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Berdasarkan konten berikut, buat ${numCards} flashcard untuk belajar.
Setiap flashcard harus memiliki pertanyaan yang jelas dan jawaban yang ringkas.
Buat dalam format JSON dengan struktur:
{
  "flashcards": [
    {
      "question": "...",
      "answer": "...",
      "difficulty": "easy|medium|hard"
    }
  ]
}

Konten:
${content}

Pastikan:
1. Pertanyaan singkat dan spesifik
2. Jawaban jelas dan ringkas
3. Mencakup konsep-konsep penting
4. Variasi tingkat kesulitan

Respons HANYA berisi JSON, tanpa penjelasan tambahan.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    
    // Add IDs dan format
    const flashcards: GeneratedFlashcard[] = parsedData.flashcards.map(
      (card: Omit<GeneratedFlashcard, 'id'>, index: number) => ({
        id: `fc-${Date.now()}-${index}`,
        ...card,
      })
    );

    return flashcards;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
}

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Note: Untuk implementasi lengkap, gunakan library seperti pdf-parse
  // Untuk MVP ini, kita bisa menggunakan text ekstraksi sederhana
  // atau delegasikan ke service eksternal
  return '';
}

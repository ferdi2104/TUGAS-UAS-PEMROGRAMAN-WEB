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

const MODELS = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash', 'gemini-pro-latest'];

export async function generateFlashcards(
  content: string,
  numCards: number = 10
): Promise<GeneratedFlashcard[]> {
  let lastError: unknown;

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      });

      const prompt = `Anda adalah asisten pembuat flashcard. Buat ${numCards} flashcard untuk belajar dari konten berikut.

Aturan:
- Setiap flashcard memiliki pertanyaan spesifik dan jawaban ringkas
- Variasikan tingkat kesulitan (easy, medium, hard)
- Fokus pada konsep kunci, definisi, dan hubungan antar konsep

Format JSON:
{
  "flashcards": [
    { "question": "...", "answer": "...", "difficulty": "easy|medium|hard" }
  ]
}

Konten:
${content}

HANYA kirim JSON, tanpa teks lain.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(jsonStr);

      const flashcards: GeneratedFlashcard[] = (parsedData.flashcards || []).map(
        (card: Omit<GeneratedFlashcard, 'id'>, index: number) => ({
          id: `fc-${Date.now()}-${index}`,
          question: card.question || 'Pertanyaan tidak tersedia',
          answer: card.answer || 'Jawaban tidak tersedia',
          difficulty: card.difficulty || 'medium',
        })
      );

      if (flashcards.length > 0) return flashcards;
    } catch (err) {
      lastError = err;
    }
  }

  console.error('All models failed:', lastError);
  throw lastError;
}

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    const uint8Array = new Uint8Array(buffer);
    const pdf = await pdfjsLib.getDocument({
      data: uint8Array,
      disableFontFace: true,
      useSystemFonts: false,
    }).promise;
    const pages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items
          .map((item: any) => item.str)
          .filter(Boolean)
          .join(' ');
        if (text.trim()) pages.push(`[Halaman ${i}]\n${text}`);
      } catch {
        pages.push(`[Halaman ${i} - tidak dapat diekstrak]`);
      }
    }

    const result = pages.join('\n\n').trim();
    return result || 'PDF tidak mengandung teks yang dapat diekstrak';
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ').trim() || 'Gagal mengekstrak konten PDF';
  }
}
